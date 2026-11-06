import Link from "next/link";
import type { Langue, Dictionnaire } from "@/lib/i18n";
import { MARQUE, cheminLogo } from "@/lib/marque";
import { CompteurPanier } from "./CompteurPanier";

export function Entete({ langue, t }: { langue: Langue; t: Dictionnaire }) {
  const logo = cheminLogo();
  const autre: Langue = langue === "fr" ? "en" : "fr";
  return (
    <header className="entete">
      <div className="conteneur entete-ligne">
        <Link href={`/${langue}`} className="marque" aria-label={MARQUE}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <>
              <img src={logo} alt="" className="logo" />
              <span className="nom-marque">{MARQUE}</span>
            </>
          ) : (
            <span className="logo-texte">
              Eva <em>Business</em> <small>&amp; Hair</small>
            </span>
          )}
        </Link>
        <nav className="menu">
          <Link href={`/${langue}`}>{t.nav.accueil}</Link>
          <Link href={`/${langue}/boutique`}>{t.nav.boutique}</Link>
          <Link href={`/${autre}`} className="langue" hrefLang={autre}>
            {autre.toUpperCase()}
          </Link>
          <CompteurPanier href={`/${langue}/panier`} libelle={t.nav.panier} />
        </nav>
      </div>
    </header>
  );
}
