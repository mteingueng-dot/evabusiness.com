"use client";

import { useEffect } from "react";
import { usePanier } from "@/components/PanierContexte";

/** Vide le panier une fois le paiement confirmé par Stripe. */
export function ViderPanier() {
  const { vider } = usePanier();
  useEffect(() => {
    vider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
