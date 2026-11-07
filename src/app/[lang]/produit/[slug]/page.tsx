import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUES, dictionnaire, estLangue } from "@/lib/i18n";
import { PRODUITS, categorieParCode, produitParSlug } from "@/lib/produits";
import { formaterPrix } from "@/lib/prix";
import { ImageProduit } from "@/components/ImageProduit";
import { BoutonAjouter } from "@/components/BoutonAjouter";

export function generateStaticParams() {
  return LANGUES.flatMap((lang) => PRODUITS.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const produit = produitParSlug(slug);
  if (!estLangue(lang) || !produit) return {};
  return { title: produit.nom[lang], description: produit.description[lang] };
}

export default async function PageProduit({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const produit = produitParSlug(slug);
  if (!estLangue(lang) || !produit) notFound();
  const t = dictionnaire(lang);
  const nom = produit.nom[lang];

  return (
    <section className="conteneur section">
      <Link href={`/${lang}/boutique`} className="retour">
        {t.retourBoutique}
      </Link>
      <div className="fiche">
        <ImageProduit produit={produit} nom={nom} />
        <div className="fiche-texte">
          <p className="carte-categorie">{categorieParCode(produit.categorie)?.nom[lang]}</p>
          <h1>{nom}</h1>
          {produit.prix === null ? (
            <p className="prix-a-venir prix-grand">{t.prixAVenir}</p>
          ) : (
            <p className="prix prix-grand">{formaterPrix(produit.prix, lang)}</p>
          )}
          <p>{produit.description[lang]}</p>
          {produit.couleurs && produit.couleurs.length > 0 && (
            <div className="couleurs">
              <p className="couleurs-titre">{t.couleurs}</p>
              <ul>
                {produit.couleurs.map((c) => (
                  <li key={c.code}>
                    <strong>{c.code}</strong> {lang === "fr" ? c.description : c.description_en}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {produit.prix === null ? (
            <p className="note">{t.bientot}</p>
          ) : (
            <BoutonAjouter slug={produit.slug} libelle={t.ajouter} libelleAjoute={t.ajoute} grand />
          )}
          <ul className="infos-achat">
            {t.infosAchat.map(([slugInfo, texte]) => (
              <li key={texte}>
                <Link href={`/${lang}/${slugInfo}`}>{texte}</Link>
              </li>
            ))}
            {produit.categorie === "perruques" && (
              <li>
                <Link href={`/${lang}/entretien`}>{t.guideEntretien}</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
