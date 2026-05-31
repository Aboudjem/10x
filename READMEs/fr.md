<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg">
  <img alt="10x" src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/Aboudjem/10x/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="Licence"></a>
  <a href="#plugins"><img src="https://img.shields.io/badge/plugins-5-f59e0b?style=flat-square" alt="5 plugins"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=f59e0b" alt="Étoiles"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="zh-CN.md">简体中文</a> ·
  <a href="ja.md">日本語</a> ·
  <a href="es.md">Español</a> ·
  <b>Français</b>
</p>

<p align="center"><b>Un marketplace soigneusement sélectionné d'outils de développement pour Claude Code.</b><br/>Aucun superflu. Testé. Fonctionne dans n'importe quel éditeur IA.</p>

![Démo du marketplace 10x](https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/demo.gif)

---

## Comment ça marche

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/hero-diagram.svg" alt="Votre éditeur dialogue avec le marketplace 10x, qui livre cinq plugins sélectionnés : sniff, ui-ux-suite, recap-studio, aws-cost-audit et goalify" width="100%">
</p>

<p align="center"><i>Une seule commande d'installation. Chaque plugin branche automatiquement ses outils MCP, ses commandes slash et ses agents.</i></p>

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> Une seule commande d'installation. Chaque plugin branche automatiquement ses outils MCP, ses commandes slash et ses agents.

---

## Plugins

Cinq plugins aujourd'hui. Chacun d'eux passe la [barre de qualité](#la-barre-10x) ci-dessous.

> [!TIP]
> Vous voulez les voir tourner ? Chaque dépôt d'outil a sa propre démo : [sniff](https://github.com/Aboudjem/sniff#readme), [ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite#readme), [recap-studio](https://github.com/Aboudjem/recap-studio#readme), [aws-cost-audit](https://github.com/Aboudjem/aws-cost-audit-skill#readme) et [goalify](https://github.com/Aboudjem/goalify#readme).

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;Trouvez les bugs avant vos utilisateurs

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="Sniff parcourt votre application en cours d'exécution, découvre ses parcours et renvoie des résultats hiérarchisés sur les bugs, l'accessibilité et la performance" width="100%">
</p>

Un outil de QA assisté par IA qui parcourt votre application en cours d'exécution comme un utilisateur, découvre ses parcours et trouve de vrais bugs en matière d'accessibilité, de performance et d'interactions cassées. Détecte automatiquement votre serveur de développement. Une analyse du code source est aussi disponible via `sniff scan`. Aucune clé d'API, aucune configuration.

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Commandes slash**
- `/sniff` - parcourir votre application en cours d'exécution
- `/sniff-fix` - appliquer des correctifs sûrs
- `/sniff-report` - ouvrir la dernière analyse

</td>
<td width="50%" valign="top">

**Outils MCP**
- `sniff` - parcourir votre application en cours d'exécution (unifié)
- `sniff_scan` - analyse du code source uniquement
- `sniff_report` - résultats formatés

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/sniff-qa">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;Votre qualité de design, mesurée

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite analyse votre projet, note 12 dimensions de design et renvoie un audit citant la loi UX que chaque résultat enfreint" width="100%">
</p>

Analyse votre CSS, votre JSX et votre configuration Tailwind. Note 12 dimensions de design : accessibilité, système de couleurs, typographie, mise en page et espacement, qualité des composants, hiérarchie visuelle, qualité des interactions, réactivité, finition visuelle, performance perçue, architecture de l'information et adéquation à la plateforme. Cite la loi UX que chaque résultat enfreint, puis vous montre le correctif exact. Il audite, il ne modifie jamais. Aucune dépendance, 100 % local.

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Commandes slash**
- `/design-audit` - audit complet des 12 dimensions
- `/color-audit` - contraste + palette
- `/type-audit` - typographie uniquement
- `/layout-audit` - espacement + grille
- `/a11y-audit` - WCAG 2.2 + APCA
- `+ 9 autres audits spécialisés`

</td>
<td width="50%" valign="top">

**Outils MCP**
- `uiux_scan_project` - détecter la stack
- `uiux_extract_colors` - palette
- `uiux_check_contrast` - WCAG/APCA
- `uiux_generate_tokens` - design system
- `+ 10 autres outils de notation et de génération`

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;Des explicatifs d'une page en moins de 5 minutes

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="Recap Studio prend un sujet ou un diff git, exécute des contrôles heuristiques déterministes de clarté et d'accessibilité, et produit un explicatif d'une page autonome" width="100%">
</p>

Transformez n'importe quel sujet ou session de code en un explicatif d'une page propre, pensé pour le mobile, qu'un jeune de 18 ans avisé peut lire en 5 minutes. Le résultat est une page HTML autonome, utilisable hors ligne. Des contrôles heuristiques déterministes valident la clarté, l'accessibilité et la structure avant publication, et chaque affirmation est sourcée.

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Commandes slash**
- `/recap "<topic>"` - page explicative complète
- `/recap session` - récap d'une session de code
- `/recap setup` - écrire une config aux valeurs sûres
- `/recap validate` - re-noter la page active

</td>
<td width="50%" valign="top">

**Ce que vous obtenez**
- Une page HTML autonome, hors ligne
- Chaque affirmation sourcée
- Des contrôles heuristiques déterministes (clarté, a11y, structure)
- Un chemin de déploiement optionnel (désactivé par défaut)

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">Architecture →</a>
</p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;Auditez votre facture AWS, en toute sécurité

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit lit votre compte AWS en direct, attribue chaque dollar et vérifie les prix en direct, puis renvoie un plan d'économies étayé et soumis à validation" width="100%">
</p>

Lit votre compte AWS en direct (en lecture seule par défaut), attribue chaque dollar et trouve les ressources inactives, orphelines et surdimensionnées. Vérifie chaque prix en direct via l'API AWS Price List (il n'en code aucun en dur) et donne à chaque résultat un niveau de confiance, les preuves qui le justifient et un retour en arrière. Rien n'est supprimé sans preuve ni votre accord.

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Ce qu'il fait**
- Recalcule la dépense en direct (Cost Explorer)
- Inventorie chaque région, traque le gaspillage
- Confiance + preuves + retour en arrière par résultat

