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
  <b>Español</b> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>Un marketplace de plugins es una lista desde la que tu editor puede instalar. Esta contiene siete herramientas de desarrollo para Claude Code, y la agregas una sola vez.</b></p>

<p align="center">
  <a href="#install">Instalación</a> ·
  <a href="#the-plugins">Los plugins</a> ·
  <a href="#what-each-one-does">Qué hace cada uno</a> ·
  <a href="#works-with-any-ai-editor">Funciona con cualquier editor de IA</a> ·
  <a href="#the-10x-bar">El estándar 10x</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

<a id="install"></a>
## Instalación

Agrega el marketplace una sola vez. Claude Code puede entonces instalar cualquiera de los siete por su nombre.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

Cambia `sniff` por cualquier nombre de la tabla de abajo. Fuera de Claude Code, las mismas skills se instalan mediante
el [Vercel skills CLI](https://github.com/vercel-labs/skills), que las instala en el directorio
que tu agente lee:

```bash
npx skills add Aboudjem/sniff
```

<a id="the-plugins"></a>
## Los plugins

| | Plugin | Para qué sirve | Instalación | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **sniff** | Recorre tu app en ejecución y encuentra errores reales | `claude plugin install sniff@10x` | [repo](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **ui-ux-suite** | ESLint para el diseño: la línea, el valor, la corrección | `claude plugin install ui-ux-suite@10x` | [repo](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **recap-studio** | Un HTML explicativo offline a partir de un tema o una sesión | `claude plugin install recap-studio@10x` | [repo](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-512.png" width="28" alt=""> | **aws-cost-audit** | Audita tu factura de AWS contra los precios en vivo de AWS | `claude plugin install aws-cost-audit@10x` | [repo](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-512.png" width="28" alt=""> | **goalify** | Prepara una tarea enorme para que se ejecute por su cuenta | `claude plugin install goalify@10x` | [repo](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **humanizer** | Nombra 55 hábitos de escritura de IA y los reescribe | `claude plugin install humanizer@10x` | [repo](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-512.png" width="28" alt=""> | **loopify** | Prepara un trabajo repetitivo para el `/loop` de Claude Code | `claude plugin install loopify@10x` | [repo](https://github.com/Aboudjem/loopify) |

<a id="what-each-one-does"></a>
## Qué hace cada uno

### sniff

Apúntalo a tu app en ejecución y recorre tus flujos reales en un navegador real, y luego te dice qué se rompió y los pasos ordenados que lo rompieron.

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

### ui-ux-suite

Lee tu CSS, JSX, HTML y clases de Tailwind, y nombra el archivo, la línea, el valor incorrecto medido y la corrección exacta. Audita, nunca edita.

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

### recap-studio

Convierte un tema o una sesión de programación en un único archivo HTML que puedes abrir con doble clic, con cada estilo insertado y sin ninguna solicitud externa, legible sin conexión en unos cinco minutos.

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Arquitectura](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

### aws-cost-audit

Lee tu cuenta de AWS en vivo mediante el AWS CLI que ya tienes instalado y te entrega un plan de ahorro donde cada precio se verifica en vivo, nunca se cita de memoria.

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

### goalify

Para un trabajo demasiado grande como para quedarse mirándolo, escribe el brief (un archivo con lo que la ejecución tiene que hacer) y la condición (una línea que pegas en `/goal`), de modo que una sesión nueva hace el trabajo y cierra citando las comprobaciones que superó.

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

### humanizer

Nombra 55 hábitos que hacen que un texto se lea como escrito por una máquina, puntúa cuántos de ellos carga tu texto en una escala de 0 a 100, y lo reescribe con la voz que elijas.

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

### loopify

Para un trabajo que se repite en lugar de terminar, escribe el brief y la línea que pegas en `/loop`, el comando de repetición integrado de Claude Code, con un tope de ciclos y una regla de parada. Cada ciclo registra lo que hizo.

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

<a id="works-with-any-ai-editor"></a>
## Funciona con cualquier editor de IA

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

Cada plugin de aquí se distribuye como skills, que son archivos Markdown que tu agente lee. Por eso los siete
se instalan fuera de Claude Code mediante `npx skills add`, cuyo propio README lista 77 agentes compatibles.
Tres son también herramientas de línea de comandos. sniff y ui-ux-suite se ejecutan cada uno como un servidor
MCP independiente directamente desde npm, el protocolo que un editor habla para llegar a una herramienta
externa. recap-studio también incluye uno, que se ejecuta desde un clon tras compilar el proyecto. Los otros
cuatro son solo skills.

| Agente | Instalación en una línea |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, y [70+ más](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| Cualquier cliente MCP (sniff, ui-ux-suite) | `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp` |
| Todo lo demás | consulta `docs/editors.md` en el repo del propio plugin |

<a id="the-10x-bar"></a>
## El estándar 10x

| | |
|---|---|
| **Sin relleno por defecto** | Ninguna dependencia que un plugin no necesite. sniff maneja un navegador real, así que incluye Playwright y Lighthouse; el resto no lleva ninguna. |
| **Instalación en un comando** | Sin archivo de configuración, sin registro, sin clave de API para empezar. |
| **Pruebas reales** | CI que verifica el comportamiento, no que un archivo exista. |
| **Se ejecuta fuera de Claude Code** | Se instala en [70+ agentes](https://github.com/vercel-labs/skills#supported-agents) mediante `npx skills add`. |
| **Mantenido activamente** | Una versión publicada este trimestre, no un archivo abandonado del año pasado. |
| **Sin telemetría** | Sin analítica y sin conexión a casa. Cada herramienta habla solo con aquello a lo que la apuntas. |

Cada plugin listado aquí cumple este estándar. Si uno deja de cumplirlo, se elimina. La lista completa,
con el catálogo y la última fecha de verificación, está en [QUALITY-BAR.md](../QUALITY-BAR.md).

## Contribuir

¿Tienes un plugin que encaja aquí? [CONTRIBUTING.md](../CONTRIBUTING.md) tiene los pasos para proponerlo.
Un workflow sincroniza cada versión fijada desde el propio repo del plugin; [docs/SYNC.md](../docs/SYNC.md) explica esa cadena.

<p align="center">
  <sub>Creado por <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licencia MIT · Sin telemetría, sin recolección de datos</sub>
</p>

Esta traducción se generó con asistencia automática; el README en inglés (`../README.md`) es la fuente autorizada.
