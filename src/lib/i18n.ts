export const LANGUES = ["fr", "en"] as const;
export type Langue = (typeof LANGUES)[number];
export const LANGUE_PAR_DEFAUT: Langue = "fr";

export function estLangue(valeur: string): valeur is Langue {
  return (LANGUES as readonly string[]).includes(valeur);
}

const fr = {
  nav: { accueil: "Accueil", boutique: "Boutique", panier: "Panier" },
  accroche: "Beauté, cheveux et perruques",
  hero: {
    titre: "Révélez votre beauté naturelle",
    texte:
      "Soins capillaires, maquillage, perruques et mèches de qualité, choisis avec soin et livrés partout au Canada.",
    bouton: "Découvrir la boutique",
  },
  categories: "Nos catégories",
  vedettes: "Nos coups de cœur",
  voirTout: "Voir tout",
  tous: "Tous les produits",
  ajouter: "Ajouter au panier",
  ajoute: "Ajouté ✓",
  retourBoutique: "← Retour à la boutique",
  panier: {
    titre: "Votre panier",
    vide: "Votre panier est vide.",
    sousTotal: "Sous-total",
    tps: "TPS (5 %)",
    tvq: "TVQ (9,975 %)",
    livraison: "Livraison",
    livraisonGratuite: "Gratuite",
    total: "Total estimé",
    note: "Taxes du Québec. La livraison est gratuite dès {seuil}.",
    payer: "Passer au paiement",
    retirer: "Retirer",
    quantite: "Quantité",
    enCours: "Redirection vers le paiement…",
    erreur: "Le paiement n'a pas pu démarrer : ",
  },
  merci: {
    titre: "Merci pour votre commande !",
    texte:
      "Votre paiement a bien été reçu. Vous recevrez une confirmation par courriel.",
  },
  avantages: [
    ["Livraison au Canada", "Gratuite dès 75 $"],
    ["Paiement sécurisé", "Carte de crédit par Stripe"],
    ["Conseils personnalisés", "Écrivez-nous, on vous répond"],
  ],
  pied: {
    texte: "Produits de beauté, soins capillaires et perruques.",
    droits: "Tous droits réservés.",
  },
};

export type Dictionnaire = typeof fr;

const en: Dictionnaire = {
  nav: { accueil: "Home", boutique: "Shop", panier: "Cart" },
  accroche: "Beauty, hair care and wigs",
  hero: {
    titre: "Reveal your natural beauty",
    texte:
      "Quality hair care, makeup, wigs and extensions, carefully selected and shipped across Canada.",
    bouton: "Shop now",
  },
  categories: "Our categories",
  vedettes: "Our favourites",
  voirTout: "See all",
  tous: "All products",
  ajouter: "Add to cart",
  ajoute: "Added ✓",
  retourBoutique: "← Back to the shop",
  panier: {
    titre: "Your cart",
    vide: "Your cart is empty.",
    sousTotal: "Subtotal",
    tps: "GST (5%)",
    tvq: "QST (9.975%)",
    livraison: "Shipping",
    livraisonGratuite: "Free",
    total: "Estimated total",
    note: "Quebec taxes. Free shipping from {seuil}.",
    payer: "Checkout",
    retirer: "Remove",
    quantite: "Quantity",
    enCours: "Redirecting to payment…",
    erreur: "Payment could not start: ",
  },
  merci: {
    titre: "Thank you for your order!",
    texte: "Your payment was received. You will get a confirmation by email.",
  },
  avantages: [
    ["Shipping across Canada", "Free from $75"],
    ["Secure payment", "Credit card through Stripe"],
    ["Personal advice", "Write to us, we answer"],
  ],
  pied: {
    texte: "Beauty products, hair care and wigs.",
    droits: "All rights reserved.",
  },
};

const DICTIONNAIRES: Record<Langue, Dictionnaire> = { fr, en };

export function dictionnaire(langue: Langue): Dictionnaire {
  return DICTIONNAIRES[langue];
}
