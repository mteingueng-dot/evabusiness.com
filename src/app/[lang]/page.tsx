import Link from "next/link";
import { dictionnaire, estLangue } from "@/lib/i18n";
import { CATEGORIES, PRODUITS } from "@/lib/produits";
import { CarteProduit } from "@/components/CarteProduit";
import { rubriqueParSlug } from "@/lib/rubriques";
import { notFound } from "next/navigation";

const PHOTOS_ACCUEIL = [
  "meche-afro-long-butterfly-locs",
  "french-curl-braid-afro-22-3x-1b",
  "perruque-curly-wave",
];

export default async function Accueil({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!estLangue(lang)) notFound();
  const t = dictionnaire(lang);
  const vedettes = PRODUITS.filter((p) => p.vedette);
  const photos = PHOTOS_ACCUEIL.map((slug) => PRODUITS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof PRODUITS)[number] => Boolean(p?.image),
  );

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
          <div className="hero-photos" aria-hidden="true">
            {photos.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.slug} src={p.image} alt="" />
            ))}
          </div>
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
        <div className="grille-3 grille-categories">
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

      <section className="conteneur section">
        <div className="conseils-accueil">
          <div>
            <h2>{t.conseilsAccueil.titre}</h2>
            <p>{t.conseilsAccueil.texte}</p>
          </div>
          <div className="conseils-liens">
            {["guide-achat", "entretien", "faq"].map((slug) => {
              const r = rubriqueParSlug(slug)!;
              return (
                <Link key={slug} href={`/${lang}/${slug}`} className="conseil-tuile">
                  <strong>{r.titre[lang]}</strong>
                  <span>{r.intro[lang]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
