"use client";

import { useEffect, useState } from "react";

/** Sélecteur provisoire pour comparer les designs ; à retirer une fois le design choisi. */
export const DESIGNS = [
  { code: "clair", nom: "Clair", couleur: "#ffffff" },
  { code: "rose", nom: "Rose poudré", couleur: "#ecc9c2" },
  { code: "noir", nom: "Noir & or", couleur: "#c9a24a" },
  { code: "ivoire", nom: "Ivoire & or", couleur: "#efe5d6" },
  { code: "bordeaux", nom: "Bordeaux & nude", couleur: "#5c1a26" },
] as const;

export const CLE_DESIGN = "eva-design";

/** Script lancé avant l'affichage : applique le design gardé (ou ?design=) sans clignotement. */
export const SCRIPT_DESIGN = `try{var d=new URLSearchParams(location.search).get("design")||localStorage.getItem("${CLE_DESIGN}");if(d){document.documentElement.dataset.design=d;localStorage.setItem("${CLE_DESIGN}",d)}}catch(e){}`;

export function ChoixDesign() {
  const [actuel, setActuel] = useState("clair");
  useEffect(() => {
    setActuel(document.documentElement.dataset.design || "clair");
  }, []);

  function choisir(code: string) {
    document.documentElement.dataset.design = code;
    setActuel(code);
    try {
      localStorage.setItem(CLE_DESIGN, code);
    } catch {}
  }

  return (
    <div className="choix-design" role="group" aria-label="Design">
      <span>Design :</span>
      {DESIGNS.map((d) => (
        <button
          key={d.code}
          type="button"
          aria-pressed={actuel === d.code}
          onClick={() => choisir(d.code)}
        >
          <i style={{ background: d.couleur }} />
          {d.nom}
        </button>
      ))}
    </div>
  );
}
