"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionnaire, Langue } from "@/lib/i18n";
import { produitParSlug } from "@/lib/produits";
import { SEUIL_LIVRAISON_GRATUITE, calculerTotaux, formaterPrix } from "@/lib/prix";
import { usePanier } from "@/components/PanierContexte";
import { ImageProduit } from "@/components/ImageProduit";

export function ContenuPanier({ langue, t }: { langue: Langue; t: Dictionnaire }) {
  const { lignes, changer, retirer } = usePanier();
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  const details = lignes
    .map((l) => ({ ...l, produit: produitParSlug(l.slug) }))
    .filter((l) => l.produit && l.produit.prix !== null);
  const sousTotal = details.reduce((s, l) => s + l.produit!.prix! * l.quantite, 0);
  const totaux = calculerTotaux(sousTotal);
  const prix = (c: number) => formaterPrix(c, langue);

  async function payer() {
    setEnCours(true);
    setErreur("");
    try {
      const reponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ langue, lignes }),
      });
      const donnees = await reponse.json();
      if (!reponse.ok || !donnees.url) throw new Error(donnees.erreur ?? reponse.statusText);
      window.location.href = donnees.url;
    } catch (e) {
      setErreur(t.panier.erreur + (e instanceof Error ? e.message : String(e)));
      setEnCours(false);
    }
  }

  return (
    <section className="conteneur section">
      <h1>{t.panier.titre}</h1>
      {details.length === 0 ? (
        <div className="panier-vide">
          <p>{t.panier.vide}</p>
          <Link href={`/${langue}/boutique`} className="bouton">
            {t.hero.bouton}
          </Link>
        </div>
      ) : (
        <div className="panier">
          <ul className="panier-lignes">
            {details.map(({ slug, quantite, produit }) => (
              <li key={slug} className="panier-ligne">
                <div className="panier-image">
                  <ImageProduit produit={produit!} nom={produit!.nom[langue]} />
                </div>
                <div className="panier-info">
                  <Link href={`/${langue}/produit/${slug}`}>{produit!.nom[langue]}</Link>
                  <span>{prix(produit!.prix!)}</span>
                </div>
                <label className="quantite">
                  <span className="sr">{t.panier.quantite}</span>
                  <button type="button" onClick={() => changer(slug, quantite - 1)}>−</button>
                  <span>{quantite}</span>
                  <button type="button" onClick={() => changer(slug, quantite + 1)}>+</button>
                </label>
                <strong>{prix(produit!.prix! * quantite)}</strong>
                <button type="button" className="lien-retirer" onClick={() => retirer(slug)}>
                  {t.panier.retirer}
                </button>
              </li>
            ))}
          </ul>
          <aside className="resume">
            <dl>
              <dt>{t.panier.sousTotal}</dt>
              <dd>{prix(totaux.sousTotal)}</dd>
              <dt>{t.panier.livraison}</dt>
              <dd>{totaux.livraison === 0 ? t.panier.livraisonGratuite : prix(totaux.livraison)}</dd>
              <dt>{t.panier.tps}</dt>
              <dd>{prix(totaux.tps)}</dd>
              <dt>{t.panier.tvq}</dt>
              <dd>{prix(totaux.tvq)}</dd>
              <dt className="total">{t.panier.total}</dt>
              <dd className="total">{prix(totaux.total)}</dd>
            </dl>
            <p className="note">
              {t.panier.note.replace("{seuil}", prix(SEUIL_LIVRAISON_GRATUITE))}
            </p>
            <button type="button" className="bouton bouton-grand" onClick={payer} disabled={enCours}>
              {enCours ? t.panier.enCours : t.panier.payer}
            </button>
            {erreur && <p className="erreur">{erreur}</p>}
          </aside>
        </div>
      )}
    </section>
  );
}
