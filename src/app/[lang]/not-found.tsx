import Link from "next/link";

/** Page introuvable (404) : bilingue, car la langue de l'adresse n'est pas connue ici. */
export default function Introuvable() {
  return (
    <section className="conteneur section introuvable">
      <p className="surtitre">404</p>
      <h1>Page introuvable</h1>
      <p>Cette page n&apos;existe pas ou a été déplacée.</p>
      <p lang="en">This page doesn&apos;t exist or has moved.</p>
      <div className="introuvable-liens">
        <Link href="/fr/boutique" className="bouton">
          Voir la boutique
        </Link>
        <Link href="/en/boutique" className="bouton bouton-secondaire" lang="en">
          Visit the shop
        </Link>
      </div>
    </section>
  );
}
