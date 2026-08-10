# Audit Watu Care — 10 août 2026

Périmètre : copy, SEO, AI SEO, design, images, responsive, plus perf / a11y / sécurité
là où ça touche la conversion. Vérifié sur le code (`npm run build`, `type-check`, `lint`,
`test` — tous verts), pas sur le site en production.

Skills marketing coreyhaines mises à jour v1.1 → v2.x avant l'audit (voir fin de doc).

> **Statut — corrections appliquées le 10 août 2026.**
> Tous les constats techniques de ce document ont été corrigés dans le même passage :
> rendu statique, contraste, doorway pages, chiffres unifiés, durcissement de l'API,
> H1, schema, robots, poids i18n, images, code mort, llms.txt / llms-full.txt, et la
> réécriture des blocs de copy vagues. Le détail est en fin de document, section
> « Ce qui a été corrigé ». Ce qui reste ouvert exige des données métier réelles
> (fourchettes MOQ, preuve sociale, faits E-E-A-T) et ne pouvait pas être inventé.

---

## Synthèse

Base technique très solide : i18n en/fr complet (868 clés, 0 manquante), canonical +
hreflang + x-default sur les 15 templates, JSON-LD partout, sitemap avec `alternates`,
llms.txt, CSP, formulaires accessibles (autocomplete, `aria-invalid`, `aria-describedby`),
46 tests verts.

Ce qui casse la valeur de tout ça :

1. **Aucune page n'est prérendue.** 6 routes seulement dans le prerender manifest, tout le
   reste est SSR à la demande.
2. **Le bouton CTA principal échoue le contraste WCAG** (2,76:1), comme 23 autres textes.
3. **480 URLs `/markets/{pays}/{catégorie}` sans une seule ligne de contenu propre au pays** —
   risque doorway pages.
4. **Les chiffres se contredisent** entre les sections (25+ vs 30+ pays, données : 68).
5. **Zéro preuve sociale** sur tout le site : pas un logo client, pas un témoignage, pas une
   étude de cas, pas une date.

---

## P0 — À corriger en premier

### 1. Zéro page statique (perf, Core Web Vitals, coût)

`setRequestLocale()` n'est appelé nulle part (`grep -rn setRequestLocale src` → vide). Sans
lui, `getTranslations()` / `getMessages()` bascule next-intl en rendu dynamique. Résultat
vérifié :

```
.next/prerender-manifest.json → routes: 6   (_global-error, _not-found, icon.svg, llms.txt, robots.txt, sitemap)
.next/server/app/**/*.html    → 2 fichiers
build log                     → "Generating static pages (791)" … puis toutes les routes marquées ƒ
```

791 pages sont générées au build **puis jetées**. Chaque visite = un rendu serveur complet.

**Fix** : `setRequestLocale(locale)` en tête de `src/app/[locale]/layout.tsx` et de chaque
`page.tsx`, avant tout appel `getTranslations`. C'est la seule chose qui bloque le static.
Impact : TTFB, LCP, budget de crawl, facture Vercel.

Bonus au passage : le build avertit que `middleware.ts` est déprécié en Next 16 → renommer
en `proxy.ts`.

### 2. Contraste — le CTA principal échoue WCAG AA

Ratios calculés sur les tokens de `globals.css` :

| Combinaison                                       | Ratio      | Verdict     |
| ------------------------------------------------- | ---------- | ----------- |
| blanc sur `--accent` (bouton `variant="primary"`) | **2,76:1** | ✗ (min 4,5) |
| blanc sur `--primary`                             | **2,76:1** | ✗           |
| `--accent` sur blanc (liens, chiffres)            | **2,76:1** | ✗           |
| `text-white/30` (réassurance hero)                | 2,68:1     | ✗           |
| `text-white/35` (labels Stats, marquee)           | 3,16:1     | ✗           |
| `text-white/40` (sous-titre hero H2)              | 3,70:1     | ✗           |
| `text-white/45`                                   | 4,20:1     | ✗           |
| `text-white/50` (paragraphe hero)                 | 5,00:1     | ✓           |

23 occurrences de `text-white/30|35|40|45` dans `src/`. Le plus grave est le bouton :
`Button.tsx:10` → `bg-accent text-accent-foreground`, c'est le « Get a Free Quote » de tout
le site.

