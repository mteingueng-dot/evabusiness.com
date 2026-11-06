import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionnaire, estLangue } from "@/lib/i18n";
import { CATEGORIES, PRODUITS, categorieParCode } from "@/lib/produits";
import { CarteProduit } from "@/components/CarteProduit";

export default async function Boutique({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { lang } = await params;
  if (!estLangue(lang)) notFound();
  const { categorie } = await searchParams;
  const t = dictionnaire(lang);
  const choisie = categorie ? categorieParCode(categorie) : undefined;
  const produits = choisie ? PRODUITS.filter((p) => p.categorie === choisie.code) : PRODUITS;

  return (
    <section className="conteneur section">
      <h1>{choisie ? choisie.nom[lang] : t.tous}</h1>
      {choisie && <p className="intro">{choisie.description[lang]}</p>}
      <nav className="filtres">
        <Link href={`/${lang}/boutique`} className={!choisie ? "actif" : ""}>
          {t.tous}
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.code}
            href={`/${lang}/boutique?categorie=${c.code}`}
            className={choisie?.code === c.code ? "actif" : ""}
          >
            {c.nom[lang]}
          </Link>
        ))}
      </nav>
      <div className="grille-produits">
        {produits.map((p) => (
          <CarteProduit key={p.slug} produit={p} langue={lang} t={t} />
        ))}
      </div>
    </section>
  );
}
