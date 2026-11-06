"use client";

import Link from "next/link";
import { usePanier } from "./PanierContexte";

export function CompteurPanier({ href, libelle }: { href: string; libelle: string }) {
  const { nombre } = usePanier();
  return (
    <Link href={href} className="lien-panier" aria-label={`${libelle} (${nombre})`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 7h12l-1 13H7L6 7Zm3 0a3 3 0 0 1 6 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{libelle}</span>
      {nombre > 0 && <span className="pastille">{nombre}</span>}
    </Link>
  );
}