**Fix** : descendre `--accent` de `175 50% 45%` à ~`175 55% 30%` et `--primary` de
`200 65% 55%` à ~`200 70% 38%` **pour les surfaces portant du texte** (garder les teintes
claires pour les fonds/dégradés/mesh). Puis remonter les `text-white/3x` à `/60` minimum
(6,57:1). C'est une refonte de tokens d'une heure, pas un redesign.

### 3. 480 URLs quasi-dupliquées — risque doorway pages

`markets/[country]/[category]/page.tsx` : 24 pays × 10 catégories × 2 locales. Le seul
contenu variable est le **nom du pays injecté dans les titres**. La description de
catégorie, la grille produits, les catégories liées et le CTA sont identiques sur les 480.
Le `healthcareContext` propre au pays existe dans `countries.ts` mais n'est utilisé que sur
le hub `/markets/{pays}` — pas ici.

Même schéma sur `/solutions/{persona}/{pays}` (48 pages) : le bloc `healthcareContext` y est
recopié à l'identique du hub pays → duplication inter-templates.

C'est exactement ce que décrit la policy « doorway pages » de Google. Deux options :

- **Lazy** : `noindex` sur `/markets/{pays}/{catégorie}`, les retirer du sitemap, garder les
  liens internes pour la navigation. Vous gardez 24 hubs pays forts au lieu de 504 pages faibles.
- **Complet** : ajouter par pays × catégorie un vrai différenciateur — exigences
  réglementaires locales (DOH/DHA pour les EAU, SFDA pour l'Arabie Saoudite, PPB pour le
  Kenya…), délai et port d'entrée, devise, contraintes d'import. Vous avez déjà `capital`,
  `currency`, `languages`, `subRegion` dans la data ; il manque le champ réglementaire.

Tant que le contenu n'est pas différencié, `noindex`.

### 4. Les chiffres se contredisent

| Source                           | Pays servis |
| -------------------------------- | ----------- |
| `HeroTrustMarquee.tsx`           | 25+         |
| `Stats.tsx`                      | 25+         |
| `trustBar` (messages)            | 25+         |
| `about.stats`                    | **30+**     |
| `contact.stats`                  | **30+**     |
| `countries.ts` (données réelles) | **68**      |

Idem `stats.orders` = « 10K+ Orders delivered » vs marquee « 10M+ Units delivered » — deux
métriques différentes, jamais expliquées, jamais sourcées. Sur un site médical B2B (YMYL),
un acheteur hospitalier qui compte 68 pays sur `/markets` et lit « 25+ » en home a une
raison de moins de vous croire — et les LLM, qui recoupent, aussi.

**Fix** : une seule source de vérité (`src/lib/constants.ts` → `COUNTRIES_SERVED`,
`PRODUCT_LINES`, `UNITS_DELIVERED`), importée partout, alignée sur `countries.ts`.

### 5. API `/api/quote` — spam, injection, délivrabilité

`src/app/api/quote/route.ts` :

- **Aucun rate limit, honeypot ou captcha.** Endpoint public qui déclenche un envoi Resend
  par requête. Un script vide votre quota et noie la boîte commerciale.
- **Injection HTML dans l'e-mail interne.** `data.message`, `data.companyName`,
  `p.productName` et `p.category` sont interpolés bruts dans le HTML (`ligne 98`, `133`,
  `43-49`). Les produits viennent du store client → entièrement contrôlables par le POST.
  Un attaquant injecte un `<a href>` de phishing dans un mail qui a l'air de venir de votre
  propre site. Échapper (`&`, `<`, `>`, `"`).
- **Pas de longueur max** sur `message` / `companyName` / taille du tableau `products` dans
  le schéma Zod. Ajouter `.max()`.
- **`from: 'Watu Care Quotes <jerome@coucou-ia.com>'`** — domaine sans rapport. SPF/DKIM
  d'un autre domaine, spam probable, et l'adresse est visible par le destinataire. Passer à
  `quotes@watu-care.com` avec DNS Resend configuré.
- Les leads ne sont **qu'envoyés par mail**, jamais persistés. Un mail perdu = un lead perdu,
  et aucun reporting possible.

---

## P1 — SEO technique et on-page

### H1 de la home cassé en deux

`Hero.tsx:80-89` : le `<h1>` ne contient que « Medical Supplies ». « for Africa & Middle
East » est un `<span>` **en dehors** du h1. Le seul H1 du site le plus important est un terme
générique à 2 mots, sans marché. Fusionner dans le `<h1>` (le `<span>` interne peut garder
son style).

