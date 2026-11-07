import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter, Cormorant_Garamond, Montserrat } from "next/font/google";
import { LANGUES, dictionnaire, estLangue } from "@/lib/i18n";
import { MARQUE, COURRIEL, COPYRIGHT } from "@/lib/marque";
import { PanierFournisseur } from "@/components/PanierContexte";
import { ChoixDesign, SCRIPT_DESIGN } from "@/components/ChoixDesign";
import { Entete } from "@/components/Entete";
import "../globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--police-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--police-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--police-cormorant",
});
const montserrat = Montserrat({ subsets: ["latin"], variable: "--police-montserrat" });
const polices = [playfair, inter, cormorant, montserrat].map((p) => p.variable).join(" ");

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
    <html lang={lang} className={polices} data-design="clair" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_DESIGN }} />
      </head>
      <body>
        <PanierFournisseur>
          <p className="annonce">{t.annonce}</p>
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
                  © {new Date().getFullYear()} {COPYRIGHT} {t.pied.droits}
                </p>
              </div>
            </div>
          </footer>
          <ChoixDesign />
        </PanierFournisseur>
      </body>
    </html>
  );
}