</td>
<td width="50%" valign="top">

**Sûr par défaut**
- Lecture seule ; actions destructrices soumises à validation
- Vérifie les prix en direct, jamais codés en dur
- « Économiser maintenant en toute sécurité » contre « économie théorique maximale »

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;Préparez une grosse tâche pour qu'elle s'exécute toute seule

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify cadre une grosse tâche de code, verrouille les quelques vraies décisions et écrit un fichier /goal autonome et auto-supprimable qu'une session neuve exécute de bout en bout en vérifiant chaque critère de réussite" width="100%">
</p>

Cadre une grosse tâche de code, verrouille les quelques vraies décisions et écrit un fichier `/goal` autonome et auto-supprimable. Vous lancez ensuite ce fichier dans une session neuve à pleine contexte, qui exécute tout le travail et vérifie chaque critère de réussite avant de supprimer le fichier.

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify "<votre tâche>"            # in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**Ce qu'il fait**
- Cadre la tâche et verrouille les quelques vraies décisions
- Écrit un fichier `/goal` autonome et auto-supprimable
- Vérifie chaque critère de réussite avant de supprimer le fichier

</td>
<td width="50%" valign="top">

**Comment l'utiliser**
- `/goalify <votre tâche>` dans n'importe quelle session Claude Code
- La session courante rédige le fichier de transfert
- Une session neuve à pleine contexte exécute le travail

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/goalify">GitHub →</a>
</p>

---

## Fonctionne avec n'importe quel éditeur IA

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="Fonctionne avec Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue et tout éditeur compatible MCP" width="100%">
</p>

Chaque plugin **outil** 10x est **bimodal** : installez-le comme plugin Claude Code, ou exécutez-le comme un simple serveur MCP dans l'éditeur de votre choix. (`aws-cost-audit` et `goalify` sont des skills Claude Code plutôt que des serveurs MCP : ils s'exécutent dans Claude Code.)

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

Chaque plugin outil livre aussi un `install.sh` en une ligne qui le branche dans le répertoire de skills d'un autre CLI en une seule commande (`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`), ainsi que des manifestes `.cursor-plugin` et `.copilot-plugin`. Le README de chaque projet contient des extraits prêts à coller pour Cursor, VS Code + Copilot, Codex, Gemini, Windsurf et Continue.dev.

---

## La barre 10x

Chaque plugin ici passe cette barre. S'il cesse de la passer, il est retiré.

| | |
|---|---|
| **Aucun superflu** | Node.js standard, aucune dépendance d'exécution |
| **Installation en une commande** | Aucun fichier de configuration, aucune clé d'API |
| **De vrais tests** | Pas des intentions, pas du « bientôt disponible » |
| **Mode double** | Fonctionne comme plugin Claude Code ET comme serveur MCP |
| **Activement maintenu** | Livré ce trimestre, pas abandonné l'an dernier |
| **Aucune télémétrie** | S'exécute localement, votre code ne quitte jamais votre machine |

La liste complète en huit points (32 éléments) se trouve dans [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md). Les mainteneurs revérifient chaque plugin par rapport à elle lors d'une revue trimestrielle.

> [!NOTE]
> Liste actuelle : **sniff 0.7.0** (441 tests), **ui-ux-suite 0.5.0** (311 tests), **recap-studio 0.4.0** (43 tests répartis sur 5 paquets porteurs de tests), **aws-cost-audit 0.2.0** (conçu en mode test-first, vérifié de bout en bout sur un compte réel, aucun prix codé en dur), **goalify 1.0.0** (skill Claude Code qui écrit un fichier `/goal` autonome et auto-supprimable). Dernière vérification le 2026-05-30.

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

---

*Cette traduction a été réalisée avec l'assistance d'un outil automatique. Les locuteurs natifs sont invités à ouvrir une PR pour corriger toute formulation maladroite ou imprécision. Le README anglais ([../README.md](../README.md)) fait foi en cas de divergence.*
