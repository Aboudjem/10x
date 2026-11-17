<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../.github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="../.github/assets/hero-banner-light.svg">
  <img alt="10x: nueve herramientas de agente, con prueba para cada una. Tres chips: instala por nombre, prueba para cada herramienta, límites claros. Los dos comandos de instalación y una cuadrícula de 3 por 3 con los logos de las nueve herramientas, cada uno con su primer beneficio." src="../.github/assets/hero-banner-light.svg" width="100%">
</picture>

<p align="center">
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-00D4FF?style=flat-square" alt="License MIT"></a>
  <a href="https://github.com/Aboudjem/10x/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/Aboudjem/10x/validate.yml?branch=main&style=flat-square&color=7C3AED&label=validate" alt="validate workflow status"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="zh-CN.md">简体中文</a> ·
  <a href="ja.md">日本語</a> ·
  <b>Español</b> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>Nueve herramientas de agente, cada una con prueba, desde una sola lista.</b></p>

<p align="center">
  <a href="#los-plugins">Los plugins</a> ·
  <a href="#instalación">Instalación</a> ·
  <a href="#cómo-funciona">Cómo funciona</a> ·
  <a href="#pruebas">Pruebas</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#límites">Límites</a>
</p>

Agrega la lista una vez y luego instala cualquier herramienta por su nombre.

| Instala por nombre | Prueba para cada herramienta | Límites claros |
|:--|:--|:--|
| `npm run validate` imprime `Marketplace has 9 valid plugin(s)`. | El README de cada plugin tiene una sección Proof con comandos que puedes volver a ejecutar. | El README de cada plugin tiene una sección Limits que dice lo que no puede hacer. |

**Funciona con:** Claude Code, y con más de 70 agentes más mediante `npx skills`.
Tres herramientas también se ejecutan como servidores MCP. MCP es la forma estándar en que un agente llama a una herramienta.
Ninguna herramienta depende de un solo modelo: las skills son archivos Markdown simples.

