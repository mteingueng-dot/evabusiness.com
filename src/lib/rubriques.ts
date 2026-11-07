import type { Langue } from "./i18n";
import { COURRIEL, MARQUE } from "./marque";
import { FRAIS_LIVRAISON, SEUIL_LIVRAISON_GRATUITE } from "./prix";

/**
 * Rubriques d'information du site (pages /fr/<slug> et /en/<slug>).
 *
 * Chaque rubrique a un titre, une introduction et des blocs (titre facultatif,
 * paragraphes, liste à puces, questions-réponses, tableau). Pour modifier un texte,
 * il suffit de changer ce fichier : la page, le menu du pied de page et le plan du
 * site (sitemap.xml) suivent d'eux-mêmes.
 *
 * Les faits commerciaux encore à confirmer par la propriétaire (délais, adresse,
 * politique de retour) sont listés dans le README, section « Rubriques ».
 */

export type Bloc = {
  titre?: string;
  paragraphes?: string[];
  liste?: string[];
  questions?: [question: string, reponse: string][];
  tableau?: { entetes: string[]; lignes: string[][] };
};

export type Groupe = "conseils" | "service" | "entreprise";

export type Rubrique = {
  slug: string;
  groupe: Groupe;
  titre: Record<Langue, string>;
  intro: Record<Langue, string>;
  blocs: Record<Langue, Bloc[]>;
};

export const GROUPES: Record<Groupe, Record<Langue, string>> = {
  conseils: { fr: "Conseils beauté", en: "Beauty advice" },
  service: { fr: "Service à la clientèle", en: "Customer service" },
  entreprise: { fr: "L'entreprise", en: "Company" },
};

const dollars = (cents: number, langue: Langue) =>
  langue === "fr" ? `${cents / 100} $` : `$${cents / 100}`;

const seuil = { fr: dollars(SEUIL_LIVRAISON_GRATUITE, "fr"), en: dollars(SEUIL_LIVRAISON_GRATUITE, "en") };
const frais = { fr: dollars(FRAIS_LIVRAISON, "fr"), en: dollars(FRAIS_LIVRAISON, "en") };

