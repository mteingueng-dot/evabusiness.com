import type { Langue } from "./i18n";
import meches from "@/data/meches.json";
import nouveautes from "@/data/nouveautes.json";

/**
 * Catalogue de la boutique. Produits D'EXEMPLE : à remplacer par les vrais
 * produits (nom, description, prix en cents, photo dans public/images/produits/).
 */

export type CodeCategorie = "cheveux" | "corps" | "maquillage" | "perruques";

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
  /** Prix en cents de dollars canadiens ; null = prix à venir (pas encore en vente). */
  prix: number | null;
  /** Chemin d'une photo dans public/ (ex. "/images/produits/huile.jpg"). Vide = image provisoire. */
  image?: string;
  vedette?: boolean;
  couleurs?: Couleur[];
  /** ID de l'article dans Clover (Marché Mvog-Mbi). */
  idClover?: string;
};

export type Couleur = { code: string; description: string; description_en: string };

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
    code: "corps",
    nom: { fr: "Soins du corps", en: "Body care" },
    description: {
      fr: "Beurre de karité, savon noir et soins naturels pour la peau.",
      en: "Shea butter, black soap and natural skin care.",
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

const EXEMPLES: Produit[] = [
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
];

/** Rayon « Mèches & accessoires » repris de marchemvogmbi.com (src/data/meches.json). */
const VEDETTES = ["french-curl-braid-afro-22-3x-1b", "meche-afro-long-butterfly-locs", "meche-x-pression-pres-stretched-3x-1b-52", "perruque-curly-wave"];

const MECHES: Produit[] = meches.map((m) => ({
  slug: m.slug,
  categorie: "perruques",
  nom: { fr: m.nom, en: m.nom },
  description: m.description,
  prix: null,
  image: m.image || undefined,
  couleurs: m.couleurs,
  idClover: m.id_clover,
  vedette: VEDETTES.includes(m.slug),
}));

/**
 * Nouveaux produits choisis dans le relevé Alibaba du 2026-11-07 (src/data/nouveautes.json) :
 * un produit par type. ref_achat = code de la ligne du classeur d'achat (usage interne, jamais
 * affiché). Prix à venir tant que le prix de vente n'est pas fixé.
 */
const VEDETTES_NOUVEAUTES = ["perruque-lace-front-body-wave-cheveux-humains", "beurre-de-karite-pur-non-raffine"];

const NOUVEAUTES: Produit[] = nouveautes.map((n) => ({
  slug: n.slug,
  categorie: n.categorie as CodeCategorie,
  nom: n.nom,
  description: n.description,
  prix: null,
  image: `/images/produits/${n.slug}.jpg`,
  vedette: VEDETTES_NOUVEAUTES.includes(n.slug),
}));

export const PRODUITS: Produit[] = [...NOUVEAUTES, ...EXEMPLES, ...MECHES];

export function produitParSlug(slug: string): Produit | undefined {
  return PRODUITS.find((p) => p.slug === slug);
}

export function categorieParCode(code: string): Categorie | undefined {
  return CATEGORIES.find((c) => c.code === code);
}
