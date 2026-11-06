import type { Langue } from "./i18n";

/**
 * Catalogue de la boutique. Produits D'EXEMPLE : à remplacer par les vrais
 * produits (nom, description, prix en cents, photo dans public/images/produits/).
 */

export type CodeCategorie = "cheveux" | "maquillage" | "perruques";

export type Texte = Record<Langue, string>;

export type Categorie = {
  code: CodeCategorie;
  nom: Texte;
  description: Texte;
};

export type Produit = {
  slug: string;
  categorie: CodeCategorie;
  nom: Texte;
  description: Texte;
  /** Prix en cents de dollars canadiens. */
  prix: number;
  /** Chemin d'une photo dans public/ (ex. "/images/produits/huile.jpg"). Vide = image provisoire. */
  image?: string;
  vedette?: boolean;
};

export const CATEGORIES: Categorie[] = [
  {
    code: "cheveux",
    nom: { fr: "Soins des cheveux", en: "Hair care" },
    description: {
      fr: "Shampoings, huiles et masques pour cheveux naturels.",
      en: "Shampoos, oils and masks for natural hair.",
    },
  },
  {
    code: "maquillage",
    nom: { fr: "Maquillage", en: "Makeup" },
    description: {
      fr: "Teint, lèvres et yeux, pour toutes les carnations.",
      en: "Face, lips and eyes, for every skin tone.",
    },
  },
  {
    code: "perruques",
    nom: { fr: "Perruques et mèches", en: "Wigs & extensions" },
    description: {
      fr: "Perruques, tissages et extensions de qualité.",
      en: "Quality wigs, weaves and extensions.",
    },
  },
];

export const PRODUITS: Produit[] = [
  {
    slug: "huile-nourrissante-ricin",
    categorie: "cheveux",
    nom: { fr: "Huile nourrissante au ricin", en: "Nourishing castor oil" },
    description: {
      fr: "Huile de ricin pure pour fortifier les cheveux et favoriser la pousse. 120 ml.",
      en: "Pure castor oil to strengthen hair and support growth. 120 ml.",
    },
    prix: 1899,
    vedette: true,
  },
  {
    slug: "shampoing-hydratant-karite",
    categorie: "cheveux",
    nom: { fr: "Shampoing hydratant au karité", en: "Shea moisturizing shampoo" },
    description: {
      fr: "Nettoie en douceur sans dessécher les cheveux bouclés et crépus. 350 ml.",
      en: "Gently cleanses without drying curly and coily hair. 350 ml.",
    },
    prix: 1499,
  },
  {
    slug: "masque-reparateur",
    categorie: "cheveux",
    nom: { fr: "Masque réparateur intense", en: "Intense repair mask" },
    description: {
      fr: "Masque profond à l'avocat et au miel pour cheveux abîmés. 250 ml.",
      en: "Deep mask with avocado and honey for damaged hair. 250 ml.",
    },
    prix: 2299,
  },
  {
    slug: "fond-de-teint-mat",
    categorie: "maquillage",
    nom: { fr: "Fond de teint mat longue tenue", en: "Long-wear matte foundation" },
    description: {
      fr: "Couvrance modulable, fini mat naturel, 12 teintes. 30 ml.",
      en: "Buildable coverage, natural matte finish, 12 shades. 30 ml.",
    },
    prix: 2999,
    vedette: true,
  },
  {
    slug: "rouge-a-levres-velours",
    categorie: "maquillage",
    nom: { fr: "Rouge à lèvres velours", en: "Velvet lipstick" },
    description: {
      fr: "Couleur intense et confortable, fini velours.",
      en: "Intense, comfortable colour with a velvet finish.",
    },
    prix: 1699,
  },
  {
    slug: "palette-yeux-terre",
    categorie: "maquillage",
    nom: { fr: "Palette yeux « Terre »", en: "“Earth” eyeshadow palette" },
    description: {
      fr: "12 fards mats et irisés aux tons chauds.",
      en: "12 matte and shimmer shadows in warm tones.",
    },
    prix: 3499,
  },
  {
    slug: "perruque-lace-front-lisse",
    categorie: "perruques",
    nom: { fr: "Perruque lace front lisse", en: "Straight lace front wig" },
    description: {
      fr: "Cheveux naturels, 18 pouces, dentelle frontale invisible.",
      en: "Human hair, 18 inches, invisible lace front.",
    },
    prix: 18999,
    vedette: true,
  },
  {
    slug: "perruque-bouclee-courte",
    categorie: "perruques",
    nom: { fr: "Perruque bouclée courte", en: "Short curly wig" },
    description: {
      fr: "Coupe courte aux boucles naturelles, légère et respirante.",
      en: "Short cut with natural curls, light and breathable.",
    },
    prix: 12999,
  },
  {
    slug: "meches-tissage-ondule",
    categorie: "perruques",
    nom: { fr: "Mèches tissage ondulé", en: "Body wave weave bundle" },
    description: {
      fr: "Lot de 3 mèches ondulées, cheveux naturels, 16 pouces.",
      en: "Bundle of 3 body wave wefts, human hair, 16 inches.",
    },
    prix: 14999,
    vedette: true,
  },
];

export function produitParSlug(slug: string): Produit | undefined {
  return PRODUITS.find((p) => p.slug === slug);
}

export function categorieParCode(code: string): Categorie | undefined {
  return CATEGORIES.find((c) => c.code === code);
}