```bash
# Any agent: install one tool for all your projects
npx skills add Aboudjem/humanizer-skill -g
# Claude Code: add the list once, then install by name
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

Lo que imprimen los dos comandos de Claude Code (ejecución real, 2026-11-17):

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

- **Qué es:** una lista de nueve herramientas para agentes de código.
- **Cuándo usarlo:** tienes un solo trabajo, como encontrar bugs o reducir costos de AWS.
- **Qué obtienes:** un comando de instalación por herramienta, y un README con su prueba y sus límites.

10x solo lista plugins. Cada uno se ejecuta con tus permisos, así que lee primero su repo.

## Los plugins

| | Plugin | Una línea | Chips |
|:-:|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**sniff**](https://github.com/Aboudjem/sniff) | Atrapa las páginas rotas de tu app web antes que tus usuarios. | Bugs atrapados antes que los usuarios · Pasos para repetirlo · Merges rotos bloqueados |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**ui-ux-suite**](https://github.com/Aboudjem/ui-ux-suite) | Bugs de diseño por número de línea, cada uno con el arreglo exacto. | Línea exacta a arreglar · Regla WCAG citada · Valor de arreglo dado |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**recap-studio**](https://github.com/Aboudjem/recap-studio) | Entiende qué cambió, en una página que puedes enviar. | Entiende lo que se hizo · Una página para enviar · Revisada antes de enviar |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**aws-cost-audit**](https://github.com/Aboudjem/aws-cost-audit-skill) | Encuentra qué dejar de pagar en tu factura de AWS. | Factura de AWS más baja · Precios comprobados con AWS · Rollback antes de cualquier cambio |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**goalify**](https://github.com/Aboudjem/goalify) | Dale a tu agente un trabajo grande y recibe una prueba. | Preguntas hechas una vez · Plan guardado en archivo · Prueba de que está hecho |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**humanizer**](https://github.com/Aboudjem/humanizer-skill) | Mira por qué tu borrador suena a IA y arréglalo. | Sabes qué palabras · Se lee más humano · Hechos conservados |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**loopify**](https://github.com/Aboudjem/loopify) | Revisa una tarea repetida del agente en una línea. | Sin vigilar · Menos ticks atascados · Se detiene solo |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**secure-my-app**](https://github.com/Aboudjem/secure-my-app) | Encuentra lo que un extraño puede llevarse de tu app. | Arreglos probados cerrados · Prueba de cada hueco · Sin cambios sorpresa |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**contextify**](https://github.com/Aboudjem/contextify) | Un AGENTS.md para tus agentes, revisado con cero tokens. | Tiempo ahorrado · Contexto conservado · Tokens ahorrados |

Cada línea y cada chip sale del README de la propia herramienta. [Qué hace cada uno](#qué-hace-cada-uno) da la prueba.

## Instalación

**Recomendado: el Vercel skills CLI.** `npx skills` es el instalador abierto de Vercel para skills de agentes.
Un comando instala una herramienta para todos tus proyectos:

```bash
npx skills add Aboudjem/sniff -g
```

Funciona en más de 70 agentes: elige el tuyo en el menú ([agentes compatibles](https://github.com/vercel-labs/skills#supported-agents)).
En una terminal muestra el menú de agentes. En un script instala en la carpeta de cada agente, así que añade `-a <agent>` ahí.
Solo este proyecto: quita `-g`.

Usa el nombre del repo de la herramienta, no `Aboudjem/10x`. Este repo es la lista y no contiene skills propias.

| Herramienta | Comando | Página |
|:--|:--|:--|
| sniff | `npx skills add Aboudjem/sniff -g` | [skills.sh](https://skills.sh/aboudjem/sniff) |
| ui-ux-suite | `npx skills add Aboudjem/ui-ux-suite -g` | [skills.sh](https://skills.sh/aboudjem/ui-ux-suite) |
| recap-studio | `npx skills add Aboudjem/recap-studio -g` | [skills.sh](https://skills.sh/aboudjem/recap-studio) |
| aws-cost-audit | `npx skills add Aboudjem/aws-cost-audit-skill -g` | [skills.sh](https://skills.sh/aboudjem/aws-cost-audit-skill) |
| goalify | `npx skills add Aboudjem/goalify -g` | [skills.sh](https://skills.sh/aboudjem/goalify) |
| humanizer | `npx skills add Aboudjem/humanizer-skill -g` | [skills.sh](https://skills.sh/aboudjem/humanizer-skill) |
| loopify | `npx skills add Aboudjem/loopify -g` | [skills.sh](https://skills.sh/aboudjem/loopify) |
| secure-my-app | `npx skills add Aboudjem/secure-my-app -g` | [skills.sh](https://skills.sh/aboudjem/secure-my-app) |
| contextify | `npx skills add Aboudjem/contextify -g` | [skills.sh](https://skills.sh/aboudjem/contextify) |

Solo instala las skills. Los tres servidores MCP son un paso aparte de una línea: mira [MCP servers](#mcp-servers).

**O instala directo en un agente.** Cada comando instala para todos tus proyectos.

<a href="#claude-code"><img alt="Claude Code" height="24" src="https://img.shields.io/badge/Claude_Code-D97757?style=flat-square&logo=claude&logoColor=white"></a> <a href="#codex"><img alt="Codex" height="24" src="https://img.shields.io/badge/Codex-000000?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyBmaWxsPSJ3aGl0ZSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHRpdGxlPk9wZW5BSTwvdGl0bGU%2BPHBhdGggZD0iTTIyLjI4MTkgOS44MjExYTUuOTg0NyA1Ljk4NDcgMCAwIDAtLjUxNTctNC45MTA4IDYuMDQ2MiA2LjA0NjIgMCAwIDAtNi41MDk4LTIuOUE2LjA2NTEgNi4wNjUxIDAgMCAwIDQuOTgwNyA0LjE4MThhNS45ODQ3IDUuOTg0NyAwIDAgMC0zLjk5NzcgMi45IDYuMDQ2MiA2LjA0NjIgMCAwIDAgLjc0MjcgNy4wOTY2IDUuOTggNS45OCAwIDAgMCAuNTExIDQuOTEwNyA2LjA1MSA2LjA1MSAwIDAgMCA2LjUxNDYgMi45MDAxQTUuOTg0NyA1Ljk4NDcgMCAwIDAgMTMuMjU5OSAyNGE2LjA1NTcgNi4wNTU3IDAgMCAwIDUuNzcxOC00LjIwNTggNS45ODk0IDUuOTg5NCAwIDAgMCAzLjk5NzctMi45MDAxIDYuMDU1NyA2LjA1NTcgMCAwIDAtLjc0NzUtNy4wNzI5em0tOS4wMjIgMTIuNjA4MWE0LjQ3NTUgNC40NzU1IDAgMCAxLTIuODc2NC0xLjA0MDhsLjE0MTktLjA4MDQgNC43NzgzLTIuNzU4MmEuNzk0OC43OTQ4IDAgMCAwIC4zOTI3LS42ODEzdi02LjczNjlsMi4wMiAxLjE2ODZhLjA3MS4wNzEgMCAwIDEgLjAzOC4wNTJ2NS41ODI2YTQuNTA0IDQuNTA0IDAgMCAxLTQuNDk0NSA0LjQ5NDR6bS05LjY2MDctNC4xMjU0YTQuNDcwOCA0LjQ3MDggMCAwIDEtLjUzNDYtMy4wMTM3bC4xNDIuMDg1MiA0Ljc4MyAyLjc1ODJhLjc3MTIuNzcxMiAwIDAgMCAuNzgwNiAwbDUuODQyOC0zLjM2ODV2Mi4zMzI0YS4wODA0LjA4MDQgMCAwIDEtLjAzMzIuMDYxNUw5Ljc0IDE5Ljk1MDJhNC40OTkyIDQuNDk5MiAwIDAgMS02LjE0MDgtMS42NDY0ek0yLjM0MDggNy44OTU2YTQuNDg1IDQuNDg1IDAgMCAxIDIuMzY1NS0xLjk3MjhWMTEuNmEuNzY2NC43NjY0IDAgMCAwIC4zODc5LjY3NjVsNS44MTQ0IDMuMzU0My0yLjAyMDEgMS4xNjg1YS4wNzU3LjA3NTcgMCAwIDEtLjA3MSAwbC00LjgzMDMtMi43ODY1QTQuNTA0IDQuNTA0IDAgMCAxIDIuMzQwOCA3Ljg3MnptMTYuNTk2MyAzLjg1NThMMTMuMTAzOCA4LjM2NCAxNS4xMTkyIDcuMmEuMDc1Ny4wNzU3IDAgMCAxIC4wNzEgMGw0LjgzMDMgMi43OTEzYTQuNDk0NCA0LjQ5NDQgMCAwIDEtLjY3NjUgOC4xMDQydi01LjY3NzJhLjc5Ljc5IDAgMCAwLS40MDctLjY2N3ptMi4wMTA3LTMuMDIzMWwtLjE0Mi0uMDg1Mi00Ljc3MzUtMi43ODE4YS43NzU5Ljc3NTkgMCAwIDAtLjc4NTQgMEw5LjQwOSA5LjIyOTdWNi44OTc0YS4wNjYyLjA2NjIgMCAwIDEgLjAyODQtLjA2MTVsNC44MzAzLTIuNzg2NmE0LjQ5OTIgNC40OTkyIDAgMCAxIDYuNjgwMiA0LjY2ek04LjMwNjUgMTIuODYzbC0yLjAyLTEuMTYzOGEuMDgwNC4wODA0IDAgMCAxLS4wMzgtLjA1NjdWNi4wNzQyYTQuNDk5MiA0LjQ5OTIgMCAwIDEgNy4zNzU3LTMuNDUzN2wtLjE0Mi4wODA1TDguNzA0IDUuNDU5YS43OTQ4Ljc5NDggMCAwIDAtLjM5MjcuNjgxM3ptMS4wOTc2LTIuMzY1NGwyLjYwMi0xLjQ5OTggMi42MDY5IDEuNDk5OHYyLjk5OTRsLTIuNTk3NCAxLjQ5OTctMi42MDY3LTEuNDk5N1oiLz48L3N2Zz4%3D"></a> <a href="#cursor"><img alt="Cursor" height="24" src="https://img.shields.io/badge/Cursor-000000?style=flat-square&logo=cursor&logoColor=white"></a> <a href="#gemini-cli"><img alt="Gemini CLI" height="24" src="https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white"></a> <a href="#github-copilot"><img alt="GitHub Copilot" height="24" src="https://img.shields.io/badge/Copilot-24292F?style=flat-square&logo=githubcopilot&logoColor=white"></a> <a href="#opencode"><img alt="OpenCode" height="24" src="https://img.shields.io/badge/OpenCode-333333?style=flat-square&logo=opencode&logoColor=white"></a> <a href="https://skills.sh/aboudjem"><img alt="skills.sh" height="24" src="https://img.shields.io/badge/skills.sh-000000?style=flat-square&logo=vercel&logoColor=white"></a>

Cambia `<repo>` por un nombre de repo de la tabla de arriba.
Instalación probada con las nueve herramientas el 2026-11-17, en una carpeta home vacía.

#### Claude Code

```bash
npx skills add Aboudjem/<repo> -g -a claude-code
```

#### Codex

```bash
npx skills add Aboudjem/<repo> -g -a codex
```

#### Cursor

```bash
npx skills add Aboudjem/<repo> -g -a cursor
```

#### Gemini CLI

```bash
npx skills add Aboudjem/<repo> -g -a gemini-cli
```

#### GitHub Copilot

```bash
npx skills add Aboudjem/<repo> -g -a github-copilot
```

#### OpenCode

```bash
npx skills add Aboudjem/<repo> -g -a opencode
```

**Plugin de Claude Code.** Agrega la lista una vez y luego instala por nombre.
En tres herramientas, el plugin añade más que las skills:

- sniff: el servidor MCP.
- ui-ux-suite: 5 slash commands, 12 agentes y el servidor MCP.
- recap-studio: 13 agentes, hooks de seguridad y el servidor MCP.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

Cambia `sniff` por cualquier nombre de la tabla de [los plugins](#los-plugins).
Los plugins de Claude Code se instalan por usuario, así que funcionan en todos tus proyectos.

### MCP servers

MCP es la forma estándar en que un agente llama a una herramienta. Tres herramientas incluyen un servidor MCP:

```bash
npx sniff-qa --mcp
npx ui-ux-suite --mcp
npx -y github:Aboudjem/recap-studio mcp
```

El `docs/editors.md` de cada repo muestra cómo añadir el servidor a tu editor. Las otras seis no incluyen servidor MCP.

## Qué hace cada uno

#### sniff

**Atrapa las páginas rotas de tu app web antes que tus usuarios.**

- **Bugs atrapados antes que los usuarios.** Encontró 21 de 21 bugs plantados, 0 hallazgos falsos: `npm run build && npm run proof`.
- **Pasos para repetirlo.** Cada bug de página trae su ruta, los pasos para repetirlo y un arreglo.
- **Merges rotos bloqueados.** `--fail-on` sale con código 1 ante bugs críticos o altos, así que la CI frena el merge.

Límite: usa una app de desarrollo o staging. Un recorrido hace clic en botones y envía formularios reales.

```bash
npx sniff-qa --url http://localhost:3000
npx skills add Aboudjem/sniff -g
claude plugin install sniff@10x
```

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

**Bugs de diseño por número de línea, cada uno con el arreglo exacto.**

- **Línea exacta a arreglar.** 46 hallazgos localizados en la app de prueba, cada uno con archivo y línea.
- **Regla WCAG citada.** El contraste se mide contra WCAG 2.2. Cada hallazgo cita una regla WCAG o una ley de UX.
- **Valor de arreglo dado.** Cada uno muestra el valor medido y el cambio, como `#fbfbfb` a `#767676`.

