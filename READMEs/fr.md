<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../.github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="../.github/assets/hero-banner-light.svg">
  <img alt="10x: curated Claude Code plugins that ship quality" src="../.github/assets/hero-banner-light.svg" width="100%">
</picture>

<p align="center">
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-00D4FF?style=flat-square" alt="License MIT"></a>
  <a href="https://github.com/Aboudjem/10x/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/Aboudjem/10x/validate.yml?branch=main&style=flat-square&color=7C3AED&label=validate" alt="validate workflow status"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="zh-CN.md">简体中文</a> ·
  <a href="ja.md">日本語</a> ·
  <a href="es.md">Español</a> ·
  <b>Français</b>
</p>

<p align="center"><b>Une place de marché de plugins est une liste depuis laquelle votre éditeur peut installer. Celle-ci contient neuf outils de développement pour Claude Code, et vous l'ajoutez une seule fois.</b></p>

<p align="center">
  <a href="#install">Installation</a> ·
  <a href="#the-plugins">Les plugins</a> ·
  <a href="#how-it-works">Fonctionnement</a> ·
  <a href="#proof">Preuves</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#limits">Limites</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

Ce que vous voyez après ces deux commandes (exécution réelle, 2026-11-17) :

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

<a id="install"></a>

## Installation

Ajoutez la place de marché une seule fois. Claude Code peut ensuite installer n'importe lequel des neuf par son nom.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

Remplacez `sniff` par n'importe quel nom du tableau ci-dessous.

Un plugin peut lancer des commandes et lire des fichiers avec vos permissions. Lisez le dépôt d'un plugin avant de l'installer.

Vous n'utilisez pas Claude Code ? Installez un plugin à la fois avec la [CLI skills de Vercel](https://github.com/vercel-labs/skills).
Elle copie les skills dans le dossier que lit votre agent.

```bash
npx skills add Aboudjem/sniff
```

Utilisez le nom du dépôt du plugin, pas `Aboudjem/10x`. Ce dépôt est une liste et ne contient aucun skill.

<a id="the-plugins"></a>

## Les plugins