export const RUBRIQUES: Rubrique[] = [
  // ───────────────────────────── Conseils beauté ─────────────────────────────
  {
    slug: "guide-achat",
    groupe: "conseils",
    titre: { fr: "Bien choisir sa perruque et ses mèches", en: "Choosing your wig and braiding hair" },
    intro: {
      fr: "Types de perruques, sortes de mèches, longueurs, nombre de paquets et codes de couleur : tout ce qu'il faut savoir avant de commander.",
      en: "Wig types, kinds of braiding hair, lengths, number of packs and colour codes: everything you need to know before ordering.",
    },
    blocs: {
      fr: [
        {
          titre: "Les types de perruques",
          liste: [
            "Perruque à lace frontale (lace front) : une dentelle fine sur le devant donne une ligne de cheveux naturelle et permet de dégager le visage.",
            "Perruque full lace : dentelle sur toute la tête ; se coiffe en queue de cheval ou avec une raie n'importe où.",
            "Perruque sans colle (glueless) : se pose en quelques minutes avec bande élastique et peignes, idéale pour débuter.",
            "Perruque synthétique ou cheveux naturels : la synthétique garde sa coiffure et coûte moins cher ; les cheveux naturels se lissent, se bouclent et se colorent comme vos propres cheveux.",
          ],
        },
        {
          titre: "Les sortes de mèches",
          liste: [
            "Mèches à tresser (pré-étirées ou non) : box braids, knotless, twists. Les mèches pré-étirées (« pre-stretched ») ont des pointes effilées et font gagner du temps.",
            "Mèches crochet : boucles, vagues ou locs déjà formées, posées au crochet sur des nattes plaquées.",
            "Locs et faux locs (butterfly locs, goddess locs) : effet locs sans engagement.",
            "Mèches bouclées pour French curl : tresses aux pointes ondulées.",
          ],
        },
        {
          titre: "Longueur et nombre de paquets",
          paragraphes: [
            "Les longueurs sont indiquées en pouces (1 po = 2,54 cm). Pour des tresses complètes de longueur moyenne, comptez en général 5 à 8 paquets ; prévoyez davantage pour des tresses fines, très longues ou très fournies.",
            "En cas de doute, écrivez-nous avec une photo de la coiffure voulue : nous vous indiquons la quantité à commander.",
          ],
        },
        {
          titre: "Les codes de couleur",
          paragraphes: [
            "Les fabricants désignent les couleurs par des codes. La lettre T (ombré) indique un dégradé de la racine vers les pointes ; F ou FS un mélange de deux couleurs dans la mèche.",
          ],
          tableau: {
            entetes: ["Code", "Couleur"],
            lignes: [
              ["1", "Noir de jais"],
              ["1B", "Noir naturel"],
              ["2", "Brun très foncé"],
              ["4", "Brun moyen"],
              ["27", "Blond miel"],
              ["30", "Châtain cuivré"],
              ["33", "Auburn foncé"],
              ["350", "Cuivre"],
              ["99J", "Bordeaux prune"],
              ["BUG", "Bourgogne"],
              ["613", "Blond platine"],
              ["T1B/30", "Ombré noir naturel vers châtain cuivré"],
              ["FS1B/30", "Mélange noir naturel et châtain cuivré"],
            ],
          },
        },
        {
          paragraphes: [
            "Les couleurs peuvent paraître légèrement différentes selon votre écran. Chaque fiche produit indique les couleurs offertes pour l'article.",
          ],
        },
      ],
      en: [
        {
          titre: "Wig types",
          liste: [
            "Lace front wig: a fine lace on the front gives a natural hairline and lets you wear the hair off your face.",
            "Full lace wig: lace on the whole cap; can be worn in a ponytail or parted anywhere.",
            "Glueless wig: goes on in minutes with an elastic band and combs, ideal for beginners.",
            "Synthetic or human hair: synthetic keeps its style and costs less; human hair can be straightened, curled and coloured like your own hair.",
          ],
        },
        {
          titre: "Kinds of braiding hair",
          liste: [
            "Braiding hair (pre-stretched or not): box braids, knotless braids, twists. Pre-stretched hair has feathered ends and saves time.",
            "Crochet hair: ready-made curls, waves or locs, installed with a crochet hook on cornrows.",
            "Locs and faux locs (butterfly locs, goddess locs): the loc look without commitment.",
            "French curl braiding hair: braids with wavy ends.",
          ],
        },
        {
          titre: "Length and number of packs",
          paragraphes: [
            "Lengths are given in inches. For a full head of medium-length braids, plan on 5 to 8 packs in general; plan more for small, very long or very full braids.",
            "If in doubt, send us a photo of the style you want and we will tell you how much to order.",
          ],
        },
        {
          titre: "Colour codes",
          paragraphes: [
            "Manufacturers name colours with codes. The letter T (ombré) means a gradient from root to tip; F or FS a blend of two colours in the hair.",
          ],
          tableau: {
            entetes: ["Code", "Colour"],
            lignes: [
              ["1", "Jet black"],
              ["1B", "Natural black"],
              ["2", "Darkest brown"],
              ["4", "Medium brown"],
              ["27", "Honey blonde"],
              ["30", "Copper auburn"],
              ["33", "Dark auburn"],
              ["350", "Copper"],
              ["99J", "Plum burgundy"],
              ["BUG", "Burgundy"],
              ["613", "Platinum blonde"],
              ["T1B/30", "Ombré natural black to copper auburn"],
              ["FS1B/30", "Blend of natural black and copper auburn"],
            ],
          },
        },
        {
          paragraphes: [
            "Colours may look slightly different depending on your screen. Each product page lists the colours available for that item.",
          ],
        },
      ],
    },
  },
  {
    slug: "entretien",
    groupe: "conseils",
    titre: { fr: "Entretien des perruques et mèches", en: "Wig and braid care" },
    intro: {
      fr: "Quelques gestes simples pour garder vos perruques, tresses et locs belles plus longtemps.",
      en: "A few simple habits to keep your wigs, braids and locs looking good for longer.",
    },
    blocs: {
      fr: [
        {
          titre: "Laver une perruque",
          liste: [
            "Démêlez à sec avec un peigne à dents larges, en partant des pointes.",
            "Lavez à l'eau tiède (jamais chaude pour une synthétique) avec un shampoing doux, sans frotter.",
            "Rincez, appliquez un revitalisant sur les longueurs en évitant la dentelle et les nœuds.",
            "Épongez avec une serviette, puis laissez sécher sur une tête de mannequin ou un support.",
            "Fréquence : environ toutes les 10 à 15 utilisations, ou plus souvent par temps chaud.",
          ],
        },
        {
          titre: "Chaleur et coiffage",
          liste: [
            "Synthétique : pas de fer ni de séchoir, sauf si l'étiquette indique « résistante à la chaleur » (et alors à basse température).",
            "Cheveux naturels : utilisez toujours un protecteur thermique.",
          ],
        },
        {
          titre: "Tresses, locs et crochets",
          liste: [
            "Hydratez le cuir chevelu avec une huile légère ou un spray, sans alourdir les tresses.",
            "Dormez avec un foulard ou un bonnet en satin pour limiter les frisottis.",
            "Gardez la coiffure 4 à 8 semaines au plus pour protéger vos cheveux et vos racines.",
          ],
        },
        {
          titre: "Rangement",
          paragraphes: [
            "Rangez la perruque sur un support ou dans un filet, à l'abri de la poussière et du soleil. Gardez les mèches dans leur emballage jusqu'à la pose.",
          ],
        },
      ],
      en: [
        {
          titre: "Washing a wig",
          liste: [
            "Detangle dry with a wide-tooth comb, starting from the ends.",
            "Wash in lukewarm water (never hot for synthetic hair) with a gentle shampoo, without rubbing.",
            "Rinse and apply conditioner to the lengths, avoiding the lace and the knots.",
            "Pat dry with a towel, then let it dry on a mannequin head or a stand.",
            "How often: about every 10 to 15 wears, or more often in hot weather.",
          ],
        },
        {
          titre: "Heat and styling",
          liste: [
            "Synthetic: no flat iron or blow-dryer, unless the label says heat resistant (and then at a low setting).",
            "Human hair: always use a heat protectant.",
          ],
        },
        {
          titre: "Braids, locs and crochet styles",
          liste: [
            "Moisturize the scalp with a light oil or spray, without weighing the braids down.",
            "Sleep with a satin scarf or bonnet to reduce frizz.",
            "Keep the style 4 to 8 weeks at most to protect your hair and roots.",
          ],
        },
        {
          titre: "Storage",
          paragraphes: [
            "Store the wig on a stand or in a net, away from dust and sunlight. Keep braiding hair in its package until installation.",
          ],
        },
      ],
    },
  },

  // ─────────────────────────── Service à la clientèle ───────────────────────────
  {
    slug: "livraison-retours",
    groupe: "service",
    titre: { fr: "Livraison et retours", en: "Shipping and returns" },
    intro: {
      fr: `Livraison partout au Canada, gratuite dès ${seuil.fr} d'achats.`,
      en: `Shipping anywhere in Canada, free on orders of ${seuil.en} or more.`,
    },
    blocs: {
      fr: [
        {
          titre: "Livraison",
          tableau: {
            entetes: ["Montant de la commande (avant taxes)", "Frais de livraison"],
            lignes: [
              [`Moins de ${seuil.fr}`, frais.fr],
              [`${seuil.fr} et plus`, "Gratuite"],
            ],
          },
          liste: [
            "Nous livrons partout au Canada. Les commandes sont préparées en 1 à 2 jours ouvrables.",
            "Délai de transport : en général 2 à 7 jours ouvrables selon la province.",
            "Vous recevez une confirmation de commande par courriel après le paiement.",
          ],
        },
        {
          titre: "Retours et échanges",
          liste: [
            "Vous avez 14 jours après la réception pour nous demander un retour ou un échange.",
            "Par souci d'hygiène, les perruques, mèches et produits de beauté ne sont repris que s'ils sont neufs, non ouverts et dans leur emballage d'origine.",
            "Les frais de retour sont à votre charge, sauf si l'article reçu est défectueux ou n'est pas celui commandé.",
            "Le remboursement est fait sur la carte utilisée, dès la réception et la vérification de l'article.",
          ],
        },
        {
          titre: "Article défectueux ou erreur de commande",
          paragraphes: [
            `Écrivez-nous à ${COURRIEL} dans les 7 jours suivant la réception, avec votre numéro de commande et une photo. Nous vous proposons un échange ou un remboursement, sans frais.`,
          ],
        },
      ],
      en: [
        {
          titre: "Shipping",
          tableau: {
            entetes: ["Order amount (before taxes)", "Shipping fee"],
            lignes: [
              [`Under ${seuil.en}`, frais.en],
              [`${seuil.en} and more`, "Free"],
            ],
          },
          liste: [
            "We ship anywhere in Canada. Orders are prepared within 1 to 2 business days.",
            "Transit time: usually 2 to 7 business days depending on the province.",
            "You receive an order confirmation by email after payment.",
          ],
        },
        {
          titre: "Returns and exchanges",
          liste: [
            "You have 14 days after delivery to ask for a return or an exchange.",
            "For hygiene reasons, wigs, braiding hair and beauty products can only be returned new, unopened and in their original packaging.",
            "Return shipping is at your expense, unless the item is defective or is not the one you ordered.",
            "Refunds go back to the card used, once the item has been received and checked.",
          ],
        },
        {
          titre: "Defective item or wrong order",
          paragraphes: [
            `Write to us at ${COURRIEL} within 7 days of delivery, with your order number and a photo. We will offer an exchange or a refund at no cost.`,
          ],
        },
      ],
    },
  },
  {
    slug: "faq",
    groupe: "service",
    titre: { fr: "Questions fréquentes", en: "Frequently asked questions" },
    intro: {
      fr: "Les réponses aux questions qu'on nous pose le plus souvent.",
      en: "Answers to the questions we are asked most often.",
    },
    blocs: {
      fr: [
        {
          titre: "Commandes et paiement",
          questions: [
            [
              "Quels modes de paiement acceptez-vous ?",
              "Les cartes de crédit et de débit Visa et Mastercard, par la page de paiement sécurisée de Stripe. Nous ne voyons ni ne gardons jamais votre numéro de carte.",
            ],
            [
              "Les prix incluent-ils les taxes ?",
              "Non. Les prix sont en dollars canadiens, avant taxes. La TPS (5 %) et la TVQ (9,975 %) sont ajoutées au panier.",
            ],
            [
              "Un article affiche « Prix à venir ». Puis-je l'acheter ?",
              `Il sera bientôt en vente en ligne. En attendant, écrivez-nous à ${COURRIEL} : nous vous donnons le prix et la disponibilité.`,
            ],
            [
              "Puis-je modifier ou annuler ma commande ?",
              "Oui, tant qu'elle n'est pas expédiée. Écrivez-nous le plus tôt possible avec votre numéro de commande.",
            ],
          ],
        },
        {
          titre: "Livraison et retours",
          questions: [
            [
              "Livrez-vous hors du Canada ?",
              "Pas pour le moment : nous livrons seulement au Canada.",
            ],
            [
              "Combien coûte la livraison ?",
              `${frais.fr}, et gratuite dès ${seuil.fr} d'achats avant taxes.`,
            ],
            [
              "Puis-je retourner une perruque ?",
              "Oui, dans les 14 jours, si elle est neuve, non portée et dans son emballage d'origine (règle d'hygiène).",
            ],
          ],
        },
        {
          titre: "Produits",
          questions: [
            [
              "Combien de paquets de mèches me faut-il ?",
              "En général 5 à 8 paquets pour des tresses complètes de longueur moyenne. Notre guide d'achat donne plus de détails.",
            ],
            [
              "Que veut dire 1B, T27 ou 99J ?",
              "Ce sont les codes de couleur des fabricants. Le tableau complet est dans notre guide d'achat.",
            ],
            [
              "Puis-je utiliser un fer sur une perruque synthétique ?",
              "Seulement si elle est indiquée « résistante à la chaleur », et à basse température. Voir notre guide d'entretien.",
            ],
          ],
        },
      ],
      en: [
        {
          titre: "Orders and payment",
          questions: [
            [
              "Which payment methods do you accept?",
              "Visa and Mastercard credit and debit cards, through Stripe's secure checkout page. We never see or keep your card number.",
            ],
            [
              "Do prices include taxes?",
              "No. Prices are in Canadian dollars, before taxes. GST (5%) and QST (9.975%) are added in the cart.",
            ],
            [
              "An item shows “Price coming soon”. Can I buy it?",
              `It will be for sale online soon. Meanwhile, write to ${COURRIEL}: we will give you the price and availability.`,
            ],
            [
              "Can I change or cancel my order?",
              "Yes, as long as it has not shipped. Write to us as soon as possible with your order number.",
            ],
          ],
        },
        {
          titre: "Shipping and returns",
          questions: [
            ["Do you ship outside Canada?", "Not for now: we only ship within Canada."],
            ["How much is shipping?", `${frais.en}, and free on orders of ${seuil.en} or more before taxes.`],
            [
              "Can I return a wig?",
              "Yes, within 14 days, if it is new, unworn and in its original packaging (hygiene rule).",
            ],
          ],
        },
        {
          titre: "Products",
          questions: [
            [
              "How many packs of braiding hair do I need?",
              "Usually 5 to 8 packs for a full head of medium-length braids. Our buying guide gives more details.",
            ],
            [
              "What do 1B, T27 or 99J mean?",
              "These are the manufacturers' colour codes. The full table is in our buying guide.",
            ],
            [
              "Can I use a flat iron on a synthetic wig?",
              "Only if it is labelled heat resistant, and at a low setting. See our care guide.",
            ],
          ],
        },
      ],
    },
  },
  {
    slug: "contact",
    groupe: "service",
    titre: { fr: "Nous joindre", en: "Contact us" },
    intro: {
      fr: "Une question sur un produit, une commande ou une coiffure ? Nous sommes là pour vous conseiller.",
      en: "A question about a product, an order or a hairstyle? We are here to help.",
    },
    blocs: {
      fr: [
        {
          titre: "Par courriel",
          paragraphes: [
            COURRIEL,
            "Nous répondons en général en moins de 24 heures ouvrables, en français ou en anglais.",
          ],
        },
        {
          titre: "Pour une réponse plus rapide",
          liste: [
            "Indiquez votre numéro de commande s'il s'agit d'une commande.",
            "Pour un conseil coiffure, joignez une photo du style voulu.",
            "Pour un article « Prix à venir », donnez son nom et la couleur souhaitée.",
          ],
        },
      ],
      en: [
        {
          titre: "By email",
          paragraphes: [COURRIEL, "We usually answer within 24 business hours, in French or English."],
        },
        {
          titre: "For a faster answer",
          liste: [
            "Include your order number if it is about an order.",
            "For hairstyle advice, attach a photo of the look you want.",
            "For a “Price coming soon” item, give its name and the colour you want.",
          ],
        },
      ],
    },
  },

  // ─────────────────────────────── L'entreprise ───────────────────────────────
  {
    slug: "a-propos",
    groupe: "entreprise",
    titre: { fr: `À propos de ${MARQUE}`, en: `About ${MARQUE}` },
    intro: {
      fr: "Une boutique de beauté pensée pour les cheveux texturés, les tresses et les perruques.",
      en: "A beauty shop designed for textured hair, braids and wigs.",
    },
    blocs: {
      fr: [
        {
          paragraphes: [
            `${MARQUE} réunit en un seul endroit les produits de soin capillaire, le maquillage, les perruques et les mèches dont vous avez besoin pour vous sentir belle au quotidien.`,
            "Nous choisissons des marques reconnues et des articles que nos clientes redemandent, et nous prenons le temps de vous conseiller : type de perruque, nombre de paquets, couleur, entretien.",
          ],
        },
        {
          titre: "Nos engagements",
          liste: [
            "Des produits de qualité, choisis avec soin.",
            "Des conseils personnalisés, en français et en anglais.",
            `Une livraison partout au Canada, gratuite dès ${seuil.fr}.`,
            "Un paiement sécurisé et des prix clairs, taxes affichées au panier.",
          ],
        },
      ],
      en: [
        {
          paragraphes: [
            `${MARQUE} brings together in one place the hair care products, makeup, wigs and braiding hair you need to feel beautiful every day.`,
            "We choose trusted brands and the items our customers ask for again, and we take the time to advise you: wig type, number of packs, colour, care.",
          ],
        },
        {
          titre: "Our commitments",
          liste: [
            "Quality products, carefully selected.",
            "Personal advice, in French and English.",
            `Shipping anywhere in Canada, free from ${seuil.en}.`,
            "Secure payment and clear prices, with taxes shown in the cart.",
          ],
        },
      ],
    },
  },
  {
    slug: "conditions-de-vente",
    groupe: "entreprise",
    titre: { fr: "Conditions de vente", en: "Terms of sale" },
    intro: {
      fr: `Les conditions qui s'appliquent à toute commande passée sur le site ${MARQUE}.`,
      en: `The terms that apply to every order placed on the ${MARQUE} website.`,
    },
    blocs: {
      fr: [
        {
          titre: "Prix et taxes",
          paragraphes: [
            "Les prix sont en dollars canadiens, avant taxes. La TPS et la TVQ sont calculées au panier et sur la page de paiement. Le prix applicable est celui affiché au moment de la commande.",
          ],
        },
        {
          titre: "Commande et paiement",
          paragraphes: [
            "La commande est confirmée lorsque le paiement est accepté par Stripe. Une confirmation est envoyée par courriel. En cas de rupture de stock après la commande, nous vous proposons un autre article ou le remboursement complet.",
          ],
        },
        {
          titre: "Livraison, retours et garanties",
          paragraphes: [
            "Les frais, délais et conditions de retour sont décrits à la page Livraison et retours. Ces conditions s'ajoutent aux garanties prévues par la Loi sur la protection du consommateur du Québec, qui continuent de s'appliquer.",
          ],
        },
        {
          titre: "Photos et couleurs",
          paragraphes: [
            "Les photos sont présentées à titre indicatif ; la couleur réelle peut varier légèrement selon l'écran et le lot du fabricant.",
          ],
        },
        {
          titre: "Droit applicable",
          paragraphes: ["Ces conditions sont régies par les lois du Québec et du Canada."],
        },
      ],
      en: [
        {
          titre: "Prices and taxes",
          paragraphes: [
            "Prices are in Canadian dollars, before taxes. GST and QST are calculated in the cart and on the payment page. The price that applies is the one shown when you order.",
          ],
        },
        {
          titre: "Order and payment",
          paragraphes: [
            "Your order is confirmed when Stripe accepts the payment. A confirmation is sent by email. If an item goes out of stock after you order, we offer another item or a full refund.",
          ],
        },
        {
          titre: "Shipping, returns and warranties",
          paragraphes: [
            "Fees, delivery times and return conditions are described on the Shipping and returns page. These terms are in addition to the warranties provided by Quebec's Consumer Protection Act, which still apply.",
          ],
        },
        {
          titre: "Photos and colours",
          paragraphes: [
            "Photos are for illustration; the actual colour may vary slightly depending on your screen and the manufacturer's batch.",
          ],
        },
        {
          titre: "Governing law",
          paragraphes: ["These terms are governed by the laws of Quebec and Canada."],
        },
      ],
    },
  },
  {
    slug: "confidentialite",
    groupe: "entreprise",
    titre: { fr: "Politique de confidentialité", en: "Privacy policy" },
    intro: {
      fr: "Comment nous protégeons vos renseignements personnels, conformément à la Loi 25 du Québec.",
      en: "How we protect your personal information, in line with Quebec's Law 25.",
    },
    blocs: {
      fr: [
        {
          titre: "Renseignements recueillis",
          liste: [
            "Au paiement : nom, courriel, adresse de livraison et téléphone, saisis sur la page sécurisée de Stripe.",
            "Votre numéro de carte est traité uniquement par Stripe ; nous n'y avons jamais accès.",
            "Le contenu de votre panier est gardé dans votre navigateur seulement (stockage local), jamais sur nos serveurs.",
          ],
        },
        {
          titre: "Utilisation",
          paragraphes: [
            "Ces renseignements servent uniquement à traiter, expédier et suivre votre commande et à vous répondre. Ils ne sont jamais vendus. Ils ne sont partagés qu'avec les fournisseurs nécessaires à la commande (paiement, transporteur).",
          ],
        },
        {
          titre: "Témoins (cookies)",
          paragraphes: [
            "Le site n'utilise aucun témoin publicitaire ni outil de suivi. Seul le stockage local du panier est utilisé.",
          ],
        },
        {
          titre: "Vos droits et responsable",
          paragraphes: [
            `Vous pouvez demander l'accès à vos renseignements, leur correction ou leur suppression. La personne responsable de la protection des renseignements personnels peut être jointe à ${COURRIEL}.`,
          ],
        },
      ],
      en: [
        {
          titre: "Information we collect",
          liste: [
            "At checkout: name, email, shipping address and phone, entered on Stripe's secure page.",
            "Your card number is handled only by Stripe; we never have access to it.",
            "Your cart is kept in your browser only (local storage), never on our servers.",
          ],
        },
        {
          titre: "How it is used",
          paragraphes: [
            "This information is used only to process, ship and follow up on your order and to answer you. It is never sold. It is shared only with the providers needed for the order (payment, carrier).",
          ],
        },
        {
          titre: "Cookies",
          paragraphes: [
            "The site uses no advertising cookies or tracking tools. Only the cart's local storage is used.",
          ],
        },
        {
          titre: "Your rights and contact person",
          paragraphes: [
            `You can ask to access, correct or delete your information. The person in charge of protecting personal information can be reached at ${COURRIEL}.`,
          ],
        },
      ],
    },
  },
];

export function rubriqueParSlug(slug: string): Rubrique | undefined {
  return RUBRIQUES.find((r) => r.slug === slug);
}

export function rubriquesDuGroupe(groupe: Groupe): Rubrique[] {
  return RUBRIQUES.filter((r) => r.groupe === groupe);
}