Límite: lee código fuente, no píxeles, y nunca edita tu código.

```bash
npx ui-ux-suite .
npx skills add Aboudjem/ui-ux-suite -g
claude plugin install ui-ux-suite@10x
```

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

**Entiende qué cambió, en una página que puedes enviar.**

- **Entiende lo que se hizo.** `/recap session` lee tu diff de git y tus commits, y escribe una página.
- **Una página para enviar.** Un archivo HTML, 0 etiquetas script, todo el CSS dentro. La demo imprime ambos datos.
- **Revisada antes de enviar.** Siete comprobaciones puntúan la página sin modelo. `--fail-under 8` rechaza una página floja.

Límite: la nota mide la forma, no la verdad, así que lee las fuentes antes de compartir.

```bash
npx -y github:Aboudjem/recap-studio demo
npx skills add Aboudjem/recap-studio -g
claude plugin install recap-studio@10x
```

[GitHub](https://github.com/Aboudjem/recap-studio) · [Arquitectura](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

**Encuentra qué dejar de pagar en tu factura de AWS.**

- **Factura de AWS más baja.** Cada informe empieza con un veredicto en dólares y los tres recortes que hacer primero.
- **Precios comprobados con AWS.** Cada precio registra su consulta a AWS. `make test` muestra que se rechaza una cifra sin ella.
- **Rollback antes de cualquier cambio.** Los scripts hacen una simulación por defecto. `--apply` guarda primero un archivo de rollback y luego pregunta, salvo con `--yes`.

Límite: necesita AWS CLI v2, bash y `jq`, y Cost Explorer activado.

```bash
npx skills add Aboudjem/aws-cost-audit-skill -g
claude plugin install aws-cost-audit@10x
```

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

**Dale a tu agente un trabajo grande y recibe una prueba.**

- **Preguntas hechas una vez.** Todas las preguntas van primero, una sola vez. Las respuestas quedan en el brief, bajo "Decisions".
- **Plan guardado en archivo.** La ejecución vuelve a leer el archivo del brief, así que puede empezar en un chat limpio.
- **Prueba de que está hecho.** `/goalify verify` vuelve a ejecutar tus tests: `make demo` VERIFIED, `--broken` NOT VERIFIED.

Límite: una ejecución detenida no siempre está terminada, y puede pausarse en una solicitud de permiso.

```bash
npx skills add Aboudjem/goalify -g
claude plugin install goalify@10x
```

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

**Mira por qué tu borrador suena a IA y arréglalo.**

- **Sabes qué palabras.** Cita cada palabra que suena a IA. La CLI las ordena en una lista "Fix first".
- **Se lee más humano.** El ejemplo incluido baja de 57 a 6 sobre 100. Menos es más humano.
- **Hechos conservados.** El `compare --check-facts` de la CLI falla una reescritura que perdió un número, una fecha, una versión o una URL.

Límite: no es un detector de IA y no promete pasar uno.

```bash
npx skills add Aboudjem/humanizer-skill -g
claude plugin install humanizer@10x
```

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

**Revisa una tarea repetida del agente en una línea.**

- **Sin vigilar.** `loop_status.py` imprime uno de seis veredictos y luego hasta tres cosas que hacer.
- **Menos ticks atascados.** loopify imprime primero los comandos que permitir, como `gh pr view`. Un tick es una ejecución de la tarea.
- **Se detiene solo.** La línea lleva una regla de parada. Todo `/loop` termina a los 7 días.

Límite: el bucle vive en tu sesión abierta. Si cierras la terminal, se detiene.

```bash
npx skills add Aboudjem/loopify -g
claude plugin install loopify@10x
```

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

**Encuentra lo que un extraño puede llevarse de tu app.**

- **Arreglos probados cerrados.** Un arreglo cuenta solo cuando cambia su salida VERIFY. Los 11 hallazgos de ejemplo tienen una.
- **Prueba de cada hueco.** Cada hallazgo muestra su prueba. `make test` reproduce la prueba de los 11 hallazgos de ejemplo.
- **Sin cambios sorpresa.** Escribe un informe y se detiene. Cada arreglo espera tu sí.

Límite: no es una prueba de penetración (un ataque de pago hecho por un experto).

```bash
npx skills add Aboudjem/secure-my-app -g
claude plugin install secure-my-app@10x
```

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**Un AGENTS.md para tus agentes, revisado con cero tokens.**

- **Tiempo ahorrado.** El aviso da el archivo, la línea y el comando que falta.
- **Contexto conservado.** Un archivo de 20, 40 o 60 líneas, según el tamaño del repo. El puntero `CLAUDE.md` tiene 4 líneas.
- **Tokens ahorrados.** La revisión de líneas obsoletas es un script local. No llama a ningún modelo, así que cuesta cero tokens.

Límite: comprueba que un comando existe. No ejecuta el comando.

```bash
npx skills add Aboudjem/contextify -g
claude plugin install contextify@10x
```

[GitHub](https://github.com/Aboudjem/contextify)

## Cómo funciona

10x es un solo archivo: [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json). No contiene código de ningún plugin.

1. Cada entrada nombra un plugin, su repo de GitHub y la versión listada aquí.
2. `claude plugin marketplace add Aboudjem/10x` clona este repo y lee ese archivo.
3. `claude plugin install <name>@10x` descarga el plugin desde su propio repo.
4. Una tarea programada vuelve a leer cada repo de plugin y actualiza los números de versión. [docs/SYNC.md](../docs/SYNC.md) explica la cadena.

La ruta de `npx skills` se salta este archivo. Copia las skills del repo de la herramienta a la carpeta de tu agente.

### Otros agentes

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf and Continue, and more through the skills CLI. Three plugins also run as MCP servers." width="100%">
</p>

Cada plugin de aquí se distribuye como skills, que son archivos Markdown que tu agente lee.
Por eso los nueve se instalan fuera de Claude Code mediante `npx skills add`.

| Agente | Instalación en una línea |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, y [el resto de la lista](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo> -g` |
| Cualquier cliente MCP | `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`, `npx -y github:Aboudjem/recap-studio mcp` |
| Todo lo demás | consulta `docs/editors.md` en el repo del propio plugin |

## Pruebas

Cada afirmación de abajo viene con el comando que la imprime. Ejecútalos desde un clon de este repo.

| Afirmación | Comando | Línea que buscar en la salida |
|:--|:--|:--|
| La lista contiene nueve plugins válidos | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| Cada versión listada coincide con el repo del plugin | `npm run sync:check` | `drift: none` (si no puede leer un repo, imprime `unverified: <n> of 9 ...` y sale con código 1) |
| El manifiesto se carga en Claude Code | `claude plugin validate . --strict` | `✔ Validation passed` |
| Los tests del repo pasan | `npm test` | `# fail 0` |

CI (las comprobaciones automáticas de GitHub) ejecuta los cuatro en cada push y en cada pull request. También revisa cada enlace y busca secretos.

### El estándar 10x

| | |
|---|---|
| **Sin relleno por defecto** | Ninguna dependencia que un plugin no necesite. ui-ux-suite y las seis skills no llevan ninguna. Los paquetes de recap-studio incorporan zod, y su aplicación web, Next y React. sniff solo depende de `zod` y descarga su motor de navegador y Chromium en el primer uso (unos 440 MB). |
| **Instalación en un comando** | Sin archivo de configuración y sin registro. aws-cost-audit es el único que necesita un acceso que quizá no tengas: un AWS CLI configurado para leer la cuenta. |
| **Pruebas reales** | CI que verifica el comportamiento, no solo que un archivo exista. |
| **Se ejecuta fuera de Claude Code** | Se instala en otros agentes mediante `npx skills add`. |
| **Mantenido activamente** | Una versión publicada este trimestre, no un archivo abandonado del año pasado. |
| **Sin telemetría** | Sin analítica y sin conexión a casa. Las llamadas de red sirven a la tarea, por ejemplo la descarga del navegador de sniff y su revisión de los enlaces externos de tus páginas. |

Cada plugin listado aquí se rige por este estándar. Si uno deja de cumplirlo, se elimina.
La lista completa, el catálogo y la última fecha de verificación están en [QUALITY-BAR.md](../QUALITY-BAR.md).

## FAQ

### ¿Qué es un marketplace de plugins?

Un marketplace de plugins es una lista desde la que tu editor puede instalar. Agregas la lista una vez y luego instalas cualquier plugin de ella por su nombre.

### ¿Tengo que instalar los nueve?

No. Agregar el marketplace no instala nada. Cada `claude plugin install <name>@10x` o `npx skills add` instala una herramienta.

### ¿Funciona sin Claude Code?

Sí, una herramienta a la vez. Ejecuta `npx skills add Aboudjem/<repo> -g` con el nombre del repo de la tabla.

### ¿Por qué `npx skills add Aboudjem/10x` no encuentra skills?

Este repo es solo la lista. Las skills viven en el repo de cada plugin, así que apunta el comando a ese repo.

### ¿Cómo actualizo o quito un plugin?

Ejecuta `claude plugin update <name>@10x` para actualizar. Ejecuta `claude plugin uninstall <name>@10x` para quitarlo.
Con el skills CLI, ejecuta `npx skills update` o `npx skills remove <skill>`.

### ¿10x recopila datos?

No. 10x no tiene analítica. Agregar la lista clona este repo y no ejecuta nada. Sus scripts y tests solo se ejecutan cuando tú los lanzas en un clon.

## Límites

- 10x lista plugins. No los aísla. Un plugin se ejecuta con tus permisos.
- Los comandos de Claude Code necesitan el CLI `claude`. Los demás agentes usan `npx skills add`, un repo de plugin a la vez.
- `npx skills` solo instala las skills. Solo tres plugins incluyen un servidor MCP: sniff, ui-ux-suite y recap-studio.
- aws-cost-audit necesita un AWS CLI que pueda leer tu cuenta, y `jq`.
- El primer recorrido de sniff descarga una vez un motor de navegador y Chromium: unos 440 MB, y luego unos 730 MB en disco en un Mac. `npx sniff-qa install` lo hace por adelantado, y la herramienta MCP `sniff_install` informa del progreso.
- Hasta que esa descarga termine, incluso si se cortó a medias, sniff devuelve pasos de instalación: una pista en la CLI, `needsSetup` en MCP.
- El servidor MCP de sniff responde antes de esa descarga. Su README midió de 3,1 a 4,9 s con la caché de npm vacía, por debajo del límite de conexión de 30 s de Claude Code.
- `claude plugin list` puede mostrar la nota de recap-studio "The packages it lists were not installed". Es inofensiva: el plugin corre desde un solo archivo empaquetado.
- La versión listada aquí puede ir hasta seis horas por detrás de una nueva versión de un plugin, hasta que corre la sincronización.
- Cada plugin conserva su propia licencia. sniff usa Apache-2.0, los otros ocho usan MIT.

## Contribuir

¿Tienes un plugin que encaja aquí? [CONTRIBUTING.md](../CONTRIBUTING.md) tiene los pasos para proponerlo.
Un workflow sincroniza cada versión listada desde el propio repo del plugin. [docs/SYNC.md](../docs/SYNC.md) explica la cadena.

<p align="center">
  <sub>Creado por <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licencia MIT · Sin telemetría, sin recolección de datos</sub>
</p>

Esta traducción se generó con asistencia automática; el README en inglés (`../README.md`) es la fuente autorizada.
