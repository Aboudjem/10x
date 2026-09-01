<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg">
  <img alt="10x" src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/Aboudjem/10x/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="Licencia"></a>
  <a href="#plugins"><img src="https://img.shields.io/badge/plugins-7-f59e0b?style=flat-square" alt="7 plugins"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=f59e0b" alt="Estrellas"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="zh-CN.md">简体中文</a> ·
  <a href="ja.md">日本語</a> ·
  <b>Español</b> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>Un marketplace curado de herramientas para desarrolladores en Claude Code.</b><br/>Sin relleno. Probado. Funciona en cualquier editor de IA.</p>

![Demo del marketplace 10x](https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/demo.gif)

---

## Cómo funciona

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/hero-diagram.svg" alt="Tu editor se comunica con el marketplace 10x, que distribuye siete plugins curados: sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify, humanizer y loopify" width="100%">
</p>

<p align="center"><i>Un único comando de instalación. Cada plugin conecta automáticamente sus herramientas MCP, sus comandos de barra y sus agentes.</i></p>

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> Un único comando de instalación. Cada plugin conecta automáticamente sus herramientas MCP, sus comandos de barra y sus agentes.

---

## Plugins

Siete plugins hoy. Cada uno de ellos pasa la [barra de calidad](#la-barra-10x) de abajo.

> [!TIP]
> ¿Quieres verlos en acción? Cada repositorio de herramienta tiene su propia demo: [sniff](https://github.com/Aboudjem/sniff#readme), [ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite#readme), [recap-studio](https://github.com/Aboudjem/recap-studio#readme), [aws-cost-audit](https://github.com/Aboudjem/aws-cost-audit-skill#readme), [goalify](https://github.com/Aboudjem/goalify#readme), [humanizer](https://github.com/Aboudjem/humanizer-skill#readme) y [loopify](https://github.com/Aboudjem/loopify#readme).

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;Encuentra errores antes que tus usuarios

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="Sniff recorre tu aplicación en ejecución, descubre sus flujos y devuelve hallazgos priorizados de errores, accesibilidad y rendimiento" width="100%">
</p>

QA con IA que recorre tu aplicación en ejecución como un usuario, descubre sus flujos y encuentra errores reales en accesibilidad, rendimiento e interacciones rotas. Detecta automáticamente tu servidor de desarrollo. También hay un análisis del código fuente disponible mediante `sniff scan`. Sin claves de API, sin configuración.

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Comandos de barra**
- `/sniff` - recorrer tu aplicación en ejecución
- `/sniff-fix` - aplicar correcciones seguras
- `/sniff-report` - abrir el último análisis

</td>
<td width="50%" valign="top">

**Herramientas MCP**
- `sniff` - recorrer tu aplicación en ejecución (unificado)
- `sniff_scan` - análisis solo del código fuente
- `sniff_report` - resultados formateados

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/sniff-qa">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;Tu calidad de diseño, medida

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite analiza tu proyecto, puntúa 12 dimensiones de diseño y devuelve una auditoría citando qué ley de UX infringe cada hallazgo" width="100%">
</p>

Analiza tu CSS, tu JSX y tu configuración de Tailwind. Puntúa 12 dimensiones de diseño: accesibilidad, sistema de color, tipografía, maquetación y espaciado, calidad de componentes, jerarquía visual, calidad de interacción, capacidad de respuesta, acabado visual, rendimiento percibido, arquitectura de la información y adecuación a la plataforma. Cita la ley de UX que infringe cada hallazgo y luego te muestra la corrección exacta. Audita, nunca edita. Sin dependencias, 100 % local.

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Comandos de barra**
- `/design-audit` - auditoría completa de 12 dimensiones
- `/color-audit` - contraste + paleta
- `/type-audit` - solo tipografía
- `/layout-audit` - espaciado + cuadrícula
- `/a11y-audit` - WCAG 2.2 + APCA
- `+ 9 auditorías especializadas más`

</td>
<td width="50%" valign="top">

**Herramientas MCP**
- `uiux_scan_project` - detectar la stack
- `uiux_extract_colors` - paleta
- `uiux_check_contrast` - WCAG/APCA
- `uiux_generate_tokens` - design system
- `+ 10 herramientas más de puntuación y generación`

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;Explicativos de una página en menos de 5 minutos

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="Recap Studio toma un tema o un diff de git, ejecuta comprobaciones heurísticas deterministas de claridad y accesibilidad, y produce un explicativo de una página autónomo" width="100%">
</p>

Convierte cualquier tema o sesión de programación en un explicativo de una página limpio, pensado para móvil, que un joven de 18 años espabilado puede leer en 5 minutos. El resultado es una página HTML autónoma, lista para usar sin conexión. Comprobaciones heurísticas deterministas validan la claridad, la accesibilidad y la estructura antes de publicar, y cada afirmación está citada.

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Comandos de barra**
- `/recap "<topic>"` - página explicativa completa
- `/recap session` - recap de una sesión de programación
- `/recap setup` - escribir una configuración con valores seguros
- `/recap validate` - volver a puntuar la página activa

</td>
<td width="50%" valign="top">

**Lo que obtienes**
- Una página HTML autónoma, sin conexión
- Cada afirmación citada a una fuente
- Comprobaciones heurísticas deterministas (claridad, a11y, estructura)
- Una ruta de despliegue opcional (desactivada por defecto)

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">Arquitectura →</a>
</p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;Audita tu factura de AWS, con seguridad

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit lee tu cuenta de AWS en vivo, atribuye cada dólar y verifica los precios en vivo, y luego devuelve un plan de ahorro respaldado por evidencia y sujeto a aprobación" width="100%">
</p>

Lee tu cuenta de AWS en vivo (de solo lectura por defecto), atribuye cada dólar y encuentra recursos inactivos, huérfanos y sobredimensionados. Verifica cada precio en vivo contra la API AWS Price List (no codifica ninguno) y le da a cada hallazgo un nivel de confianza, la evidencia que lo respalda y una reversión. No se elimina nada sin pruebas y tu aprobación.

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**Qué hace**
- Recalcula el gasto en vivo (Cost Explorer)
- Inventaria cada región, caza el desperdicio
- Confianza + evidencia + reversión por hallazgo

</td>
<td width="50%" valign="top">

**Seguro por defecto**
- Solo lectura; las acciones destructivas requieren aprobación
- Verifica los precios en vivo, nunca codificados
- «Ahorrar ahora con seguridad» frente a «ahorro teórico máximo»

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;Vuelve con la prueba de que está hecho

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify investiga tu repositorio, fija las pocas decisiones reales y escribe el brief y la condición que una sesión nueva ejecuta, verifica y archiva en .goal/done/ cuando pasa cada comprobación" width="100%">
</p>

Acota una tarea de programación grande mientras aún tiene tu contexto: lee e investiga el repositorio, fija las pocas decisiones reales y luego escribe dos cosas. El brief es un archivo con lo que la ejecución tiene que hacer; la condición es una línea corta que pegas en `/goal`, con la meta definida como comandos que la ejecución puede comprobar. Haces `/clear`, pegas esa línea y una sesión nueva con todo el contexto ejecuta el trabajo completo, prueba sobre la marcha y cierra citando las comprobaciones que pasan y moviendo el brief a `.goal/done/`. Una skill de Claude Code (sin servidor MCP, sin CLI).

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify <your task>                # then, in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**Qué hace**
- Investiga el repositorio y fija las pocas decisiones reales (un único lote de preguntas)
- Escribe el brief (un archivo) y la condición (una línea para `/goal`)
- Entrega en dos pasos: `/clear` y luego pegar la condición

</td>
<td width="50%" valign="top">

**Seguro por defecto**
- Preparación de solo lectura, sin descargar y ejecutar en remoto
- Criterios de éxito conectados a comandos reales
- Archiva el brief en `.goal/done/` solo si todo tiene éxito (si no, permanece para reanudar)

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/goalify">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/06-humanizer-d946ef?style=flat-square" alt="humanizer">&nbsp;&nbsp;Detecta y reescribe patrones de escritura de IA

Detecta 43 patrones de escritura de IA (lenguaje promocional, uso excesivo del guion largo, paralelismos negativos, vocabulario típico de IA, entre otros) y reescribe el texto con variación real de longitud de oraciones (burstiness), cinco perfiles de voz y una puntuación de 0 a 100 que mide cuánto suena a IA. Tres modos: `detect` (analizar y puntuar, sin reescribir), `rewrite` (transformación completa, modo por defecto) y `edit` (edición en el propio archivo). Una skill de Claude Code (sin servidor MCP, sin CLI).

```bash
claude plugin install humanizer@10x   # as a plugin (primary)
/humanizer "tu texto"                 # then, in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**Qué hace**
- Detecta 43 patrones de escritura de IA y asigna una puntuación de 0 a 100
- Reescribe con burstiness real: mezcla oraciones cortas y largas como un humano
- Cinco perfiles de voz: casual, profesional, técnico, cercano, directo

</td>
<td width="50%" valign="top">

**Sin dependencias**
- Markdown puro, sin llamadas a la red ni claves de API
- Se ejecuta íntegramente en local dentro de Claude Code
- Sin servidor MCP, sin CLI, sin install.sh

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/humanizer-skill">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/07-loopify-14b8a6?style=flat-square" alt="loopify">&nbsp;&nbsp;Delega un trabajo que se repite

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/loopify-diagram.svg" alt="loopify acota un ciclo del trabajo que se repite, escribe el brief y la línea que pegas en /loop, y en cada tick vuelve a leer el brief, ejecuta un ciclo y anota lo que hizo en TICKS.md" width="100%">
</p>

Para los trabajos que nunca terminan del todo: mantener sana una pull request de release mientras llegan las revisiones, vigilar un despliegue hasta que se estabilice, barrer los nuevos informes de fallos cada hora. Describes el trabajo una vez. loopify lee tu proyecto, pregunta por las pocas decisiones reales y escribe dos cosas. El brief es un archivo permanente que el bucle vuelve a leer al inicio de cada tick; la línea es una cadena corta que pegas en `/loop`, el comando de repetición integrado de Claude Code. Cada ejecución es un tick, y cada tick anota lo que hizo en `TICKS.md`. La línea lleva un tope de ticks y una regla de parada, y el brief lleva cinco barreras de seguridad. Una skill de Claude Code (sin servidor MCP, sin CLI).

```bash
claude plugin install loopify@10x   # as a plugin (primary)
/loopify <your job>                 # then, in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**Qué hace**
- Lee el proyecto, pregunta lo justo y acota un ciclo
- Escribe el brief (un archivo permanente) y la línea (una cadena para `/loop`)
- Anota cada tick en `TICKS.md`; lo que no puede hacer con seguridad espera en `QUEUE.md`

</td>
<td width="50%" valign="top">

**Seguro por defecto**
- El tope de ticks y la regla de parada viajan dentro de la propia línea
- Cinco barreras: sin cuentas, sin pagos, sin publicar ni hacer push salvo que lo digas
- Todo lo que un tick lee son datos, nunca órdenes

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/loopify">GitHub →</a>
</p>

---

## Funciona con cualquier editor de IA

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="Funciona con Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue y cualquier editor compatible con MCP" width="100%">
</p>

Cada plugin **herramienta** de 10x es **de modo dual**: instálalo como plugin de Claude Code, o ejecútalo como un simple servidor MCP en el editor que prefieras. (`aws-cost-audit`, `goalify`, `humanizer` y `loopify` son skills de Claude Code en lugar de servidores MCP, así que se ejecutan en Claude Code: `aws-cost-audit` lee tu cuenta de AWS localmente, `goalify` escribe el brief y la condición para una ejecución en una sesión nueva, `humanizer` reescribe texto directamente en la sesión y `loopify` escribe el brief y la línea para un `/loop` permanente.)

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

Cada plugin herramienta también incluye un `install.sh` de una línea que lo conecta al directorio de skills de otro CLI con un solo comando (`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`), además de manifiestos `.cursor-plugin` y `.copilot-plugin`. El README de cada proyecto tiene fragmentos listos para copiar y pegar para Cursor, VS Code + Copilot, Codex, Gemini, Windsurf y Continue.dev.

---

## La barra 10x

Cada plugin aquí pasa esta barra. Si deja de pasarla, se retira.

| | |
|---|---|
| **Sin relleno** | Node.js estándar, sin dependencias en tiempo de ejecución |
| **Instalación en un comando** | Sin archivos de configuración, sin claves de API |
| **Pruebas reales** | No aspiracionales, no «próximamente» |
| **Modo dual** | Funciona como plugin de Claude Code Y como servidor MCP |
| **Mantenido activamente** | Publicado este trimestre, no abandonado el año pasado |
| **Sin telemetría** | Se ejecuta localmente, tu código nunca sale de tu máquina |

La lista completa de ocho puntos (32 elementos) está en [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md). Los mantenedores revisan cada plugin contra ella en una revisión trimestral.

> [!NOTE]
> Lista actual: **sniff 0.7.0** (441 tests), **ui-ux-suite 0.5.0** (311 tests), **recap-studio 0.4.0** (43 tests repartidos en 5 paquetes con pruebas), **aws-cost-audit 0.2.0** (construido con enfoque test-first, verificado de extremo a extremo en una cuenta real, sin precios codificados), **goalify 2.5.0** (construido con enfoque test-first; tests de manifiesto y de skill-lint, y una línea base de evaluación registrada RED→GREEN en Haiku, Sonnet y Opus), **humanizer 0.1.0** (skill-only, Markdown puro, sin dependencias en tiempo de ejecución; 43 patrones de escritura de IA verificados, 5 perfiles de voz, puntuación de 0-100), **loopify 1.0.0** (construido con enfoque test-first; evaluación de la skill 136/136 y tests de manifiesto en CI; una línea base de comportamiento registrada RED→GREEN en Sonnet: 1/7 → 7/7). Última verificación el 2026-09-01.

---

## Contribuir

¿Tienes un plugin que encaja aquí? Consulta [CONTRIBUTING.md](https://github.com/Aboudjem/10x/blob/main/CONTRIBUTING.md).

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
  Si 10x te ayudó a entregar mejor código, considera darle una estrella.<br/>
  Ayuda a otros desarrolladores a encontrar estas herramientas.
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/adam-boudjemaa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/AdamBoudj"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://adam-boudjemaa.com/"><img src="https://img.shields.io/badge/Website-f59e0b?style=flat-square&logo=googlechrome&logoColor=white" alt="Sitio web"></a>
</p>

<p align="center">
  <sub>Creado por <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · Licencia MIT · Sin telemetría · Sin recolección de datos</sub>
</p>

---

*Esta traducción se realizó con la ayuda de una herramienta automática. Se invita a los hablantes nativos a abrir un PR para corregir cualquier expresión torpe o imprecisión. El README en inglés ([../README.md](../README.md)) prevalece en caso de discrepancia.*