| | Plugin | À quoi ça sert | Installation | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **sniff** | Parcourt votre application en cours d'exécution et trouve de vrais bugs | `claude plugin install sniff@10x` | [dépôt](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **ui-ux-suite** | L'ESLint du design : la ligne, la valeur, le correctif | `claude plugin install ui-ux-suite@10x` | [dépôt](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **recap-studio** | Un explicatif HTML hors ligne à partir d'un sujet ou d'une session | `claude plugin install recap-studio@10x` | [dépôt](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | **aws-cost-audit** | Audite votre facture AWS par rapport aux tarifs AWS en direct | `claude plugin install aws-cost-audit@10x` | [dépôt](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **goalify** | Prépare une tâche énorme à exécuter en autonomie | `claude plugin install goalify@10x` | [dépôt](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **humanizer** | Identifie 55 habitudes d'écriture IA et les réécrit | `claude plugin install humanizer@10x` | [dépôt](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **loopify** | Prépare une tâche répétitive pour la commande `/loop` de Claude Code | `claude plugin install loopify@10x` | [dépôt](https://github.com/Aboudjem/loopify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | **secure-my-app** | Trouve ce qu'un inconnu peut vous prendre, puis prouve que c'est fermé | `claude plugin install secure-my-app@10x` | [dépôt](https://github.com/Aboudjem/secure-my-app) |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **contextify** | Rédige les instructions des agents, puis vérifie qu’elles restent à jour | `claude plugin install contextify@10x` | [repo](https://github.com/Aboudjem/contextify) |

<a id="what-each-one-does"></a>

### Ce que fait chaque plugin

#### sniff

Pointez-le vers votre application en cours d'exécution : il clique à travers vos parcours réels dans un vrai navigateur, puis vous dit ce qui s'est cassé et les étapes, dans l'ordre, qui ont mené à la casse.

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

Il lit votre CSS, votre JSX, votre HTML et vos classes Tailwind, puis indique le fichier, la ligne, la valeur mesurée erronée et le correctif exact. Il audite, il ne modifie jamais.

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

Il transforme un sujet ou une session de code en un seul fichier HTML sur lequel il suffit de double-cliquer, avec tous les styles intégrés et aucune requête externe, lisible hors ligne en environ cinq minutes.

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

Il lit votre compte AWS en direct via la CLI AWS que vous avez déjà installée et vous remet un plan d'économies où chaque prix est vérifié en direct, jamais cité de mémoire.

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

Pour une tâche trop grande pour rester à la regarder tourner, il rédige le brief (un fichier qui contient ce que l'exécution doit faire) et la condition (une ligne que vous collez dans `/goal`), afin qu'une session neuve fasse le travail et se termine en citant les vérifications réussies.

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

Il connaît 55 habitudes qui font qu'un texte se lit comme écrit par une machine, nomme celles qu'il trouve dans votre texte, le note de 0 à 100 à partir de signaux mesurables, et le réécrit dans la voix que vous choisissez.

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

Pour une tâche qui se répète plutôt qu'elle ne se termine, il rédige le brief et la ligne que vous collez dans `/loop`, la commande de répétition intégrée à Claude Code, avec un plafond de ticks et une règle d'arrêt. Chaque tick journalise ce qu'il a fait.

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

Il trouve ce qu'un inconnu peut prendre à votre application, prouve chaque constat avec une commande dont vous lisez la sortie, puis corrige uniquement ce que vous validez et relance cette même commande pour prouver que la faille est fermée et que votre propre connexion fonctionne toujours. 65 contrôles en sept groupes. Une exécution sans constat n'est jamais déclarée sûre : son troisième verdict est `NOTHING CONFIRMED HERE`.

`claude plugin install secure-my-app@10x`

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**Tell every coding agent how your repo works. Then prove it is still true.**

Il garde `AGENTS.md` court et réutilise les documents existants qui sont à jour. Au besoin, il ajoute `docs/context/architecture.md` ou `docs/context/workflows.md`, limités à 120 lignes chacun et accessibles par des liens. Les hooks Git installés vérifient le contexte au commit et au push, sans appeler de modèle ; les hooks de session sont facultatifs. Les mises à jour affichent un diff et préservent le contenu humain hors des blocs gérés.

`claude plugin install contextify@10x`

[GitHub](https://github.com/Aboudjem/contextify)

<a id="how-it-works"></a>

## Fonctionnement

10x tient en un fichier : [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json). Il ne contient aucun code de plugin.

1. Chaque entrée nomme un plugin, son dépôt GitHub et la version listée ici.
2. `claude plugin marketplace add Aboudjem/10x` clone ce dépôt et lit ce fichier.
3. `claude plugin install <name>@10x` récupère le plugin depuis son propre dépôt.
4. Une tâche planifiée relit chaque dépôt de plugin et met à jour les numéros de version. [docs/SYNC.md](../docs/SYNC.md) explique la chaîne.

<a id="other-agents"></a>

### Autres agents

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

Chaque plugin ici est livré sous forme de skills, des fichiers Markdown que votre agent lit.
C'est pourquoi les neuf s'installent en dehors de Claude Code via `npx skills add`.
La CLI skills tient sa propre [liste des agents pris en charge](https://github.com/vercel-labs/skills#supported-agents).

Trois plugins tournent aussi comme serveur MCP autonome. MCP est le protocole que parle un éditeur pour atteindre un outil extérieur.
sniff et ui-ux-suite se lancent directement depuis npm. recap-studio se lance depuis un clone, après une compilation du workspace.
Les six autres ne fournissent aucun serveur MCP.

| Agent | Installation en une ligne |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, et [le reste de la liste](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| N'importe quel client MCP | `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`, recap-studio depuis un clone compilé |
| Tout le reste | voir `docs/editors.md` dans le dépôt du plugin |

<a id="proof"></a>

## Preuves

Chaque affirmation ci-dessous vient avec la commande qui l'affiche. Lancez-les depuis un clone de ce dépôt.

| Affirmation | Commande | Ligne à repérer dans la sortie |
|:--|:--|:--|
| La liste contient neuf plugins valides | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| Chaque version listée correspond au dépôt du plugin | `npm run sync:check` | `drift: none` (si un dépôt ne peut pas être lu, elle affiche `unverified: <n> of 9 ...` et sort avec le code 1) |
| Le manifeste se charge dans Claude Code | `claude plugin validate . --strict` | `✔ Validation passed` |
| Les tests du dépôt passent | `npm test` | `# fail 0` |

La CI lance les quatre à chaque push et à chaque pull request. Elle vérifie aussi chaque lien et cherche les secrets.

<a id="the-10x-bar"></a>

### La barre 10x

| | |
|---|---|
| **Minimal par défaut** | Aucune dépendance dont un plugin n'a pas besoin. ui-ux-suite et les six skills n'en embarquent aucune. Les packages de recap-studio tirent zod, son application web Next et React. sniff pilote un vrai navigateur, il embarque donc Playwright et Lighthouse. |
| **Installation en une commande** | Aucun fichier de configuration et aucune inscription. aws-cost-audit est le seul qui a besoin d'un accès que vous n'avez peut-être pas : une CLI AWS configurée pour lire le compte. |
| **De vrais tests** | Une CI qui vérifie le comportement, pas qu'un fichier existe. |
| **Fonctionne hors de Claude Code** | S'installe dans d'autres agents via `npx skills add`. |
| **Maintenu activement** | Une publication ce trimestre, pas une archive de l'an dernier. |
| **Aucune télémétrie** | Aucune analytics et aucun appel silencieux vers un serveur distant. Chaque outil ne parle qu'à ce vers quoi vous le pointez. |

Chaque plugin listé ici est tenu de respecter cette barre. Si l'un d'eux cesse de la respecter, il est retiré. La liste complète,
avec le registre et la date de dernière vérification, se trouve dans [QUALITY-BAR.md](../QUALITY-BAR.md).

<a id="faq"></a>

## FAQ

### Qu'est-ce qu'une place de marché de plugins ?

C'est une liste depuis laquelle votre éditeur peut installer. Vous ajoutez la liste une fois, puis vous installez chaque plugin par son nom.

### Dois-je installer les neuf ?

Non. Ajouter la place de marché n'installe rien. Chaque `claude plugin install <name>@10x` installe un seul plugin.

### Est-ce que ça marche sans Claude Code ?

Oui, un plugin à la fois. Lancez `npx skills add Aboudjem/<repo>` avec le nom du dépôt du plugin, pris dans le tableau.

### Pourquoi `npx skills add Aboudjem/10x` ne trouve-t-il aucun skill ?

Ce dépôt n'est que la liste. Les skills vivent dans le dépôt de chaque plugin : pointez la commande vers ce dépôt.

### Comment mettre à jour ou retirer un plugin ?

Lancez `claude plugin update <name>@10x` pour mettre à jour. Lancez `claude plugin uninstall <name>@10x` pour le retirer.

### Est-ce que 10x collecte des données ?

Non. Le dépôt contient un fichier JSON, de la documentation et des images. Rien ne s'exécute sur votre machine.

<a id="limits"></a>

## Limites

- 10x liste des plugins. Il ne les isole pas. Un plugin s'exécute avec vos permissions.
- Les commandes Claude Code demandent la CLI `claude`. Les autres agents passent par `npx skills add`, un dépôt de plugin à la fois.
- Seuls trois plugins fournissent un serveur MCP : sniff, ui-ux-suite et recap-studio.
- aws-cost-audit a besoin d'une AWS CLI capable de lire votre compte.
- Au premier démarrage, le serveur MCP de sniff télécharge un navigateur et ses outils. Cela peut dépasser le délai de connexion de Claude Code. Préchauffez-le une fois : `npx -y sniff-qa --version`.
  Si un téléchargement interrompu laisse npx avec une erreur `Invalid Version`, videz son cache (`rm -rf ~/.npm/_npx`) puis relancez le préchauffage.
- `claude plugin list` peut afficher une note informative à côté d'un plugin, par exemple la note de lockfile de recap-studio, ou sniff 0.9.0 qui indique que les paquets qu'il liste ne sont pas installés. Le plugin s'installe et fonctionne quand même.
- La version listée ici peut avoir jusqu'à six heures de retard sur une nouvelle version d'un plugin, le temps que la synchronisation tourne.
- Chaque plugin garde sa propre licence. sniff est sous Apache-2.0, les huit autres sous MIT.

## Contribuer

Vous avez un plugin qui a sa place ici ? [CONTRIBUTING.md](../CONTRIBUTING.md) détaille les étapes de proposition.
Un workflow synchronise chaque épinglage de version depuis le dépôt propre du plugin ; [docs/SYNC.md](../docs/SYNC.md) explique la chaîne.

<p align="center">
  <sub>Créé par <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licence MIT · Aucune télémétrie, aucune collecte de données</sub>
</p>

Traduction assistée par une machine ; le README anglais fait foi en cas de divergence.
