# Eva Business & Hair — evabusiness.com

Boutique en ligne de produits de beauté : soins des cheveux, maquillage, perruques et mèches.

- **Langues :** français et anglais.
- **Prix :** dollars canadiens, taxes du Québec (TPS 5 %, TVQ 9,975 %).
- **Livraison :** au Canada, 12 $, gratuite dès 75 $.
- **Paiement :** par carte avec Stripe Checkout.

Technique : Next.js 15 (App Router, TypeScript 5, React 19), hébergement prévu sur Vercel. © Concept Informatique inc.

---

## Sommaire

1. [Démarrer en local](#1-démarrer-en-local)
2. [Plan du site](#2-plan-du-site)
3. [Rubriques d'information](#3-rubriques-dinformation)
4. [Structure du code](#4-structure-du-code)
5. [Catalogue : ajouter ou modifier un produit](#5-catalogue--ajouter-ou-modifier-un-produit)
6. [Textes, langues et marque](#6-textes-langues-et-marque)
7. [Panier, taxes et paiement (Stripe)](#7-panier-taxes-et-paiement-stripe)
8. [Design](#8-design)
9. [Référencement (SEO)](#9-référencement-seo)
10. [Mise en ligne](#10-mise-en-ligne)
11. [À faire avant l'ouverture](#11-à-faire-avant-louverture)

---

## 1. Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000 : l'adresse redirige vers `/fr` ou `/en` selon la langue du navigateur.

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Site de développement (rechargement automatique) |
| `npm run build` | Construction de production (pages générées d'avance) |
| `npm start` | Lance la version construite |
| `npx tsc --noEmit` | Contrôle des types TypeScript |

## 2. Plan du site

Toutes les pages existent en français (`/fr/…`) et en anglais (`/en/…`) ; le lien FR / EN de l'en-tête passe d'une langue à l'autre.

| Adresse | Page |
| --- | --- |
| `/fr` | Accueil : bandeau, avantages, catégories, coups de cœur, conseils de pro |
| `/fr/boutique` | Tous les produits ; `?categorie=cheveux`, `maquillage` ou `perruques` pour filtrer |
| `/fr/produit/<slug>` | Fiche produit : photo, prix, couleurs offertes, ajout au panier, informations d'achat |
| `/fr/panier` | Panier, calcul des taxes et de la livraison, bouton de paiement |
| `/fr/merci` | Confirmation après le paiement (vide le panier) |
| `/fr/guide-achat` … | Rubriques d'information (section 3) |
| `/sitemap.xml`, `/robots.txt` | Plan du site et consignes pour les moteurs de recherche |

**Menu de l'en-tête :** Accueil, Boutique, Conseils, Nous joindre, FR/EN, Panier. Sur un écran étroit, seuls Boutique, la langue et le panier restent ; tout le reste est dans le pied de page.

**Pied de page :** 5 colonnes, soit la marque et le courriel, puis Boutique (les catégories), Conseils beauté, Service à la clientèle et L'entreprise.

## 3. Rubriques d'information

Rubriques adaptées à une boutique de beauté, de perruques et de mèches. Tous les textes sont dans **`src/lib/rubriques.ts`**, en français et en anglais.

| Groupe | Adresse | Contenu |
| --- | --- | --- |
| Conseils beauté | `/guide-achat` | Types de perruques (lace front, full lace, sans colle), sortes de mèches, longueur et nombre de paquets, tableau des codes de couleur (1B, 27, T1B/30, 99J…) |
| Conseils beauté | `/entretien` | Laver une perruque, chaleur et coiffage, soin des tresses, locs et crochets, rangement |
| Service à la clientèle | `/livraison-retours` | Tableau des frais (repris de `prix.ts`), délais, retours sous 14 jours, article défectueux |
| Service à la clientèle | `/faq` | Questions en accordéon : commandes et paiement, livraison et retours, produits |
| Service à la clientèle | `/contact` | Courriel, délai de réponse, conseils pour une réponse rapide |
| L'entreprise | `/a-propos` | Présentation et engagements |
| L'entreprise | `/conditions-de-vente` | Prix et taxes, commande, retours et garanties légales, photos, droit applicable |
| L'entreprise | `/confidentialite` | Politique de confidentialité (Loi 25 du Québec) : données recueillies, Stripe, aucun témoin publicitaire, droits |

**Comment les modifier :**

- Chaque rubrique a un `slug`, un `groupe`, un `titre`, une `intro` et des `blocs`. Un bloc peut contenir un titre, des paragraphes, une liste, des questions-réponses ou un tableau.
- La page (`src/app/[lang]/[rubrique]/page.tsx`), le pied de page et le plan du site suivent d'eux-mêmes.
- Une adresse qui ne correspond à aucune rubrique donne une page 404.
- Le montant de livraison gratuite et les frais sont lus dans `src/lib/prix.ts` : ils restent justes si on les change.

**Ailleurs sur le site :**

- **Fiche produit :** liens vers la livraison, les retours et le guide d'achat. Pour les perruques et mèches, s'y ajoute le guide d'entretien.
- **Accueil :** une section « Conseils de pro » mène au guide d'achat, à l'entretien et à la FAQ.
- **Rubriques :** chacune propose « Besoin d'aide ? », sauf Nous joindre, et les autres rubriques du même groupe.

> **Textes à faire valider par la propriétaire avant l'ouverture.** Ce sont des valeurs courantes, proposées en attendant les vraies :
>
> - délai de préparation (1 à 2 jours ouvrables) et de transport (2 à 7 jours) ;
> - retours sous 14 jours, articles neufs et non ouverts ;
> - signalement d'un défaut sous 7 jours ;
> - réponse aux courriels en 24 h ouvrables ;
> - cartes acceptées (Visa, Mastercard) ;
> - nombre de paquets conseillé (5 à 8).
>
> Ajouter aussi la raison sociale, l'adresse et le NEQ dans les conditions de vente, et le nom de la personne responsable des renseignements personnels (Loi 25) dans la politique de confidentialité.

## 4. Structure du code

```
src/
  app/
    [lang]/              pages par langue (fr, en)
      layout.tsx         en-tête, bandeau d'annonce, pied de page, polices
      page.tsx           accueil
      boutique/          liste des produits
      produit/[slug]/    fiche produit
      panier/            panier (ContenuPanier.tsx : composant client)
      merci/             retour de paiement
      [rubrique]/        rubriques d'information
    api/checkout/        création de la session Stripe
    sitemap.ts           /sitemap.xml
    robots.ts            /robots.txt
    globals.css          design (variables :root)
  components/            en-tête, carte produit, image, boutons, panier (contexte)
  data/meches.json       rayon mèches (66 articles)
  lib/
    i18n.ts              textes de l'interface fr / en
    rubriques.ts         textes des rubriques d'information
    produits.ts          catégories et catalogue
    prix.ts              taxes, livraison, format des prix
    marque.ts            nom, copyright, courriel, logo
  middleware.ts          redirige / vers /fr ou /en
public/images/           logo.png et photos des produits (produits/)
```

## 5. Catalogue : ajouter ou modifier un produit

Les produits sont dans `src/lib/produits.ts`. Pour chaque produit :

| Champ | Contenu |
| --- | --- |
| `slug` | Identifiant de l'adresse, unique, sans accents |
| `categorie` | `cheveux`, `maquillage` ou `perruques` |
| `nom`, `description` | Textes `{ fr, en }` |
| `prix` | En **cents** (`2499` = 24,99 $). Mettre `null` pour « Prix à venir » : pas de bouton d'achat, et le paiement le refuse |
| `image` | Chemin de la photo (`/images/produits/…`) ; sinon une image provisoire de la couleur de la catégorie |
| `couleurs` | Liste `{ code, description, description_en }` affichée sur la fiche |
| `vedette` | `true` pour l'afficher dans « Nos coups de cœur » de l'accueil |

- **Produits d'exemple :** les 6 produits de `EXEMPLES` (soins et maquillage) sont à remplacer par les vrais.
- **Rayon mèches :** `src/data/meches.json` contient les 66 articles du rayon « Mèches & accessoires » de marchemvogmbi.com : nom, description fr/en, couleurs, ID Clover.
  - Les photos sont dans `public/images/produits/<ID>.jpg`.
  - Le site du marché n'affiche pas de prix : ces articles sont « Prix à venir » tant que `prix` n'est pas renseigné.
  - La plupart des photos viennent de sites de fournisseurs (champ `photo_source`) : à remplacer par vos propres photos.

## 6. Textes, langues et marque

- **`src/lib/i18n.ts` :** tous les textes de l'interface (menu, bandeau, panier, aide…). Le dictionnaire anglais a le même type que le français : TypeScript refuse un texte oublié.
- **`src/lib/marque.ts` :** nom affiché (« Eva Business & Hair »), copyright (« Concept Informatique inc. ») et courriel (`info@evabusiness.com`).
- **Logo :** `public/images/logo.png`, trouvé automatiquement ; s'il est absent, un logo texte s'affiche.

## 7. Panier, taxes et paiement (Stripe)

- **Panier :** gardé dans le navigateur (`localStorage`, clé `eva-panier`), jamais sur le serveur.
- **Taxes :** TPS 5 % et TVQ 9,975 %, calculées dans `src/lib/prix.ts` au cent près.
- **Livraison :** 12 $, gratuite dès 75 $ avant taxes.
- **Paiement :** `src/app/api/checkout/route.ts` crée la session Stripe Checkout.
  - Les prix sont **toujours repris du catalogue du serveur**, jamais de ceux envoyés par le navigateur.
  - Les articles sans prix sont écartés.
  - L'adresse de livraison est demandée au Canada seulement.

**Configuration :** copier `.env.example` en `.env.local`.

| Variable | Rôle |
| --- | --- |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_test_…` pour les essais). Sans clé, le paiement répond « paiement pas encore configuré » |
| `NEXT_PUBLIC_SITE_URL` | Adresse publique du site (retours de paiement, sitemap). Par défaut : `https://evabusiness.com` |
| `STRIPE_TAUX_TPS`, `STRIPE_TAUX_TVQ` | Identifiants des taux de taxe créés dans Stripe, pour que Stripe ajoute la TPS et la TVQ |

## 8. Design

Un seul design, appelé « Clair » :

- fond blanc, texte presque noir, boutons noirs, touches d'or du logo (`#a87b25`) ;
- polices Montserrat (titres) et Inter (texte) ;
- couleurs, rayons et polices réglés dans les variables `:root` au début de `src/app/globals.css` ;
- un passage en mise en page « téléphone » sous 820 px de large.

## 9. Référencement (SEO)

- Chaque page a son titre et sa description ; le modèle de titre est « Page | Eva Business & Hair ».
- Les rubriques indiquent leur équivalent dans l'autre langue (`alternates`).
- `/sitemap.xml` liste l'accueil, la boutique, les rubriques et toutes les fiches produits dans les deux langues.
- `/robots.txt` exclut l'API, le panier et la page de remerciement.

## 10. Mise en ligne

1. Importer le dépôt GitHub dans Vercel.
2. Saisir les variables d'environnement (section 7) ; utiliser les clés Stripe de production seulement au lancement.
3. Relier le domaine evabusiness.com. Il est aujourd'hui affiché « à vendre » chez HugeDomains : vérifier d'abord qui en est propriétaire.

## 11. À faire avant l'ouverture

- [ ] Remplacer les produits d'exemple par le vrai catalogue (soins, maquillage).
- [ ] Renseigner les prix des 66 mèches.
- [ ] Remplacer les photos de fournisseurs par vos propres photos.
- [ ] Faire valider les textes des rubriques (section 3) et ajouter les coordonnées de l'entreprise.
- [ ] Clés Stripe et taux de taxe ; essai d'achat complet en mode test.
- [ ] Vercel et domaine.