Sur `/markets/{pays}/{catégorie}`, le H1 est `{categoryName}` seul (« Gloves ») alors que le
`<title>` cible « Gloves in Kenya ». Le pays est dans une pastille au-dessus. Mismatch
title/H1 sur 480 pages.

### Schema.org — 4 erreurs factuelles

`src/lib/schema.ts` :

- `generateProductSchema` déclare `manufacturer: { name: 'Watu Care' }`. **Vous n'êtes pas le
  fabricant**, vous êtes le distributeur. C'est faux dans les données structurées d'un
  dispositif médical. Utiliser `seller` / `provider`, ou omettre.
- `image: product.image` = chemin relatif (`/products/gloves/...`). Schema.org exige une URL
  absolue → préfixer par `BASE_URL`.
- **NAP incohérent** : `address` = Hong Kong, `telephone` = `+212662258045` (Maroc). Idem
  dans `generateContactPageSchema` et le lien WhatsApp. Soit vous déclarez l'entité marocaine,
  soit vous utilisez un numéro HK.
- Aucun `dateModified` / `datePublished` nulle part → aucun signal de fraîcheur, ni pour
  Google ni pour les moteurs IA.

Manquants utiles : `SearchAction` sur le `WebSite` schema (vous avez une recherche interne),
`foundingDate`, `numberOfEmployees`, `vatID`/registre HK sur l'`Organization`.
`generateMedicalBusinessSchema()` est définie mais jamais appelée.

### robots.txt vs redirections

`robots.ts` interdit `/*/suppliers/` et `/*/for/`, alors que `next.config.ts` et
`middleware.ts` y posent des 301 permanents vers `/markets` et `/solutions`. Un crawler
bloqué ne suit pas la redirection → le jus des anciennes URLs est perdu. Retirer ces
`disallow`, les 301 suffisent.

### Poids i18n côté client

`[locale]/layout.tsx` passe `messages` **entier** à `NextIntlClientProvider` : 92 KB (en) /
105 KB (fr) de JSON dans le payload RSC de **chaque** page, alors que seule une poignée de
namespaces sert côté client (`nav`, `search`, `quote`, `whatsapp`). Filtrer avec `pick()`
sur les namespaces client → ~85 KB économisés par page.

---

## Images

78 MB dans `public/products/`. Détail :

| Problème                     | Chiffre                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| Fichiers > 1 MB              | 20                                                                                            |
| Le plus gros                 | `clinical-consumables/two-parts-syringe.jpg` — **8,4 MB**                                     |
| JPG/PNG non convertis        | 94 fichiers (60 jpg + 34 png)                                                                 |
| Images jamais référencées    | 15 fichiers, **4,4 MB**                                                                       |
| `hero-medical.jpg` + `.webp` | 256 KB, **référencés nulle part**                                                             |
| Référence cassée             | `/products/bodily-waste-excreta-management/commode-liners.webp` — **le fichier n'existe pas** |

Next/Image sert des dérivés optimisés, donc l'utilisateur final ne télécharge pas 8 MB —
mais : le repo git est alourdi durablement, chaque déploiement pousse 78 MB, la première
optimisation de chaque variante est lente et coûteuse, et les quotas de transformation
Vercel se consomment.

**Fix** : `npm run optimize:images` existe déjà mais n'a visiblement pas été passé sur tout —
le repasser en visant ≤ 200 KB / webp, supprimer les 15 orphelines + `hero-medical.*`, et
corriger ou fournir `commode-liners.webp`.

Le script `generate:blur-placeholders` existe aussi mais **aucun `blurDataURL` n'est utilisé
dans le code** — soit le brancher (bon gain de CLS perçu sur 82 fiches produit), soit le
supprimer.

Détail : `ProductImage.tsx:48` annonce `sizes="… 33vw"` alors que la grille passe à 4
colonnes (`xl:grid-cols-4` = 25vw) sur plusieurs pages → images légèrement surdimensionnées.

---

## Design & responsive

Le responsive est propre dans l'ensemble : mobile-first partout, aucun `overflow-x`, aucune
largeur fixe sur du contenu (les `w-[500px]` sont des blobs décoratifs en `absolute`),
`prefers-reduced-motion` géré, dock mobile avec `pb-24 lg:pb-0` sur le contenu, WhatsApp en
`bottom-24` pour ne pas chevaucher le dock. Bon travail.

Points à reprendre :

- **`Stats.tsx`** : `text-7xl` (72 px) en `grid-cols-2` sur mobile. Sur un écran 360 px, une
  colonne fait ~150 px utiles ; « 10K+ » en Nunito extrabold dépasse. Passer à `text-5xl`
  jusqu'à `sm:`.
