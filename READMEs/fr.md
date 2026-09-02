<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../.github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="../.github/assets/hero-banner-light.svg">
  <img alt="10x: curated Claude Code plugins that ship quality" src="../.github/assets/hero-banner-light.svg" width="100%">
</picture>

<p align="center">
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-00D4FF?style=flat-square" alt="License MIT"></a>
  <a href="https://github.com/Aboudjem/10x/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/Aboudjem/10x/validate.yml?branch=main&style=flat-square&color=7C3AED&label=validate" alt="validate workflow status"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=FF2D78" alt="GitHub stars"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="zh-CN.md">简体中文</a> ·
  <a href="ja.md">日本語</a> ·
  <a href="es.md">Español</a> ·
  <b>Français</b>
</p>

<p align="center"><b>Une place de marché de plugins est une liste depuis laquelle votre éditeur peut installer. Celle-ci contient sept outils de développement pour Claude Code, et vous l'ajoutez une seule fois.</b></p>

<p align="center">
  <a href="#install">Installation</a> ·
  <a href="#the-plugins">Les plugins</a> ·
  <a href="#what-each-one-does">Ce que fait chaque plugin</a> ·
  <a href="#works-with-any-ai-editor">Fonctionne avec n'importe quel éditeur IA</a> ·
  <a href="#the-10x-bar">La barre 10x</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

<a id="install"></a>

## Installation

Ajoutez la place de marché une seule fois. Claude Code peut ensuite installer n'importe lequel des sept par son nom.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

Remplacez `sniff` par n'importe quel nom du tableau ci-dessous. En dehors de Claude Code, les mêmes
skills s'installent via la [CLI skills de Vercel](https://github.com/vercel-labs/skills), qui les installe dans le répertoire
que lit votre agent :

```bash
npx skills add Aboudjem/sniff
```

<a id="the-plugins"></a>

## Les plugins

| | Plugin | À quoi ça sert | Installation | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **sniff** | Parcourt votre application en cours d'exécution et trouve de vrais bugs | `claude plugin install sniff@10x` | [dépôt](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **ui-ux-suite** | L'ESLint du design : la ligne, la valeur, le correctif | `claude plugin install ui-ux-suite@10x` | [dépôt](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **recap-studio** | Un explicatif HTML hors ligne à partir d'un sujet ou d'une session | `claude plugin install recap-studio@10x` | [dépôt](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-512.png" width="28" alt=""> | **aws-cost-audit** | Audite votre facture AWS par rapport aux tarifs AWS en direct | `claude plugin install aws-cost-audit@10x` | [dépôt](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-512.png" width="28" alt=""> | **goalify** | Prépare une tâche énorme à exécuter en autonomie | `claude plugin install goalify@10x` | [dépôt](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **humanizer** | Identifie 55 habitudes d'écriture IA et les réécrit | `claude plugin install humanizer@10x` | [dépôt](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-512.png" width="28" alt=""> | **loopify** | Prépare une tâche répétitive pour la commande `/loop` de Claude Code | `claude plugin install loopify@10x` | [dépôt](https://github.com/Aboudjem/loopify) |

<a id="what-each-one-does"></a>

## Ce que fait chaque plugin

### sniff

Pointez-le vers votre application en cours d'exécution : il clique à travers vos parcours réels dans un vrai navigateur, puis vous dit ce qui s'est cassé et les étapes, dans l'ordre, qui ont mené à la casse.

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

### ui-ux-suite

Il lit votre CSS, votre JSX, votre HTML et vos classes Tailwind, puis indique le fichier, la ligne, la valeur mesurée erronée et le correctif exact. Il audite, il ne modifie jamais.

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

### recap-studio

Il transforme un sujet ou une session de code en un seul fichier HTML sur lequel il suffit de double-cliquer, avec tous les styles intégrés et aucune requête externe, lisible hors ligne en environ cinq minutes.

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

### aws-cost-audit

Il lit votre compte AWS en direct via la CLI AWS que vous avez déjà installée et vous remet un plan d'économies où chaque prix est vérifié en direct, jamais cité de mémoire.

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

### goalify

Pour une tâche trop grande pour rester à la regarder tourner, il rédige le brief (un fichier qui contient ce que l'exécution doit faire) et la condition (une ligne que vous collez dans `/goal`), afin qu'une session neuve fasse le travail et se termine en citant les vérifications réussies.

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

### humanizer

Il identifie 55 habitudes qui font qu'un texte se lit comme écrit par une machine, évalue combien votre texte en porte sur une échelle de 0 à 100, et le réécrit dans la voix que vous choisissez.

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

### loopify

Pour une tâche qui se répète plutôt qu'elle ne se termine, il rédige le brief et la ligne que vous collez dans `/loop`, la commande de répétition intégrée à Claude Code, avec un plafond de ticks et une règle d'arrêt. Chaque tick journalise ce qu'il a fait.

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

<a id="works-with-any-ai-editor"></a>

## Fonctionne avec n'importe quel éditeur IA

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

Chaque plugin ici est livré sous forme de skills, des fichiers Markdown que votre agent lit. C'est pourquoi les sept
s'installent en dehors de Claude Code via `npx skills add`, dont le README indique lui-même 77 agents pris en charge.
Trois sont aussi des outils en ligne de commande. sniff et ui-ux-suite tournent chacun comme un serveur MCP autonome,
directement depuis npm, le protocole que parle un éditeur pour atteindre un outil extérieur. recap-studio en propose
un aussi, exécuté depuis un clone après une compilation du workspace. Les quatre autres sont uniquement des skills.

| Agent | Installation en une ligne |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, et [70+ de plus](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| N'importe quel client MCP (sniff, ui-ux-suite) | `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp` |
| Tout le reste | voir `docs/editors.md` dans le dépôt du plugin |

<a id="the-10x-bar"></a>

## La barre 10x

| | |
|---|---|
| **Minimal par défaut** | Aucune dépendance dont un plugin n'a pas besoin. sniff pilote un vrai navigateur, il embarque donc Playwright et Lighthouse ; les autres n'en embarquent aucune. |
| **Installation en une commande** | Aucun fichier de configuration, aucune inscription, aucune clé API pour démarrer. |
| **De vrais tests** | Une CI qui vérifie le comportement, pas qu'un fichier existe. |
| **Fonctionne en dehors de Claude Code** | S'installe dans [70+ agents](https://github.com/vercel-labs/skills#supported-agents) via `npx skills add`. |
| **Maintenu activement** | Une publication ce trimestre, pas une archive de l'an dernier. |
| **Aucune télémétrie** | Aucune analytics et aucun appel silencieux vers un serveur distant. Chaque outil ne parle qu'à ce vers quoi vous le pointez. |

Chaque plugin listé ici respecte cette barre. Si l'un d'eux cesse de la respecter, il est retiré. La liste complète,
avec le registre et la date de dernière vérification, se trouve dans [QUALITY-BAR.md](../QUALITY-BAR.md).

## Contribuer

Vous avez un plugin qui a sa place ici ? [CONTRIBUTING.md](../CONTRIBUTING.md) détaille les étapes de proposition.
Un workflow synchronise chaque épinglage de version depuis le dépôt propre du plugin ; [docs/SYNC.md](../docs/SYNC.md) explique la chaîne.

<p align="center">
  <sub>Créé par <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licence MIT · Aucune télémétrie, aucune collecte de données</sub>
</p>

Traduction assistée par une machine ; le README anglais fait foi en cas de divergence.
