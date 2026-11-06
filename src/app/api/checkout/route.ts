import Stripe from "stripe";
import { NextResponse } from "next/server";
import { estLangue } from "@/lib/i18n";
import { produitParSlug } from "@/lib/produits";
import { FRAIS_LIVRAISON, SEUIL_LIVRAISON_GRATUITE } from "@/lib/prix";

/**
 * Crée une session de paiement Stripe Checkout.
 * Les prix sont TOUJOURS repris du catalogue du serveur : jamais ceux envoyés par le navigateur.
 */
export async function POST(requete: Request) {
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) {
    return NextResponse.json(
      { erreur: "paiement pas encore configuré (STRIPE_SECRET_KEY absente)." },
      { status: 503 },
    );
  }

  let corps: { langue?: string; lignes?: { slug?: string; quantite?: number }[] };
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ erreur: "requête illisible." }, { status: 400 });
  }
  const langue = corps.langue && estLangue(corps.langue) ? corps.langue : "fr";

  const lignes = (corps.lignes ?? [])
    .map((l) => ({
      produit: l.slug ? produitParSlug(l.slug) : undefined,
      quantite: Math.floor(Number(l.quantite)),
    }))
    .filter((l) => l.produit && l.quantite >= 1 && l.quantite <= 99);
  if (lignes.length === 0) {
    return NextResponse.json({ erreur: "panier vide." }, { status: 400 });
  }

  const taux = [process.env.STRIPE_TAUX_TPS, process.env.STRIPE_TAUX_TVQ].filter(
    (x): x is string => Boolean(x),
  );
  const sousTotal = lignes.reduce((s, l) => s + l.produit!.prix * l.quantite, 0);
  const livraison = sousTotal >= SEUIL_LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON;
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(requete.url).origin;

  const stripe = new Stripe(cle);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: langue,
      currency: "cad",
      line_items: lignes.map((l) => ({
        quantity: l.quantite,
        price_data: {
          currency: "cad",
          unit_amount: l.produit!.prix,
          product_data: { name: l.produit!.nom[langue] },
        },
        ...(taux.length ? { tax_rates: taux } : {}),
      })),
      shipping_address_collection: { allowed_countries: ["CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: langue === "fr" ? "Livraison standard" : "Standard shipping",
            fixed_amount: { amount: livraison, currency: "cad" },
          },
        },
      ],
      success_url: `${site}/${langue}/merci?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/${langue}/panier`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ erreur: message }, { status: 502 });
  }
}
