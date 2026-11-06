import { NextResponse, type NextRequest } from "next/server";
import { LANGUES, LANGUE_PAR_DEFAUT } from "@/lib/i18n";

/** Renvoie « / » (et toute adresse sans langue) vers /fr ou /en selon le navigateur. */
export function middleware(requete: NextRequest) {
  const { pathname } = requete.nextUrl;
  if (LANGUES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const accepte = requete.headers.get("accept-language") ?? "";
  const langue = /^en\b/i.test(accepte.trim()) ? "en" : LANGUE_PAR_DEFAUT;
  const url = requete.nextUrl.clone();
  url.pathname = `/${langue}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico|.*\\..*).*)"],
};
