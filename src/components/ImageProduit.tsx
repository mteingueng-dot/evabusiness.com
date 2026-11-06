import type { Produit } from "@/lib/produits";

const TEINTES: Record<Produit["categorie"], [string, string]> = {
  cheveux: ["#f3d9d3", "#c99a8a"],
  maquillage: ["#f6e1dc", "#b9776a"],
  perruques: ["#ead2c4", "#8a5a48"],
};

/** Photo du produit, ou image provisoire aux couleurs de la marque. */
export function ImageProduit({ produit, nom }: { produit: Produit; nom: string }) {
  if (produit.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={produit.image} alt={nom} className="image-produit" />;
  }
  const [clair, fonce] = TEINTES[produit.categorie];
  return (
    <div
      className="image-produit image-provisoire"
      style={{ background: `linear-gradient(145deg, ${clair}, ${fonce})` }}
      role="img"
      aria-label={nom}
    >
      <span>{nom}</span>
    </div>
  );
}