- **« Photos coming soon » en dur en anglais** dans `ProductImage.tsx:33`,
  `ProductImageGallery.tsx:34`, `ProductCard.tsx:46` → s'affiche tel quel sur le site FR.
  Le fallback ne se déclenche par ailleurs que **côté client** (`onError`), donc en SSR
  l'image cassée passe. À traduire et à traiter côté data.
- `'Not Found'` / `'Product Not Found'` en dur dans 6 `generateMetadata`.
- **`TrustBar.tsx` est du code mort** — exporté nulle part, importé nulle part, et pourtant
  ses clés `trustBar` (« 25+ Countries Served ») vivent encore dans les deux fichiers de
  traduction. À supprimer ou à remettre en page.

---

## Copy & CRO

Le ton est correct, la structure de page aussi (hero → catégories → pourquoi nous →
comment ça marche → conformité → chiffres → marchés → FAQ → CTA). Ce qui manque, c'est la
**spécificité** — et c'est ce qui fait vendre en B2B médical.

### Les promesses ne prouvent rien

| Actuel                                                | Problème                  | Direction                                                                       |
| ----------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| « Wide Catalog » / « Wide range of medical supplies » | Adjectif creux, se répète | « 500+ références, 10 catégories, expédiées d'un seul entrepôt »                |
| « Responsive Service » / « Quick quote turnaround »   | Non mesurable             | « Devis chiffré sous 48 h, un interlocuteur unique du devis à la livraison »    |
| « Direct Relationships »                              | Tout le monde le dit      | « Contrats directs avec 12 usines certifiées ISO 13485 — sans trading company » |
| « Ready to Get Started? » (CTA final)                 | Générique                 | « Envoyez votre liste de besoins, recevez un prix FOB sous 48 h »               |
| « Quality Guaranteed »                                | Juridiquement vide        | Nommer la garantie : remplacement, délai, périmètre                             |

### Zéro preuve sociale sur tout le site

Aucun logo client, aucun témoignage, aucune étude de cas, aucun nom d'hôpital ou d'ONG,
aucune photo d'entrepôt ou d'équipe, aucune date. Sur un achat médical B2B à plusieurs
dizaines de milliers de dollars, c'est le premier frein. Même sous NDA : « un groupe
hospitalier privé de 400 lits à Abidjan », « une ONG active dans 6 pays du Sahel » + un
chiffre de volume, c'est déjà 10× ce qu'il y a aujourd'hui.

### La FAQ élude les seules questions qui comptent

- MOQ : « varies by product category… we'll find options that fit » → ne répond pas.
  Donner des fourchettes réelles par catégorie (« gants : 10 cartons, packs chirurgicaux :
  1 palette »).
- Certifications : « manufacturers that meet international quality standards » → nommer.
  ISO 13485, CE, et lesquels par catégorie.
- Prix : **le sujet n'est jamais abordé**. Pas besoin d'un tarif, mais une fourchette
  indicative FOB par catégorie transforme la page en réponse utile — pour l'acheteur comme
  pour les moteurs IA.

Bon point : les délais sont précis (« 30–50 jours mer, 6–9 jours air »). C'est exactement le
niveau de détail à répliquer partout ailleurs.

### E-E-A-T faible pour un secteur YMYL

`/about` ne dit ni qui dirige l'entreprise, ni depuis quand, ni le numéro d'enregistrement
HK, ni l'adresse précise. « We are Medical Device Supply Experts » sans nom, sans visage,
sans date. Pour du dispositif médical, c'est le critère E-E-A-T le plus lourd — et la
première chose qu'un LLM cherche pour décider s'il vous cite.

---

## AI SEO

Ce qui est déjà en place et bien fait : `llms.txt` propre et structuré (produits, marchés,
solutions, pages clés avec descriptions), robots.txt qui n'exclut aucun crawler IA, JSON-LD
sur toutes les pages, FAQPage schema, spécifications produit en listes extractibles,
hiérarchie de titres sémantique.

Ce qui manque, par ordre d'impact :

1. **Aucun signal de fraîcheur.** Pas de `dateModified` en schema, pas de « Mis à jour le »
   visible, pas de blog. Perplexity et ChatGPT pondèrent fortement la récence. C'est le
   levier le moins cher de la liste.
