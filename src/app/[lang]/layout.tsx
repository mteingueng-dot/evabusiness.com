import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
import { LANGUES, dictionnaire, estLangue } from "@/lib/i18n";
import { MARQUE, COURRIEL } from "@/lib/marque";
import { PanierFournisseur } from "@/components/PanierContexte";
import { Entete } from "@/components/Entete";
import "../globals.css";

const titres = Playfair_Display({ subsets: ["latin"], variable: "--police-titres" });
const texte = Inter({ subsets: ["latin"], variable: "--police-texte" });

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
    <html lang={lang} className={`${titres.variable} ${texte.variable}`}>
      <body>
        <PanierFournisseur>
          <div className="filet" aria-hidden="true" />
          <Entete langue={lang} t={t} />
          <main>{children}</main>
          <footer className="pied">
            <div className="conteneur pied-ligne">
              <div>
                <p className="pied-marque">{MARQUE}</p>
                <p>{t.pied.texte}</p>
              </div>
              <div>
                <a href={`mailto:${COURRIEL}`}>{COURRIEL}</a>
                <p>
                  © {new Date().getFullYear()} {MARQUE}. {t.pied.droits}
                </p>
              </div>
            </div>
          </footer>
        </PanierFournisseur>
      </body>
    </html>
  );
}
