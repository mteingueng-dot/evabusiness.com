"use client";

import { useState } from "react";
import { usePanier } from "./PanierContexte";

export function BoutonAjouter({
  slug,
  libelle,
  libelleAjoute,
  grand = false,
}: {
  slug: string;
  libelle: string;
  libelleAjoute: string;
  grand?: boolean;
}) {
  const { ajouter } = usePanier();
  const [ajoute, setAjoute] = useState(false);
  return (
    <button
      type="button"
      className={grand ? "bouton bouton-grand" : "bouton"}
      onClick={() => {
        ajouter(slug);
        setAjoute(true);
        setTimeout(() => setAjoute(false), 1500);
      }}
    >
      {ajoute ? libelleAjoute : libelle}
    </button>
  );
}
