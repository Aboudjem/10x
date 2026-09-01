<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg">
  <img alt="10x" src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/Aboudjem/10x/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="Licence"></a>
  <a href="#plugins"><img src="https://img.shields.io/badge/plugins-7-f59e0b?style=flat-square" alt="7 plugins"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=f59e0b" alt="Étoiles"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/zh-CN.md">简体中文</a> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/ja.md">日本語</a> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/es.md">Español</a> ·
  <b>Français</b>
</p>

<p align="center"><b>Une place de marché réunissant une sélection rigoureuse d'outils de développement pour Claude Code.</b><br/>Aucun superflu. Testé. Fonctionne dans n'importe quel éditeur IA.</p>

![Démo de la place de marché 10x](https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/demo.gif)

---

## Comment ça marche

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/hero-diagram.svg" alt="Votre éditeur communique avec la place de marché 10x, qui propose sept plugins sélectionnés : sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify, humanizer et loopify" width="100%">
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> Une seule commande d'installation. Chaque plugin configure automatiquement ses outils MCP, ses commandes précédées d'une barre oblique et ses agents.

Les versions indiquées ici suivent les versions publiées par chaque plugin ; voir [docs/SYNC.md](https://github.com/Aboudjem/10x/blob/main/docs/SYNC.md).

---

## Plugins

Sept plugins aujourd'hui. Chacun d'eux respecte le [standard de qualité](#la-barre-10x) ci-dessous.

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;Trouvez les bogues avant vos utilisateurs

> Pointez-le vers votre application en cours d'exécution. Il parcourt vos parcours réels d'utilisateurs dans un vrai navigateur et vous dit ce qui ne fonctionne vraiment pas, preuves à l'appui.

Il ouvre votre application dans un vrai navigateur et clique dessus comme le ferait une personne. Vous récupérez une liste hiérarchisée de ce qui ne fonctionne pas, et chaque problème est accompagné des étapes permettant de le reproduire. Il a besoin que votre application tourne : si aucun serveur n'est lancé, sniff analyse alors le code source à la place.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="sniff parcourt votre application en cours d'exécution, découvre ses parcours et renvoie des résultats hiérarchisés sur les bogues, l'accessibilité et la performance" width="100%"></p>

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

441 tests. 12 classes de bogues.

<p><a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/sniff-qa">npm →</a></p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;Votre qualité de design, mesurée

> **ESLint pour le design.** Il trouve la ligne exacte, la valeur incorrecte mesurée, et le correctif exact.

Il lit votre CSS, votre JSX et votre configuration Tailwind, puis note douze aspects de votre design, parmi lesquels la couleur, la typographie, l'espacement et l'accessibilité. Chaque résultat indique le fichier, la ligne, la valeur incorrecte et le correctif. Il fait un rapport et ne modifie jamais rien : appliquer un correctif reste votre décision.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite analyse votre projet, note 12 dimensions de design et renvoie un audit citant la loi UX que chaque résultat enfreint" width="100%"></p>

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

311 tests. 12 dimensions pondérées.

<p><a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a></p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;Des explicatifs d'une page en moins de 5 minutes

> Transformez n'importe quel sujet ou session de code en un magnifique explicatif en mode sombre, conçu d'abord pour les appareils mobiles, que vous ouvrez d'un double-clic. Pas de serveur, pas d'internet, pas de dépendances.

Donnez-lui un sujet, ou pointez-le vers une session de code, et vous obtenez une page HTML que vous ouvrez d'un double-clic. Elle fonctionne hors ligne, et chaque affirmation est accompagnée d'une source. Un outil de vérification rapide note la page avant que vous ne la publiez, et ce score est un signal structurel, pas une relecture par des pairs.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="recap-studio prend un sujet ou des modifications Git, exécute des contrôles déterministes de clarté et d'accessibilité, et produit un explicatif d'une page autonome" width="100%"></p>

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

43 tests répartis sur 5 paquets contenant des tests.

<p><a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp; <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">Architecture →</a></p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;Auditez votre facture AWS, en toute sécurité

> Demandez à Claude d'auditer votre facture AWS. Obtenez un plan d'économies clair où chaque chiffre est vérifié à partir des tarifs AWS en vigueur, et où rien n'est supprimé sans votre accord.

Il lit votre compte, calcule ce que coûte réellement chaque ressource, et trouve celles qui sont inactives ou surdimensionnées. Chaque économie proposée est assortie d'un niveau de confiance, de preuves qui la justifient et d'un moyen de l'annuler. Il est en lecture seule par défaut, donc rien ne change tant qu'une simulation n'est pas validée et que vous n'avez pas dit oui.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit analyse votre compte AWS réel et ventile chaque dollar, vérifie les prix en direct, puis renvoie un plan d'économies étayé et soumis à validation" width="100%"></p>

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<p><a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;Revenez avec la preuve que c'est fait

> Confiez à Claude une tâche énorme. Revenez avec la preuve que c'est fait — pas une promesse que ça l'est.

Pour les tâches trop vastes pour que vous les suiviez du début à la fin, goalify écrit le brief (un fichier qui contient ce que la session doit faire) et la condition (une ligne que vous collez dans `/goal`). Vous videz la conversation, vous collez cette ligne, et une nouvelle session fait tout le travail, puis se termine en citant les contrôles réussis. Une session qui s'arrête n'est pas la preuve qu'elle a fini : lisez cette preuve finale avant de lui faire confiance.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify examine votre dépôt, verrouille les quelques vraies décisions, et écrit le brief et la condition qu'une nouvelle session exécute, vérifie, et archive dans .goal/done/ une fois chaque contrôle passé" width="100%"></p>

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify <your task>                # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/goalify">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/06-humanizer-d946ef?style=flat-square" alt="humanizer">&nbsp;&nbsp;Donnez aux textes produits par une IA un style aussi naturel que s'ils avaient été écrits par une personne

> Humanizer est un outil libre et gratuit qui détecte les textes produits par une IA et les rend plus naturels.

Collez du texte et il évalue à quel point il semble avoir été écrit par une machine, ou le réécrit selon le ton que vous choisissez. La réécriture varie la longueur des phrases comme le font les humains. C'est un seul fichier Markdown, rien ne quitte votre machine, et le but est d'améliorer l'écriture plutôt que de tromper les détecteurs.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/humanizer-diagram.svg" alt="humanizer analyse le texte à la recherche de motifs d'écriture IA, note à quel point il semble avoir été écrit par une IA sur une échelle de 0 à 100, puis le réécrit avec une variation de longueur de phrase selon le ton que vous choisissez" width="100%"></p>

```bash
claude plugin install humanizer@10x   # as a plugin (primary)
/humanizer "<your text>"              # then, in any Claude Code session
```

55 motifs, 5 voix, un score de 0-100 signalant les marqueurs d'écriture IA.

<p><a href="https://github.com/Aboudjem/humanizer-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/07-loopify-14b8a6?style=flat-square" alt="loopify">&nbsp;&nbsp;Confiez une tâche qui se répète

> Confiez à Claude une tâche qui se répète. À votre retour, consultez le journal de ce qu'a fait chaque itération — pas une boucle qu'il faut surveiller sans arrêt.

Certaines tâches ne se terminent jamais vraiment : surveiller un déploiement jusqu'à ce qu'il se stabilise, passer en revue les nouveaux signalements de bogues toutes les heures. loopify écrit le brief (un fichier permanent que la boucle relit à chaque exécution) et la ligne (une chaîne que vous collez dans `/loop`), avec un plafond d'itérations et une règle d'arrêt portés dans la ligne elle-même. À chaque itération, Claude consigne ses actions dans `TICKS.md`, et vous devriez lire ce journal : une boucle qui n'a rien trouvé à faire ressemble, de l'extérieur, à une boucle qui a résolu des problèmes tout l'après-midi.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/loopify-diagram.svg" alt="loopify définit le périmètre d'un cycle de la tâche qui se répète, écrit le brief et la ligne que vous collez dans /loop, puis à chaque itération relit le brief, exécute un cycle et note ce qu'il a fait dans TICKS.md" width="100%"></p>

```bash
claude plugin install loopify@10x   # as a plugin (primary)
/loopify <your job>                 # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/loopify">GitHub →</a></p>

---

## Fonctionne avec n'importe quel éditeur IA

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="Fonctionne avec Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue et tout éditeur compatible MCP" width="100%">
</p>

sniff, ui-ux-suite et recap-studio fonctionnent de deux façons : installez-les comme plugin Claude Code, ou exécutez-les comme simple serveur MCP dans l'éditeur de votre choix. aws-cost-audit, goalify, humanizer et loopify sont des modules de compétence Claude Code plutôt que des serveurs MCP : ils s'exécutent donc dans Claude Code.

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

Chaque plugin outil fournit aussi un `install.sh` en une ligne qui l'installe dans le répertoire de compétences d'une autre interface en ligne de commande (`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`), ainsi que des manifestes `.cursor-plugin` et `.copilot-plugin`. Le README de chaque projet contient des extraits prêts à coller pour Cursor, VS Code + Copilot, Codex, Gemini, Windsurf et Continue.dev.

---

## La barre 10x

Chaque plugin présent ici respecte ce standard. S'il cesse de le respecter, il est retiré.

| | |
|---|---|
| **Aucun superflu** | Node.js standard, aucune dépendance d'exécution |
| **Installation en une commande** | Aucun fichier de configuration, aucune clé d'API |
| **De vrais tests** | Pas des intentions, pas du « bientôt disponible » |
| **Mode double** | Fonctionne comme plugin Claude Code ET comme serveur MCP |
| **Activement maintenu** | Livré ce trimestre, pas abandonné l'an dernier |
| **Aucune télémétrie** | S'exécute localement, votre code ne quitte jamais votre machine |

La liste complète se trouve dans [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md). Les mainteneurs revérifient chaque plugin selon cette liste lors d'une revue trimestrielle.

> [!NOTE]
> Liste actuelle : **sniff 0.7.0** (441 tests), **ui-ux-suite 0.5.0** (311 tests), **recap-studio 0.4.0** (43 tests répartis sur 5 paquets porteurs de tests), **aws-cost-audit 0.2.0** (en lecture seule par défaut), **goalify 2.5.0**, **humanizer 0.6.2** (55 motifs), **loopify 1.0.0**. Dernière vérification le 2026-09-01.

---

## Contribuer

Vous avez un plugin qui a sa place ici ? Voir [CONTRIBUTING.md](https://github.com/Aboudjem/10x/blob/main/CONTRIBUTING.md).

---

## Historique des étoiles

<a href="https://star-history.com/#Aboudjem/10x&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" />
    <img alt="Graphique de l'historique des étoiles pour Aboudjem/10x" src="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" width="70%" />
  </picture>
</a>

---

<p align="center">
  Si 10x vous a aidé à livrer un meilleur code, pensez à lui donner une étoile.<br/>
  Cela aide d'autres développeurs à trouver ces outils.
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/adam-boudjemaa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/AdamBoudj"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://adam-boudjemaa.com/"><img src="https://img.shields.io/badge/Website-f59e0b?style=flat-square&logo=googlechrome&logoColor=white" alt="Site web"></a>
</p>

<p align="center">
  <sub>Créé par <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licence MIT · Aucune télémétrie · Aucune collecte de données</sub>
</p>

