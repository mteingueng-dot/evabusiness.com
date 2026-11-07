import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Montserrat } from "next/font/google";
import { LANGUES, dictionnaire, estLangue } from "@/lib/i18n";
import Link from "next/link";
import { MARQUE, COURRIEL, COPYRIGHT } from "@/lib/marque";
import { CATEGORIES } from "@/lib/produits";
import { GROUPES, rubriquesDuGroupe, type Groupe } from "@/lib/rubriques";
import { PanierFournisseur } from "@/components/PanierContexte";
import { Entete } from "@/components/Entete";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--police-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--police-montserrat" });
const polices = [inter, montserrat].map((p) => p.variable).join(" ");

export function generateStaticParams() {
  return LANGUES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!estLangue(lang)) return {};
  const t = dictionnaire(lang);
  return {
    title: { default: `${MARQUE} — ${t.accroche}`, template: `%s | ${MARQUE}` },
    description: t.hero.texte,
  };
}

export default async function Gabarit({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!estLangue(lang)) notFound();
  const t = dictionnaire(lang);
  return (
    <html lang={lang} className={polices}>
      <body>
        <PanierFournisseur>
          <p className="annonce">{t.annonce}</p>
          <Entete langue={lang} t={t} />
          <main>{children}</main>
          <footer className="pied">
            <div className="conteneur pied-colonnes">
              <div>
                <p className="pied-marque">{MARQUE}</p>
                <p>{t.pied.texte}</p>
                <p>
                  <a href={`mailto:${COURRIEL}`}>{COURRIEL}</a>
                </p>
              </div>
              <div>
                <p className="pied-titre">{t.nav.boutique}</p>
                <ul>
                  {CATEGORIES.map((c) => (
                    <li key={c.code}>
                      <Link href={`/${lang}/boutique?categorie=${c.code}`}>{c.nom[lang]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              {(["conseils", "service", "entreprise"] as Groupe[]).map((g) => (
                <div key={g}>
                  <p className="pied-titre">{GROUPES[g][lang]}</p>
                  <ul>
                    {rubriquesDuGroupe(g).map((r) => (
                      <li key={r.slug}>
                        <Link href={`/${lang}/${r.slug}`}>{r.titre[lang]}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="conteneur pied-droits">
              © {new Date().getFullYear()} {COPYRIGHT} {t.pied.droits}
            </p>
          </footer>
        </PanierFournisseur>
      </body>
    </html>
  );
}
