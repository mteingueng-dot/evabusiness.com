import type { MetadataRoute } from "next";
import { LANGUES } from "@/lib/i18n";
import { PRODUITS } from "@/lib/produits";
import { RUBRIQUES } from "@/lib/rubriques";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://evabusiness.com";

/** Plan du site (/sitemap.xml) : accueil, boutique, rubriques et fiches produits, dans les deux langues. */
export default function sitemap(): MetadataRoute.Sitemap {
  const chemins = [
    "",
    "/boutique",
    ...RUBRIQUES.map((r) => `/${r.slug}`),
    ...PRODUITS.map((p) => `/produit/${p.slug}`),
  ];
  return chemins.flatMap((c) =>
    LANGUES.map((l) => ({
      url: `${SITE}/${l}${c}`,
      alternates: { languages: Object.fromEntries(LANGUES.map((x) => [x, `${SITE}/${x}${c}`])) },
    })),
  );
}