2. **Aucun bloc-réponse de 40–60 mots.** Les moteurs IA citent des passages autonomes. Chaque
   page catégorie devrait ouvrir sur une définition extractible : « Les gants d'examen en
   nitrile sont… Ils se distinguent du latex par… Watu Care les fournit en… ». Aujourd'hui
   les descriptions de catégorie font une phrase.
3. **Aucun tableau comparatif.** « Latex vs nitrile vs vinyle », « fret mer vs air », « CE
   vs ISO 13485 » — format que les LLM citent massivement, et que vous êtes légitime à
   produire. Zéro sur le site.
4. **Aucune présence tierce.** Les marques sont citées 6,5× plus souvent via des sources
   tierces que via leur propre domaine. Pas d'entrée Wikipédia, pas d'annuaire fournisseurs
   médicaux, pas de profil Alibaba/GlobalSources, pas de réponses sur les forums achats
   santé. C'est le travail le plus long mais le plus déterminant.
5. **`llms.txt` sans dates ni chiffres.** Ajouter la date de dernière mise à jour et les
   faits d'entité (année de création, siège, nombre de pays, certifications) — c'est le
   fichier que les agents lisent en premier.
6. Pas de `llms-full.txt` (catalogue complet en texte), alors que vous avez 82 produits
   déjà structurés — c'est quasi gratuit à générer depuis `products.ts`.
7. **Query fan-out** : une requête « medical gloves supplier Kenya » déclenche en interne des
   sous-requêtes sur MOQ, certifications, délais, prix, import. Vos pages pays répondent à 1
   des 5. Couvrir le cluster complet sur le hub pays vaut mieux que 10 pages catégorie vides.

---

## Ce qui a été fait dans cette session

Skills marketing **coreyhaines31/marketingskills v1.1.0 → v2.x** :

- Supprimé les 19 dossiers v1 obsolètes (renommés en v2) dans `.claude/skills/` et `.agents/skills/`.
- Réinstallé via `npx skills add coreyhaines31/marketingskills -a claude-code` → 49 skills.
- Nettoyé les 14 copies v1 résiduelles dans `.agents/skills/` (les symlinks pointaient vers
  du v1 périmé) ; `design-taste-frontend` et `frontend-design` conservés.
- Purgé les 18 entrées mortes de `skills-lock.json` (69 → 51).

Renommages appliqués : `page-cro` + `form-cro` → `cro`, `schema-markup` → `schema`,
`email-sequence` → `emails`, `paid-ads` → `ads`, `analytics-tracking` → `analytics`,
`ab-test-setup` → `ab-testing`, `signup-flow-cro` → `signup`, `popup-cro` → `popups`,
`paywall-upgrade-cro` → `paywalls`, `onboarding-cro` → `onboarding`, `pricing-strategy` →
`pricing`, `launch-strategy` → `launch`, `free-tool-strategy` → `free-tools`,
`referral-program` → `referrals`, `social-content` → `social`, `competitor-alternatives` →
`competitors`, `product-marketing-context` → `product-marketing`.

Nouvelles skills disponibles : `attribution`, `customer-research`, `competitor-profiling`,
`directory-submissions`, `lead-magnets`, `marketing-plan`, `marketing-council`,
`marketing-loops`, `offers`, `prospecting`, `public-relations`, `co-marketing`,
`community-marketing`, `influencer-marketing`, `image`, `video`, `sms`, `aso`.

**À faire** : `.agents/product-marketing.md` n'existe pas. Toutes les skills v2 le lisent en
premier pour connaître le produit, l'ICP et le positionnement. Le créer avec la skill
`product-marketing` éviterait de re-expliquer le contexte à chaque tâche marketing.

---

## Ce qui a été corrigé

