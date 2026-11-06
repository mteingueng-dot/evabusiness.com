import Link from "next/link";
import { dictionnaire, estLangue } from "@/lib/i18n";
import { CATEGORIES, PRODUITS } from "@/lib/produits";
import { CarteProduit } from "@/components/CarteProduit";
import { notFound } from "next/navigation";
import { cheminLogo } from "@/lib/marque";

export default async function Accueil({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!estLangue(lang)) notFound();
  const t = dictionnaire(lang);
  const vedettes = PRODUITS.filter((p) => p.vedette);
  const logo = cheminLogo();

  return (
    <>
      <section className="hero">
        <div className="conteneur hero-grille">
          <div className="hero-contenu">
          <p className="surtitre">{t.accroche}</p>
          <h1>{t.hero.titre}</h1>
          <p className="hero-texte">{t.hero.texte}</p>
          <Link href={`/${lang}/boutique`} className="bouton bouton-grand">
            {t.hero.bouton}
          </Link>
          </div>
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="hero-logo" />
          )}
        </div>
      </section>

      <section className="avantages">
        <div className="conteneur grille-3">
          {t.avantages.map(([titre, detail]) => (
            <div key={titre} className="avantage">
              <strong>{titre}</strong>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="conteneur section">
        <h2>{t.categories}</h2>
        <div className="grille-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.code}
              href={`/${lang}/boutique?categorie=${c.code}`}
              className={`tuile-categorie tuile-${c.code}`}
            >
              <h3>{c.nom[lang]}</h3>
              <p>{c.description[lang]}</p>
              <span className="fleche">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="conteneur section">
        <div className="titre-ligne">
          <h2>{t.vedettes}</h2>
          <Link href={`/${lang}/boutique`}>{t.voirTout} →</Link>
        </div>
        <div className="grille-produits">
          {vedettes.map((p) => (
            <CarteProduit key={p.slug} produit={p} langue={lang} t={t} />
          ))}
        </div>
      </section>
    </>
  );
}
