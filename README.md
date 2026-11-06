# Eva Business & Hair — evabusiness.com

Boutique en ligne de produits de beauté (soins des cheveux, maquillage, perruques et mèches), en français et en anglais, prix en dollars canadiens, taxes du Québec (TPS 5 %, TVQ 9,975 %), paiement par carte avec Stripe Checkout.

Technique : Next.js 15 (App Router, TypeScript), hébergement prévu sur Vercel.

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000 (redirige vers /fr ou /en selon le navigateur).

## Structure

- `src/lib/produits.ts` : catégories et produits (produits D'EXEMPLE à remplacer ; prix en cents).
- `src/lib/i18n.ts` : tous les textes du site, français et anglais.
- `src/lib/prix.ts` : taxes, livraison (12 $, gratuite dès 75 $), format des prix.
- `src/lib/marque.ts` : nom de la marque, courriel.
- `src/app/[lang]/` : pages (accueil, boutique, fiche produit, panier, merci).
- `src/app/api/checkout/route.ts` : crée la session de paiement Stripe (prix toujours repris du catalogue du serveur).
- `public/images/logo.png` : logo (sinon logo texte) ; photos des produits dans `public/images/produits/`, champ `image` du produit.

## Paiement (Stripe)

Copier `.env.example` en `.env.local` et y mettre `STRIPE_SECRET_KEY` (clé `sk_test_…` pour les essais). Sans clé, le bouton « Passer au paiement » affiche « paiement pas encore configuré ». Pour que Stripe ajoute la TPS et la TVQ, créer les deux taux de taxe dans Stripe et mettre leurs identifiants dans `STRIPE_TAUX_TPS` / `STRIPE_TAUX_TVQ`.

## Mise en ligne (à faire)

1. Pousser le dépôt sur GitHub, l'importer dans Vercel, y saisir les variables d'environnement.
2. Relier le domaine evabusiness.com (aujourd'hui affiché à vendre chez HugeDomains : vérifier d'abord qui en est propriétaire).

## Designs

Quatre designs au choix (variables CSS de `src/app/globals.css`, attribut `data-design` de `<html>`) : `rose` (Rose poudré & brun), `noir` (Noir & or, comme le logo), `ivoire` (Ivoire & or, épuré), `bordeaux` (Bordeaux & nude). Le sélecteur en bas à gauche (`src/components/ChoixDesign.tsx`) est provisoire : à retirer une fois le design choisi (fixer alors `data-design` dans `src/app/[lang]/layout.tsx`). Une adresse peut imposer un design : `/fr?design=noir`.

## Rayon mèches (repris de marchemvogmbi.com)

`src/data/meches.json` : les 66 articles du rayon « Mèches & accessoires » de marchemvogmbi.com (nom, description fr/en, couleurs, ID Clover), photos dans `public/images/produits/<ID>.jpg`. Le site du marché n'affiche pas de prix : ces articles sont « Prix à venir » (pas de bouton d'achat) tant que `prix` n'est pas renseigné. La plupart des photos viennent de sites de fournisseurs ou de revendeurs (champ `photo_source`) : à remplacer par vos propres photos avant la mise en ligne.
