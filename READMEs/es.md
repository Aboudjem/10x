<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg">
  <img alt="10x" src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/Aboudjem/10x/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="Licencia"></a>
  <a href="#complementos"><img src="https://img.shields.io/badge/plugins-7-f59e0b?style=flat-square" alt="7 complementos"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=f59e0b" alt="Estrellas"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/zh-CN.md">简体中文</a> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/ja.md">日本語</a> ·
  <b>Español</b> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/fr.md">Français</a>
</p>

<p align="center"><b>Un catálogo cuidadosamente seleccionado de herramientas de desarrollo para Claude Code.</b><br/>Sin elementos innecesarios. Probado. Compatible con cualquier editor de IA.</p>

![Demo del catálogo 10x](https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/demo.gif)

---

## Cómo funciona

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/hero-diagram.svg" alt="Tu editor se comunica con el catálogo 10x, que distribuye siete complementos seleccionados: sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify, humanizer y loopify" width="100%">
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> Un único comando de instalación. Cada complemento conecta automáticamente sus herramientas MCP, sus comandos con `/` y sus agentes.

Las versiones indicadas aquí siguen las publicaciones de cada complemento; consulta [docs/SYNC.md](https://github.com/Aboudjem/10x/blob/main/docs/SYNC.md).

---

## Complementos

Siete complementos hoy. Cada uno de ellos cumple los [criterios de calidad](#el-estándar-10x) que se explican más abajo.

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;Encuentra los errores antes de que los encuentren tus usuarios

> Indícale la dirección de tu aplicación en ejecución. Recorre tus flujos de usuario reales en un navegador real y te dice qué está realmente roto, con pruebas.

Abre tu aplicación en un navegador real y hace clic en ella como lo haría una persona. Recibes una lista priorizada de lo que falló, y cada hallazgo incluye los pasos para reproducirlo. Necesita que tu aplicación esté en ejecución: si no hay ningún servidor activo, sniff analiza el código fuente en su lugar.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="sniff recorre tu aplicación en ejecución, descubre sus flujos y devuelve hallazgos priorizados de errores, accesibilidad y rendimiento" width="100%"></p>

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

441 pruebas. 12 clases de errores.

<p><a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/sniff-qa">npm →</a></p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;Mide la calidad de tu diseño

> **ESLint para el diseño.** Encuentra la línea exacta, el valor medido que es incorrecto y la corrección exacta.

Lee tu CSS, tu JSX y tu configuración de Tailwind, y luego puntúa doce aspectos de tu diseño, entre ellos el color, la tipografía, el espaciado y la accesibilidad. Cada hallazgo indica el archivo, la línea, el valor que está mal y la corrección. Se limita a informar y nunca modifica los archivos, así que aplicar una corrección sigue siendo decisión tuya.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite analiza tu proyecto, puntúa 12 dimensiones de diseño y devuelve una auditoría citando qué ley de UX infringe cada hallazgo" width="100%"></p>

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

311 pruebas. 12 dimensiones ponderadas.

<p><a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a></p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;Guías visuales de una página en menos de 5 minutos

> Convierte cualquier tema o sesión de programación en una guía visual bonita, en modo oscuro y pensada para móvil, que puedes abrir con doble clic. Sin servidor, sin internet, sin dependencias.

Proporciónale un tema o una sesión de programación y obtendrás una página HTML que podrás abrir con doble clic. Funciona sin conexión y cada afirmación incluye una fuente. Un verificador rápido puntúa la página antes de que la publiques, y esa puntuación es una señal estructural, no una revisión por pares.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="recap-studio toma un tema o un diff de Git, ejecuta comprobaciones deterministas de claridad y accesibilidad, y genera un documento explicativo de una página que funciona por sí solo" width="100%"></p>

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

43 pruebas distribuidas entre 5 paquetes.

<p><a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp; <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">Arquitectura →</a></p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;Audita tu factura de AWS de forma segura

> Pídele a Claude que audite tu factura de AWS. Obtén un plan de ahorro claro en el que cada cifra se verifica con los precios actuales de AWS, y nada se elimina sin tu autorización.

Lee tu cuenta, calcula lo que cuesta realmente cada recurso y encuentra los que están inactivos o sobredimensionados. Cada propuesta de ahorro incluye un nivel de confianza, la evidencia que la respalda y una forma de deshacerla. Es de solo lectura por defecto, así que nada cambia hasta que una ejecución de prueba se completa correctamente y tú das el visto bueno.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit lee tu cuenta de AWS en vivo, calcula en qué se gasta cada dólar y verifica los precios en vivo, y luego devuelve un plan de ahorro respaldado por evidencia y sujeto a aprobación" width="100%"></p>

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<p><a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;Cuando vuelvas, tendrás pruebas de que el trabajo está terminado

> Encarga a Claude una tarea enorme. Cuando vuelvas, tendrás pruebas de que está terminada, no una simple promesa.

Para trabajos demasiado grandes como para supervisarlos de principio a fin, goalify escribe el documento de instrucciones (un archivo con lo que la ejecución tiene que hacer) y la condición (una línea que pegas en `/goal`). Borras el chat, pegas esa línea, y una sesión nueva realiza todo el trabajo y luego cierra citando las comprobaciones que superó. Que una ejecución se detenga no es prueba de que terminó, así que lee esa evidencia final antes de confiar en ella.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify investiga tu repositorio, fija las pocas decisiones reales y escribe el documento de instrucciones y la condición para que una sesión nueva ejecute y verifique el trabajo; después archiva el documento en .goal/done/ cuando todas las comprobaciones pasan" width="100%"></p>

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify <your task>                # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/goalify">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/06-humanizer-d946ef?style=flat-square" alt="humanizer">&nbsp;&nbsp;Haz que un texto generado por IA suene como si lo hubiera escrito una persona

> humanizer es una herramienta gratuita y de código abierto que detecta y mejora textos escritos por IA.

Pega un texto: humanizer evalúa hasta qué punto parece escrito por una máquina, o lo reescribe con la voz que elijas. La nueva versión combina frases de distintas longitudes, como suele hacer la gente. Es un único archivo Markdown, nada sale de tu máquina, y su objetivo es mejorar la escritura, no engañar a los detectores.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/humanizer-diagram.svg" alt="humanizer analiza el texto en busca de patrones de escritura de IA, evalúa hasta qué punto parece generado por IA en una escala de 0 a 100, y luego lo reescribe con frases de distintas longitudes en la voz que elijas" width="100%"></p>

```bash
claude plugin install humanizer@10x   # as a plugin (primary)
/humanizer "<your text>"              # then, in any Claude Code session
```

55 patrones, 5 voces, una puntuación de 0-100 que mide cuánto suena a IA.

<p><a href="https://github.com/Aboudjem/humanizer-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/07-loopify-14b8a6?style=flat-square" alt="loopify">&nbsp;&nbsp;Delega un trabajo que se repite

> Dale a Claude un trabajo que se repite. Cuando vuelvas, tendrás un registro de lo que hizo cada ciclo, no un bucle que tengas que vigilar.

Algunos trabajos nunca terminan del todo: vigilar que un despliegue se estabilice, revisar los nuevos informes de fallos cada hora. loopify escribe el documento de instrucciones (un archivo de referencia que el bucle vuelve a leer en cada ejecución) y la línea (un texto que pegas en `/loop`), con un tope de ciclos y una regla de parada incluidos dentro de la línea. Cada ciclo anota lo que hizo en `TICKS.md`, y deberías leer ese registro: un bucle que no encontró nada que hacer se ve igual desde fuera que uno que estuvo arreglando cosas toda la tarde.

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/loopify-diagram.svg" alt="loopify acota un ciclo del trabajo que se repite, escribe el documento de instrucciones y la línea que pegas en /loop; en cada ciclo, vuelve a leer el documento de instrucciones, hace su trabajo y anota lo que hizo en TICKS.md" width="100%"></p>

```bash
claude plugin install loopify@10x   # as a plugin (primary)
/loopify <your job>                 # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/loopify">GitHub →</a></p>

---

## Funciona con cualquier editor de IA

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="Funciona con Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue y cualquier editor compatible con MCP" width="100%">
</p>

sniff, ui-ux-suite y recap-studio pueden usarse de dos formas: instala cualquiera de ellos como complemento de Claude Code, o ejecútalo como un simple servidor MCP en el editor que prefieras. aws-cost-audit, goalify, humanizer y loopify son habilidades de Claude Code en lugar de servidores MCP, así que se ejecutan en Claude Code.

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

Cada complemento que funciona como herramienta incluye un `install.sh` de una línea que lo configura en el directorio de habilidades de otra interfaz de línea de comandos (`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`), además de los manifiestos `.cursor-plugin` y `.copilot-plugin`. El README de cada proyecto tiene fragmentos listos para copiar y pegar para Cursor, VS Code + Copilot, Codex, Gemini, Windsurf y Continue.dev.

---

## El estándar 10x

Cada complemento de aquí cumple este estándar. Si deja de cumplirlo, se retira.

| | |
|---|---|
| **Sin relleno** | Node.js puro, sin dependencias en tiempo de ejecución |
| **Instalación en un comando** | Sin archivos de configuración, sin claves de API |
| **Pruebas reales** | Existen de verdad: no son una aspiración ni algo «próximamente disponible» |
| **Modo dual** | Funciona como complemento de Claude Code y como servidor MCP |
| **Mantenido activamente** | Con una versión publicada este trimestre; no abandonado el año pasado |
| **Sin telemetría** | Se ejecuta localmente, tu código nunca sale de tu máquina |

La lista completa está en [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md). Los mantenedores vuelven a verificar cada complemento con esos criterios en una revisión trimestral.

> [!NOTE]
> Lista actual: **sniff 0.7.0** (441 pruebas), **ui-ux-suite 0.5.0** (311 pruebas), **recap-studio 0.4.0** (43 pruebas repartidas en 5 paquetes con pruebas), **aws-cost-audit 0.2.0** (de solo lectura por defecto), **goalify 2.5.0**, **humanizer 0.6.2** (55 patrones), **loopify 1.0.0**. Última verificación el 2026-09-01.

---

## Contribuir

¿Tienes un complemento que encaja aquí? Consulta [CONTRIBUTING.md](https://github.com/Aboudjem/10x/blob/main/CONTRIBUTING.md).

---

## Historial de estrellas

<a href="https://star-history.com/#Aboudjem/10x&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" />
    <img alt="Gráfico del historial de estrellas para Aboudjem/10x" src="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" width="70%" />
  </picture>
</a>

---

<p align="center">
  Si 10x te ayudó a crear código de mayor calidad, considera darle una estrella.<br/>
  Así ayudas a otros desarrolladores a encontrar estas herramientas.
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/adam-boudjemaa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/AdamBoudj"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://adam-boudjemaa.com/"><img src="https://img.shields.io/badge/Website-f59e0b?style=flat-square&logo=googlechrome&logoColor=white" alt="Sitio web"></a>
</p>

<p align="center">
  <sub>Creado por <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licencia MIT · Sin telemetría · Sin recolección de datos</sub>
</p>

