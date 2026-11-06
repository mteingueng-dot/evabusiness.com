"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type LignePanier = { slug: string; quantite: number };

type ValeurPanier = {
  lignes: LignePanier[];
  nombre: number;
  ajouter: (slug: string, quantite?: number) => void;
  changer: (slug: string, quantite: number) => void;
  retirer: (slug: string) => void;
  vider: () => void;
};

const CLE = "eva-panier";
const Contexte = createContext<ValeurPanier | null>(null);

export function PanierFournisseur({ children }: { children: ReactNode }) {
  const [lignes, setLignes] = useState<LignePanier[]>([]);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    try {
      const lu = JSON.parse(localStorage.getItem(CLE) ?? "[]");
      if (Array.isArray(lu)) setLignes(lu);
    } catch {}
    setCharge(true);
  }, []);

  useEffect(() => {
    if (!charge) return;
    try {
      localStorage.setItem(CLE, JSON.stringify(lignes));
    } catch {}
  }, [lignes, charge]);

  const changer = (slug: string, quantite: number) =>
    setLignes((l) =>
      quantite <= 0
        ? l.filter((x) => x.slug !== slug)
        : l.map((x) => (x.slug === slug ? { ...x, quantite: Math.min(quantite, 99) } : x)),
    );

  const ajouter = (slug: string, quantite = 1) =>
    setLignes((l) => {
      const existe = l.find((x) => x.slug === slug);
      if (existe)
        return l.map((x) =>
          x.slug === slug ? { ...x, quantite: Math.min(x.quantite + quantite, 99) } : x,
        );
      return [...l, { slug, quantite }];
    });

  const valeur: ValeurPanier = {
    lignes,
    nombre: lignes.reduce((s, x) => s + x.quantite, 0),
    ajouter,
    changer,
    retirer: (slug) => changer(slug, 0),
    vider: () => setLignes([]),
  };

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>;
}

export function usePanier(): ValeurPanier {
  const v = useContext(Contexte);
  if (!v) throw new Error("usePanier hors de PanierFournisseur");
  return v;
}
