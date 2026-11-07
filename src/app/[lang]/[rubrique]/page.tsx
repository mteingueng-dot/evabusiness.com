import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUES, dictionnaire, estLangue } from "@/lib/i18n";
import { GROUPES, RUBRIQUES, rubriqueParSlug, rubriquesDuGroupe } from "@/lib/rubriques";

/** Pages d'information : /fr/faq, /en/livraison-retours… (textes dans src/lib/rubriques.ts). */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUES.flatMap((lang) => RUBRIQUES.map((r) => ({ lang, rubrique: r.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; rubrique: string }>;
}): Promise<Metadata> {
  const { lang, rubrique } = await params;
  const r = rubriqueParSlug(rubrique);
  if (!estLangue(lang) || !r) return {};
  return {
    title: r.titre[lang],
    description: r.intro[lang],
    alternates: { languages: Object.fromEntries(LANGUES.map((l) => [l, `/${l}/${r.slug}`])) },
  };
}

export default async function PageRubrique({
  params,
}: {
  params: Promise<{ lang: string; rubrique: string }>;
}) {
  const { lang, rubrique } = await params;
  const r = rubriqueParSlug(rubrique);
  if (!estLangue(lang) || !r) notFound();
  const t = dictionnaire(lang);
  const voisines = rubriquesDuGroupe(r.groupe).filter((x) => x.slug !== r.slug);

  return (
    <section className="conteneur section rubrique">
      <nav className="fil" aria-label={t.filAriane}>
        <Link href={`/${lang}`}>{t.nav.accueil}</Link>
        <span aria-hidden="true">/</span>
        <span>{GROUPES[r.groupe][lang]}</span>
      </nav>
      <h1>{r.titre[lang]}</h1>
      <p className="rubrique-intro">{r.intro[lang]}</p>

      <div className="rubrique-corps">
        {r.blocs[lang].map((b, i) => (
          <div key={i} className="bloc">
            {b.titre && <h2>{b.titre}</h2>}
            {b.paragraphes?.map((p) => <p key={p}>{p}</p>)}
            {b.tableau && (
              <div className="tableau-defile">
                <table>
                  <thead>
                    <tr>
                      {b.tableau.entetes.map((e) => (
                        <th key={e}>{e}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.tableau.lignes.map((l) => (
                      <tr key={l.join("|")}>
                        {l.map((c, j) => (
                          <td key={j}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {b.liste && (
              <ul>
                {b.liste.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
            {b.questions && (
              <div className="questions">
                {b.questions.map(([q, rep]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <p>{rep}</p>
                  </details>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {r.slug !== "contact" && (
      <aside className="rubrique-aide">
        <p>
          <strong>{t.aide.titre}</strong> {t.aide.texte}
        </p>
        <Link href={`/${lang}/contact`} className="bouton">
          {t.aide.bouton}
        </Link>
      </aside>
      )}

      {voisines.length > 0 && (
        <div className="voisines">
          <h2>{t.aussi}</h2>
          <ul>
            {voisines.map((v) => (
              <li key={v.slug}>
                <Link href={`/${lang}/${v.slug}`}>{v.titre[lang]} →</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
