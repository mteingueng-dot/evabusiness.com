import type { Langue } from "./i18n";

/** Montants en cents de dollars canadiens. */
export const TPS = 0.05;
export const TVQ = 0.09975;
export const SEUIL_LIVRAISON_GRATUITE = 7500;
export const FRAIS_LIVRAISON = 1200;

export function formaterPrix(cents: number, langue: Langue): string {
  return new Intl.NumberFormat(langue === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(cents / 100);
}

export function calculerTotaux(sousTotal: number) {
  const livraison =
    sousTotal === 0 || sousTotal >= SEUIL_LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON;
  const base = sousTotal + livraison;
  const tps = Math.round(base * TPS);
  const tvq = Math.round(base * TVQ);
  return { sousTotal, livraison, tps, tvq, total: base + tps + tvq };
}
