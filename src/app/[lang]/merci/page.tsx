import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionnaire, estLangue } from "@/lib/i18n";
import { ViderPanier } from "./ViderPanier";

export default async function Merci({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!estLangue(lang)) notFound();
  const t = dictionnaire(lang);
  return (
    <section className="conteneur section centre">
      <ViderPanier />
      <h1>{t.merci.titre}</h1>
      <p>{t.merci.texte}</p>
      <Link href={`/${lang}/boutique`} className="bouton">
        {t.retourBoutique}
      </Link>
    </section>
  );
}
