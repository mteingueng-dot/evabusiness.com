import fs from "node:fs";
import path from "node:path";

export const MARQUE = "Eva Business & Hair";
export const COURRIEL = "info@evabusiness.com";

/** Logo : public/images/logo.png (sinon logo texte). */
export function cheminLogo(): string | null {
  for (const nom of ["logo.png", "logo.jpg", "logo.webp", "logo.svg"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", nom))) {
      return `/images/${nom}`;
    }
  }
  return null;
}
