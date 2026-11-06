import { notFound } from "next/navigation";
import { dictionnaire, estLangue } from "@/lib/i18n";
import { ContenuPanier } from "./ContenuPanier";

export const metadata = { title: "Panier / Cart" };

export default async function Panier({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!estLangue(lang)) notFound();
  return <ContenuPanier langue={lang} t={dictionnaire(lang)} />;
}
