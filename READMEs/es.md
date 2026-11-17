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
  <b>Español</b> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>Un marketplace de plugins es una lista desde la que tu editor puede instalar. Esta contiene nueve herramientas de desarrollo para Claude Code, y la agregas una sola vez.</b></p>

<p align="center">
  <a href="#install">Instalación</a> ·
  <a href="#the-plugins">Los plugins</a> ·
  <a href="#how-it-works">Cómo funciona</a> ·
  <a href="#proof">Pruebas</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#limits">Límites</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

Lo que ves después de esos dos comandos (ejecución real, 2026-11-17):

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

<a id="install"></a>

## Instalación

Agrega el marketplace una sola vez. Claude Code puede entonces instalar cualquiera de los nueve por su nombre.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

Cambia `sniff` por cualquier nombre de la tabla de abajo.

Un plugin puede ejecutar comandos y leer archivos con tus permisos. Lee el repo de un plugin antes de instalarlo.

¿No usas Claude Code? Instala un plugin a la vez con el [Vercel skills CLI](https://github.com/vercel-labs/skills).
Copia las skills en la carpeta que lee tu agente.

```bash
npx skills add Aboudjem/sniff
```

Usa el nombre del repo del plugin, no `Aboudjem/10x`. Este repo es una lista y no contiene skills propias.

<a id="the-plugins"></a>
## Los plugins

| | Plugin | Para qué sirve | Instalación | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **sniff** | Recorre tu app en ejecución y encuentra errores reales | `claude plugin install sniff@10x` | [repo](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **ui-ux-suite** | ESLint para el diseño: la línea, el valor, la corrección | `claude plugin install ui-ux-suite@10x` | [repo](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **recap-studio** | Un HTML explicativo offline a partir de un tema o una sesión | `claude plugin install recap-studio@10x` | [repo](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | **aws-cost-audit** | Audita tu factura de AWS contra los precios en vivo de AWS | `claude plugin install aws-cost-audit@10x` | [repo](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **goalify** | Prepara una tarea enorme para que se ejecute por su cuenta | `claude plugin install goalify@10x` | [repo](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **humanizer** | Nombra 55 hábitos de escritura de IA y los reescribe | `claude plugin install humanizer@10x` | [repo](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **loopify** | Prepara un trabajo repetitivo para el `/loop` de Claude Code | `claude plugin install loopify@10x` | [repo](https://github.com/Aboudjem/loopify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | **secure-my-app** | Encuentra lo que un extraño puede llevarse y luego demuestra que quedó cerrado | `claude plugin install secure-my-app@10x` | [repo](https://github.com/Aboudjem/secure-my-app) |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **contextify** | Redacta instrucciones para agentes y comprueba que siguen vigentes | `claude plugin install contextify@10x` | [repo](https://github.com/Aboudjem/contextify) |

<a id="what-each-one-does"></a>

### Qué hace cada uno

#### sniff

Apúntalo a tu app en ejecución y recorre tus flujos reales en un navegador real, y luego te dice qué se rompió y los pasos ordenados que lo rompieron.

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

Lee tu CSS, JSX, HTML y clases de Tailwind, y nombra el archivo, la línea, el valor incorrecto medido y la corrección exacta. Audita, nunca edita.

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

Convierte un tema o una sesión de programación en un único archivo HTML que puedes abrir con doble clic, con cada estilo insertado y sin ninguna solicitud externa, legible sin conexión en unos cinco minutos.

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Arquitectura](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

Lee tu cuenta de AWS en vivo mediante el AWS CLI que ya tienes instalado y te entrega un plan de ahorro donde cada precio se verifica en vivo, nunca se cita de memoria.

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

Para un trabajo demasiado grande como para quedarse mirándolo, escribe el brief (un archivo con lo que la ejecución tiene que hacer) y la condición (una línea que pegas en `/goal`), de modo que una sesión nueva hace el trabajo y cierra citando las comprobaciones que superó.

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

Conoce 55 hábitos que hacen que un texto se lea como escrito por una máquina, nombra los que encuentra en tu texto, lo puntúa de 0 a 100 a partir de señales medibles, y lo reescribe con la voz que elijas.

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

Para un trabajo que se repite en lugar de terminar, escribe el brief y la línea que pegas en `/loop`, el comando de repetición integrado de Claude Code, con un tope de ciclos y una regla de parada. Cada ciclo registra lo que hizo.

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

Encuentra lo que un extraño puede llevarse de tu aplicación, respalda cada hallazgo con un comando cuya salida puedes leer, y luego arregla solo lo que apruebas y vuelve a ejecutar ese mismo comando para demostrar que el hueco quedó cerrado y que tu propio inicio de sesión sigue funcionando. 65 controles en siete grupos. Una ejecución limpia nunca se declara segura: su tercer veredicto es `NOTHING CONFIRMED HERE`.

`claude plugin install secure-my-app@10x`

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**Tell every coding agent how your repo works. Then prove it is still true.**

Mantiene `AGENTS.md` breve y reutiliza la documentación existente que siga siendo correcta. Cuando hace falta, añade `docs/context/architecture.md` o `docs/context/workflows.md`, de hasta 120 líneas cada uno, enlazados para leerlos según la tarea. Los hooks Git instalados comprueban el contexto al hacer commit y push, sin llamar a un modelo; los hooks de sesión son opcionales. Las actualizaciones muestran un diff y conservan el contenido humano fuera de los bloques gestionados.

`claude plugin install contextify@10x`

[GitHub](https://github.com/Aboudjem/contextify)

<a id="how-it-works"></a>

## Cómo funciona

10x es un solo archivo: [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json). No contiene código de ningún plugin.

1. Cada entrada nombra un plugin, su repo de GitHub y la versión listada aquí.
2. `claude plugin marketplace add Aboudjem/10x` clona este repo y lee ese archivo.
3. `claude plugin install <name>@10x` descarga el plugin desde su propio repo.
4. Una tarea programada vuelve a leer cada repo de plugin y actualiza los números de versión. [docs/SYNC.md](../docs/SYNC.md) explica la cadena.

<a id="other-agents"></a>

### Otros agentes

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

Cada plugin de aquí se distribuye como skills, que son archivos Markdown que tu agente lee.
Por eso los nueve se instalan fuera de Claude Code mediante `npx skills add`.
El skills CLI mantiene su propia [lista de agentes compatibles](https://github.com/vercel-labs/skills#supported-agents).

Tres plugins también funcionan como servidor MCP independiente. MCP es el protocolo que habla un editor para llegar a una herramienta externa.
sniff y ui-ux-suite se ejecutan directamente desde npm. recap-studio se ejecuta desde un clon, tras compilar el workspace.
Los otros seis no incluyen servidor MCP.

| Agente | Instalación en una línea |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, y [el resto de la lista](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| Cualquier cliente MCP | `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`, recap-studio desde un clon compilado |
| Todo lo demás | consulta `docs/editors.md` en el repo del propio plugin |

<a id="proof"></a>

## Pruebas

Cada afirmación de abajo viene con el comando que la imprime. Ejecútalos desde un clon de este repo.

| Afirmación | Comando | Línea que buscar en la salida |
|:--|:--|:--|
| La lista contiene nueve plugins válidos | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| Cada versión listada coincide con el repo del plugin | `npm run sync:check` | `drift: none` (si no puede leer un repo, imprime `unverified: <n> of 9 ...` y sale con código 1) |
| El manifiesto se carga en Claude Code | `claude plugin validate . --strict` | `✔ Validation passed` |
| Los tests del repo pasan | `npm test` | `# fail 0` |

CI ejecuta los cuatro en cada push y en cada pull request. También revisa cada enlace y busca secretos.

<a id="the-10x-bar"></a>

### El estándar 10x

| | |
|---|---|
| **Sin relleno por defecto** | Ninguna dependencia que un plugin no necesite. ui-ux-suite y las seis skills no llevan ninguna. Los paquetes de recap-studio incorporan zod, y su aplicación web, Next y React. sniff maneja un navegador real, así que incluye Playwright y Lighthouse. |
| **Instalación en un comando** | Sin archivo de configuración y sin registro. aws-cost-audit es el único que necesita un acceso que quizá no tengas: un AWS CLI configurado para leer la cuenta. |
| **Pruebas reales** | CI que verifica el comportamiento, no que un archivo exista. |
| **Se ejecuta fuera de Claude Code** | Se instala en otros agentes mediante `npx skills add`. |
| **Mantenido activamente** | Una versión publicada este trimestre, no un archivo abandonado del año pasado. |
| **Sin telemetría** | Sin analítica y sin conexión a casa. Cada herramienta habla solo con aquello a lo que la apuntas. |

Cada plugin listado aquí se rige por este estándar. Si uno deja de cumplirlo, se elimina. La lista completa,
con el catálogo y la última fecha de verificación, está en [QUALITY-BAR.md](../QUALITY-BAR.md).

<a id="faq"></a>

## FAQ

### ¿Qué es un marketplace de plugins?

Es una lista desde la que tu editor puede instalar. Agregas la lista una vez y luego instalas cualquier plugin por su nombre.

### ¿Tengo que instalar los nueve?

No. Agregar el marketplace no instala nada. Cada `claude plugin install <name>@10x` instala un solo plugin.

### ¿Funciona sin Claude Code?

Sí, un plugin a la vez. Ejecuta `npx skills add Aboudjem/<repo>` con el nombre del repo del plugin, tomado de la tabla.

### ¿Por qué `npx skills add Aboudjem/10x` no encuentra skills?

Este repo es solo la lista. Las skills viven en el repo de cada plugin, así que apunta el comando a ese repo.

### ¿Cómo actualizo o quito un plugin?

Ejecuta `claude plugin update <name>@10x` para actualizar. Ejecuta `claude plugin uninstall <name>@10x` para quitarlo.

### ¿10x recopila datos?

No. El repo contiene un archivo JSON, documentación e imágenes. Nada de eso se ejecuta en tu máquina.

<a id="limits"></a>

## Límites

- 10x lista plugins. No los aísla. Un plugin se ejecuta con tus permisos.
- Los comandos de Claude Code necesitan el CLI `claude`. Los demás agentes usan `npx skills add`, un repo de plugin a la vez.
- Solo tres plugins incluyen un servidor MCP: sniff, ui-ux-suite y recap-studio.
- aws-cost-audit necesita un AWS CLI que pueda leer tu cuenta.
- En su primer arranque, el servidor MCP de sniff descarga un navegador y sus herramientas. Eso puede superar el tiempo de conexión de Claude Code. Precaliéntalo una vez: `npx -y sniff-qa --version`.
  Si una descarga cortada deja npx con un error `Invalid Version`, borra su caché (`rm -rf ~/.npm/_npx`) y vuelve a precalentar.
- `claude plugin list` puede mostrar una nota informativa junto a un plugin, por ejemplo la nota de lockfile de recap-studio. El plugin se instala y funciona igual.
- La versión listada aquí puede ir hasta seis horas por detrás de una nueva versión de un plugin, hasta que corre la sincronización.
- Cada plugin conserva su propia licencia. sniff usa Apache-2.0, los otros ocho usan MIT.

## Contribuir

¿Tienes un plugin que encaja aquí? [CONTRIBUTING.md](../CONTRIBUTING.md) tiene los pasos para proponerlo.
Un workflow sincroniza cada versión fijada desde el propio repo del plugin; [docs/SYNC.md](../docs/SYNC.md) explica esa cadena.

<p align="center">
  <sub>Creado por <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licencia MIT · Sin telemetría, sin recolección de datos</sub>
</p>

Esta traducción se generó con asistencia automática; el README en inglés (`../README.md`) es la fuente autorizada.
