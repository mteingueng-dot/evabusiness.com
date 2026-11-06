import type { Produit } from "@/lib/produits";

/** Photo du produit, ou image provisoire aux couleurs du design choisi. */
export function ImageProduit({ produit, nom }: { produit: Produit; nom: string }) {
  if (produit.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={produit.image} alt={nom} className="image-produit" loading="lazy" />;
  }
  return (
    <div
      className={`image-produit image-provisoire image-${produit.categorie}`}
      role="img"
      aria-label={nom}
    >
      <span>{nom}</span>
    </div>
  );
}
