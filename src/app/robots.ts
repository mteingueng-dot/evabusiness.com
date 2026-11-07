import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://evabusiness.com";

/** /robots.txt : tout est indexable sauf l'API, le panier et la page de remerciement. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/fr/panier", "/en/panier", "/fr/merci", "/en/merci"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