| Constat | Correction | Vérification |
|---|---|---|
| Zéro page prérendue | `setRequestLocale(locale)` dans le layout et les 15 `page.tsx` | prerender manifest : 6 → **791** routes, 2 → **786** fichiers HTML |
| CTA à 2,76:1 | `--primary` → `200 70% 38%`, `--accent` → `175 55% 32%` ; nouveaux tokens `--primary-light` / `--accent-light` pour les sections navy ; fin du dégradé `.gradient-hero` descendu à 16 % | blanc sur accent **4,8:1**, sur primary **4,9:1**, tokens clairs sur navy **8,3–8,5:1** |
| 23 textes `text-white/30-45` | remontés à `/60` (**6,57:1**) | plus aucune occurrence < `/50` |
| 480 doorway pages | `robots: { index: false, follow: true }` sur `/markets/{pays}/{catégorie}` + retrait du sitemap ; H1 aligné sur le `<title>` | sitemap : 480 URLs en moins |
| 25+ / 30+ / 68 pays | `src/lib/constants.ts` compte les pays depuis `countries.ts` ; hero, Stats, WhyUs, about et contact importent la même constante | une seule valeur, dérivée des données |
| API sans garde-fous | rate limit 5 / 10 min par IP, `escapeHtml` sur tous les champs, `.max()` Zod, expéditeur via `QUOTE_EMAIL_FROM` | 3 tests ajoutés (injection, 429, longueur) — 49 tests verts |
| H1 « Medical Supplies » | les deux lignes fusionnées dans le `<h1>` | — |
| Schema faux | `manufacturer` → `provider`, URL d'image absolue, téléphone déplacé sur le `ContactPoint`, `dateModified`, `knowsAbout` | — |
| robots bloquait les 301 | `disallow` réduit à `/api/` et `/_next/` | — |
| 80 KB de JSON par page | `NextIntlClientProvider` ne reçoit que les 8 namespaces lus côté client | 79,6 KB → **32,3 KB** |
| 78 MB d'images | `npm run shrink:images` (nouveau) + purge des 17 orphelines + suppression de la référence morte `commode-liners` | `public/` : 79 MB → **21 MB**, 0 référence cassée |
| Code mort | `TrustBar`, `HeroGraphic`, `generate-blur-placeholders`, namespace `valueProps` supprimés ; `middleware.ts` → `proxy.ts` | avertissement Next 16 levé |
| Chiffres Stats en 360 px | `text-5xl sm:text-7xl` | — |
| « Photos coming soon » en dur | clé `products.photosComingSoon` (en/fr) ; titres « Not Found » via `notFoundTitle()` | — |
| Copy vague | `whyUs`, `cta` et les réponses MOQ / certifications réécrites en faits chiffrés ; question **pricing** ajoutée à la FAQ (donc au FAQPage schema) | en + fr |
| AI SEO | `llms.txt` enrichi (date, 11 faits d'entité, nombre de lignes par catégorie) ; **`/llms-full.txt`** ajouté — les 82 produits avec specs ; `dateModified` dans le schema | — |

## Ce qui reste ouvert (données métier requises)

Ces points ne sont pas corrigeables sans chiffres réels — les inventer aurait été pire
que de les laisser :

1. **Fourchettes MOQ concrètes.** La réponse FAQ explique désormais *comment* la MOQ est
   fixée (palette / conteneur / carton, regroupement multi-catégories), mais les seuils
   réels par catégorie doivent venir de vous.
2. **Preuve sociale.** Toujours zéro logo, témoignage ou étude de cas. Même anonymisé
   (« groupe hospitalier privé de 400 lits à Abidjan »), c'est le levier de conversion le
   plus fort qui manque.
3. **E-E-A-T sur `/about`.** Dirigeants, année de création, numéro d'enregistrement HK,
   adresse précise. Critère lourd en YMYL médical, et premier signal qu'un LLM cherche.
4. **Blocs-réponse et tableaux comparatifs.** `llms-full.txt` couvre l'extractibilité du
   catalogue, mais « latex vs nitrile vs vinyle », « mer vs air », « CE vs ISO 13485 »
   restent à écrire — c'est un chantier éditorial, pas un correctif.
5. **Présence tierce** (Wikipédia, annuaires fournisseurs médicaux, forums achats santé).
6. **Différenciation des pages pays × catégorie** si vous voulez les réindexer : exigences
   du régulateur local, port d'entrée, délai, devise.

## Ordre d'attaque suggéré

1. `setRequestLocale` — 30 min, débloque le rendu statique de tout le site.
2. Tokens de couleur + `text-white/3x` — 1 h, débloque la conformité WCAG du CTA principal.
3. Chiffres unifiés dans `constants.ts` — 30 min.
4. Rate limit + échappement HTML + domaine d'envoi sur `/api/quote` — 2 h.
5. `noindex` sur `/markets/{pays}/{catégorie}` — 15 min, en attendant la différenciation.
6. H1 de la home + schema (`manufacturer`, URL absolue, NAP) — 1 h.
7. Images : optimiser, purger, réparer `commode-liners` — 1 h.
8. Copy : chiffrer les 5 promesses creuses + fourchettes MOQ/prix en FAQ — 1 jour.
9. Preuve sociale (même anonymisée) + page About avec noms et dates — 1 jour.
10. Blocs-réponse + tableaux comparatifs + dates → AI SEO — en continu.
