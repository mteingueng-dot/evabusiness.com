import Link from "next/link";
import type { Langue, Dictionnaire } from "@/lib/i18n";
import type { Produit } from "@/lib/produits";
import { categorieParCode } from "@/lib/produits";
import { formaterPrix } from "@/lib/prix";
import { ImageProduit } from "./ImageProduit";
import { BoutonAjouter } from "./BoutonAjouter";

export function CarteProduit({
  produit,
  langue,
  t,
}: {
  produit: Produit;
  langue: Langue;
  t: Dictionnaire;
}) {
  const nom = produit.nom[langue];
  return (
    <article className="carte">
      <Link href={`/${langue}/produit/${produit.slug}`} className="carte-lien">
        <ImageProduit produit={produit} nom={nom} />
        <p className="carte-categorie">{categorieParCode(produit.categorie)?.nom[langue]}</p>
        <h3>{nom}</h3>
      </Link>
      <div className="carte-bas">
        <span className="prix">{formaterPrix(produit.prix, langue)}</span>
        <BoutonAjouter slug={produit.slug} libelle={t.ajouter} libelleAjoute={t.ajoute} />
      </div>
    </article>
  );
}
