# PROMPT MAESTRO DEFINITIVO — MU MAYA S21 WEBSITE

---

## ROL Y MISIÓN

Sos un equipo completo de desarrollo web: arquitecto frontend senior, diseñador UI/UX especializado en videojuegos AAA, copywriter de marketing para gaming y especialista en rendimiento web.

Tu objetivo es construir el sitio oficial completo de **MU Maya S21**, un servidor privado de MU Online Season 21 para la comunidad hispana. El sitio debe competir visualmente con sitios como MuBless.gs, MuTheMatrix y servidores premium internacionales — pero con identidad propia Maya/prehispánica.

---

## ARQUITECTURA DEL PROYECTO

### Estructura de archivos

```
/mu-maya-s21/
├── index.html          ← Landing principal
├── speed.html          ← Speed Server (página de marketing bomba)
├── rankings.html       ← Rankings y estadísticas
├── noticias.html       ← Noticias y changelogs
├── descargar.html      ← Descarga del cliente
├── cuenta.html         ← Login / Registro
├── css/
│   └── main.css        ← Estilos compartidos (tokens, nav, footer, utilidades)
├── js/
│   ├── core.js         ← Nav, drawer, reveal, particles, smooth scroll
│   ├── rankings.js     ← Datos y lógica de tablas
│   └── countdown.js    ← Countdown universal
└── assets/
    └── (imágenes y fuentes locales si aplica)
```

### Recursos externos permitidos

| Recurso | URL CDN | Uso |
|---|---|---|
| Google Fonts | `fonts.googleapis.com` | Tipografía |
| Lucide Icons | `unpkg.com/lucide@latest/dist/umd/lucide.js` | Iconografía limpia |
| GSAP | `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` | Animaciones |
| ScrollTrigger | plugin de GSAP | Animaciones on-scroll |
| Unsplash | URLs directas | Imágenes de fondo |

---

## SISTEMA DE DISEÑO GLOBAL

### Paleta de colores — Dark Fantasy Maya

```css
/* ── Fondos ── */
--void:   #030202;
--abyss:  #060504;
--deep:   #0A0806;
--stone:  #111009;
--stone2: #1A160E;
--stone3: #242018;
--stone4: #2E2820;

/* ── Hierro y ceniza ── */
--iron:  #3A3020;
--iron2: #524630;
--ash:   #7A6E50;
--sand:  #A89060;

/* ── Textos ── */
--bone:       #D4C4A0;
--ivory:      #EDE0C0;
--white-warm: #F5EDD8;

/* ── Jade Maya ── */
--jade1: #0E2414;
--jade2: #163A1E;
--jade3: #1E5228;
--jade4: #2A7A38;
--jade5: #3AAA4A;

/* ── Sangre ── */
--blood1: #3A0808;
--blood2: #6A1010;
--blood3: #8C1818;
--blood4: #B02424;
--blood5: #D03030;

/* ── Dorado Maya ── */
--amber1: #3A2204;
--amber2: #5A3808;
--amber3: #8A6010;
--gold1:  #B08020;
--gold2:  #C49030;
--gold3:  #D8A840;
--gold4:  #ECC860;
--gold5:  #FADC88;

/* ── Turquesa Maya ── */
--teal1: #082020;
--teal2: #103030;
--teal3: #1A4A4A;
--teal4: #2A6A6A;
--teal5: #3A9090;

/* ── Bordes semitransparentes ── */
--b-void:  rgba(212,196,160,0.04);
--b-stone: rgba(212,196,160,0.08);
--b-iron:  rgba(212,196,160,0.14);
--b-bone:  rgba(212,196,160,0.22);
--b-gold:  rgba(196,144,48,0.25);
--b-jade:  rgba(42,122,56,0.22);
--b-blood: rgba(192,48,48,0.22);
--b-teal:  rgba(42,144,144,0.20);

/* ── Glows ── */
--glow-gold:  0 0 30px rgba(196,144,48,0.35), 0 0 60px rgba(196,144,48,0.15);
--glow-blood: 0 0 30px rgba(192,48,48,0.35),  0 0 60px rgba(192,48,48,0.15);
--glow-jade:  0 0 30px rgba(42,170,74,0.30),  0 0 60px rgba(42,170,74,0.12);
```

### Tipografía — Sistema estilo Anthropic

```css
@import url('https://fonts.googleapis.com/css2?
  family=Cormorant+SC:wght@400;500;600;700&
  family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&
  family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&
  display=swap');

--ff-display: 'Cormorant SC', Georgia, serif;       /* Títulos épicos, display */
--ff-serif:   'Cormorant Garamond', Georgia, serif;  /* Cuerpo, lead, descripciones */
--ff-ui:      'DM Sans', system-ui, sans-serif;      /* Labels, nav, UI, datos */

/* Escala tipográfica */
--text-xs:   9px;
--text-sm:  11px;
--text-base: 14px;
--text-md:  17px;
--text-lg:  20px;
--text-xl:  28px;
--text-2xl: 40px;
--text-3xl: 60px;
--text-hero: clamp(72px, 14vw, 160px);
```

### Layout y espaciado

```css
--pad-section: clamp(80px, 10vw, 140px);
--wrap:        1200px;
--wrap-narrow: 900px;
--wrap-wide:   1400px;
--gap-grid:    1px;        /* separador entre cards */
--radius-none: 0;          /* sin redondeo — estética stone */
--radius-sm:   2px;
--radius-md:   4px;
--transition:  cubic-bezier(0.16, 1, 0.3, 1);
```

---

## IDENTIDAD VISUAL MAYA — IMPLEMENTACIÓN OBLIGATORIA

### 1. Pirámide escalonada SVG

Usar en hero y páginas de eventos. 7 escalones con polígonos apilados, opacidad `.055`. Colores: `rgba(196,144,48)` para filos exteriores, `rgba(4,3,2)` para rellenos interiores.

```svg
<svg viewBox="0 0 420 300">
  <polygon points="210,12 400,270 20,270" fill="rgba(196,144,48,1)"/>
  <polygon points="210,50 360,252 60,252"  fill="rgba(4,3,2,1)"/>
  <polygon points="210,80 320,238 100,238" fill="rgba(196,144,48,.7)"/>
  <!-- continuar con 4 escalones más... -->
  <rect x="0" y="270" width="420" height="8" fill="rgba(196,144,48,.7)"/>
  <rect x="0" y="280" width="420" height="4" fill="rgba(196,144,48,.35)"/>
</svg>
```

### 2. Borde tricolor Maya

Usar en separadores de sección y sección Speed Server:

```css
.maya-bar::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: repeating-linear-gradient(90deg,
    var(--blood5) 0, var(--blood5) 8px,   transparent 8px,  transparent 10px,
    var(--gold3)  10px, var(--gold3) 18px, transparent 18px, transparent 20px,
    var(--jade5)  20px, var(--jade5) 28px, transparent 28px, transparent 30px);
}
```

### 3. Ornamento de corona

Usar sobre el título del hero en todas las páginas:

```
← línea → [ sm-sq | tall | sq | tall | DIAMOND | tall | sq | tall | sm-sq ] ← línea →
```

Construido con `<div>` y pseudoelementos. Diamond central: `width:6px; height:6px; background:var(--gold2); transform:rotate(45deg); box-shadow: 0 0 8px rgba(196,144,48,.5)`.

### 4. Separadores de sección

```css
/* Separador estándar */
.glyph-sep { display:flex; align-items:center; gap:14px; margin:16px 0 52px; }
.gl        { flex:1; height:1px; background:linear-gradient(90deg,transparent,var(--b-iron),transparent); }
.gs        { width:5px; height:5px; transform:rotate(45deg); }
.gs.gold   { background:var(--gold2); box-shadow:0 0 5px rgba(196,144,48,.4); }
.gs.jade   { background:var(--jade5); }
.gs.blood  { background:var(--blood5); }
.gs.sm     { width:3px; height:3px; }
```

### 5. Grid de piedra tallada

Fondo en todas las secciones hero:

```css
.h-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(196,144,48,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(196,144,48,.018) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent 80%);
}
```

---

## PÁGINA 1: `index.html` — LANDING PRINCIPAL

### Hero (viewport completo)

**Capas de fondo, bottom → top z-index:**

1. Imagen Unsplash oscura con `filter: brightness(0.2) saturate(0.5)`
2. Gradientes radiales: blood en top-center / jade en bottom-right / amber en bottom-left
3. Grid de piedra tallada con máscara radial
4. Pirámides SVG laterales (`opacity: .055`, una normal + una `scaleX(-1)`)
5. Ornamento de glifos horizontales (top, decorativo)
6. Viñeta top + bottom (`linear-gradient` en `::after`)
7. Grain de película (`position:fixed`, `z-index:9999`)
8. Partículas en `<canvas>` (`position:fixed`, `z-index:0`)

**Contenido del hero (centrado, `z-index:2`):**

```
[ornamento de corona]
[eyebrow: "Servidor Privado · Continente de MU · Grand Opening 2025"]
[h1: MU / MAYA — Cormorant SC clamp(72px,14vw,160px), gradient gold→blood]
[subtítulo con dashes: "Season 21 — El Crusader Despierta"]
[descripción: 2 líneas, Cormorant Garamond italic, color var(--iron2)]
[3 CTAs: Comenzar (blood) | Speed Server (gold pulsante) | El Servidor (ghost)]
[scroll cue: línea vertical con gota cayendo animada]
```

**Stats bar (bottom del hero):**

```
[dot verde pulsante] En Línea: 1.312  |  EXP: 50x  |  Drop: 30x  |  Zen: 10x  |  Max Reset: 999  |  Season: S21
```

- `border-right: 1px solid var(--b-stone)` entre celdas
- Hover: `background: rgba(196,144,48,.025)`
- Online counter fluctúa con JS: `±6` cada `4500ms`, rango `900–1700`

**Animación de entrada con GSAP:**

```js
gsap.from('.hero-el', {
  y: 24, opacity: 0, stagger: 0.14,
  duration: 1.3, ease: 'power3.out', delay: 0.1
});
```

---

### Sección "El continente te espera"

Layout 2 columnas (60 / 40):

**Izquierda:**
- Eyebrow label (`DM Sans`, `9px`, uppercase)
- `h2` grande con `<em>` en dorado
- Párrafo lead en Cormorant italic
- 2 párrafos body
- Lista de 5 features con barra izquierda dorada (`1px` + gap `18px`)

**Derecha:**
- Panel de rates: grid 2×3 con `Cormorant SC` 24px para los números
- Chips de las 16 clases disponibles (color único por clase)
- Mini countdown al próximo evento

---

### Sección Speed Server Teaser

- Fondo con grid animado dorado (`@keyframes gmove 24s linear infinite`)
- Badge pulsante con dot dorado: "Evento Especial · Servidor Temporal · 7 Días"
- Título grande con `<em>` gradient dorado
- 3 puntos clave (ícono Lucide + texto)
- Countdown prominente (4 unidades)
- CTA grande con flecha animada
- `border-top` y `border-bottom`: borde tricolor Maya

---

### Sección Últimas Noticias

Layout asimétrico: featured `60%` + 2 cards pequeñas `40%`

**Featured:**
- Dot de color por categoría (speed / siege / patch / event)
- Título `Cormorant Garamond 600`, `22px`
- Excerpt 5 líneas con `line-clamp`
- Meta: fecha + arrow link animado
- `border-top: 2px gradient(blood, amber, transparent)`

**Cards pequeñas:**
- Dot + categoría
- Título `16px`
- Excerpt 3 líneas
- Meta con arrow

---

### Sección Castle Siege

- Background con `radial-gradient` sutil blood
- `h2` gigante centrado (`Cormorant SC`)
- Subtítulo italic
- 3 cards de datos: `200 jugadores` / `7 días` / `48h registro`
- CTA centrado
- Nota del próximo siege

---

### Sección CTA Final — Descarga

- Fondo oscuro, contenido centrado
- 4 pasos mini en fila
- 2 botones grandes: **Descargar** (stone-light + borde gold) / **Mirror** (ghost)
- Specs en fila horizontal: Versión · Tamaño · OS · Gratuito

---

## PÁGINA 2: `speed.html` — SPEED SERVER (BOMBA DE MARKETING)

### Objetivo de conversión

Esta página funciona como **landing page de alto impacto**. En 10 segundos el visitante debe entender el evento y hacer clic en Inscribirse. Inspiración: páginas de lanzamiento de juegos AAA, eventos de League of Legends, battle passes.

---

### Hero del Speed Server

**Fondo:**
- Grid animado dorado (`gmove 24s linear`)
- Atmósfera multicapa: blood izquierda / jade derecha / gold centro
- Imagen Unsplash de fondo (batalla/energía) con `brightness(0.15)`
- Grain

**Contenido:**

```
[badge con dot pulsante: "Evento Especial · Servidor Temporal · 7 Días"]

SPEED      ← Cormorant SC, gigante, gradient gold
LVLUP      ← Cormorant SC, gigante, ivory
MAYA       ← Cormorant SC, gigante, gradient gold→blood

["El torneo que paraliza al continente. Igualdad total. Pura gloria."]

[3 micro-stats: 7 DÍAS · EXP x500 · TODO SE TRANSFIERE]

[CTA "INSCRIBIRSE AHORA" — grande, blood, glow pulsante]

[Countdown — apertura Jueves 5 Abril 2025 · 18:00 hs GMT-3]
```

**Countdown:**
- 4 unidades: Días / Horas / Minutos / Segundos
- Cada unidad: fondo `stone2`, borde `b-stone`, valor `Cormorant SC 32px gold2`
- Separadores `:` en `var(--iron)`
- `new Date('2025-04-05T21:00:00-03:00')` en `countdown.js`

---

### Sección "¿Qué es el Speed Server?"

3 columnas con ícono Lucide + título + descripción:

| Ícono | Título | Descripción |
|---|---|---|
| `zap` | EXP x500 | Primeras 24h x500. Luego x300. Canales exclusivos 8–11. |
| `trophy` | Competencia Real | Un personaje por clase. Carrera desde nivel 1. |
| `arrow-right-left` | Todo se Transfiere | Equipo, Zen y joyas pasan al servidor principal al cierre. |
| `shield` | Igualdad Total | Todos parten con el mismo Starting Kit. Sin ventajas previas. |
| `clock` | 7 Días Exactos | Servidor temporal. Fecha de cierre anunciada. Sin sorpresas. |

---

### Sección "Las Reglas"

5 reglas con barra lateral dorada (`1px`):

1. **Servidor Temporal — 7 Días** — Servidor independiente del principal. Personajes desde Lv.1 en condiciones idénticas para todos.
2. **EXP Masiva — x500 primeras 24h** — x300 días siguientes. Solo en Canales 8, 9, 10 y 11 se activan los códigos de ayuda.
3. **Starting Kit para Nuevos Personajes** — 60.000 puntos distribuibles. Se retiran al finalizar; el nivel alcanzado se conserva.
4. **Transferencia Total al Servidor Principal** — Un ticket de transfer gratuito por cuenta. Todo lo farmado pasa al main al cierre.
5. **Carrera Competitiva por Clase** — Ranking diario actualizado. Los primeros de cada clase ganan el premio mayor.

---

### Sección "Recompensas"

#### A. Ranking de competencia — 3 tarjetas

```
┌─ ORO ───────────────────┐  ┌─ PLATA ──────────────────┐  ┌─ BRONCE ─────────────────┐
│  1er Lugar por Clase    │  │  2do Lugar por Clase     │  │  3er Lugar por Clase     │
│  Wings L3 +13           │  │  Wings L3 +11            │  │  Wings L2 +13            │
│  Bloodangel Full Set    │  │  Darkangel Soul          │  │  Bloodangel Soul         │
│  350.000 Ruud           │  │  150.000 Ruud            │  │  75.000 Ruud             │
│  5.000 WCoins           │  │  2.000 WCoins            │  │  1.000 WCoins            │
└─────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘
```

- **Oro:** `border-color: var(--gold2)`, número `Cormorant SC` gigante con `var(--glow-gold)`, fondo `stone3`
- **Plata:** color `#9AACB8`
- **Bronce:** color `#9A7845`

#### B. Milestones para todos los participantes

| Nivel | Recompensa | Estado | Tipo |
|---|---|---|---|
| Lv. 400 | Talisman of Ascension + Wings L2 | Para todos | Transferible |
| Lv. 500 | Vault Expansion + Skeleton Ring 14d | Para todos | Transferible |
| Lv. 650 | Bloodangel Armor Set +11 + 100k Ruud | Para todos | Bound |
| Lv. 750 | Guardian Elf Muun 30d + Guardian Angel | Para todos | Transferible |
| Lv. 800 | Wings L3 +13 + 350k Ruud + Darkangel Soul | Premio máximo | Bound |

#### C. Ruud automático por nivel

- 100 Ruud por cada nivel de Lv.401 a Lv.800
- Total máximo: **40.000 Ruud automáticos**
- Barra visual con marcadores en 401, 500, 600, 700, 800
- Animada con GSAP ScrollTrigger al entrar en viewport

#### D. Carrera Crusader — Premio Especial

Card separada con borde gold pulsante (`@keyframes crusader-pulse`):

> **Carrera Crusader — La Clase Estrella del S21**
> El primer Crusader en llegar al nivel máximo en **cuenta nueva** gana el grand prize: Wings L3 +15 + Set completo + 500k Ruud + badge exclusivo visible en el sitio.

---

### Sección "Servidores Exclusivos"

Grid 4 columnas:

```
┌─ CANAL 8 ─┐  ┌─ CANAL 9 ─┐  ┌─ CANAL 10 ─┐  ┌─ CANAL 11 ─┐
│ SPEED EXP │  │ SPEED EXP │  │ SPEED EXP  │  │ SPEED EXP  │
└───────────┘  └───────────┘  └────────────┘  └────────────┘
```

> Solo en estos canales se activan los códigos /LVL y se aplica la EXP aumentada.

**Advertencia de ban** (destacada con `border-left: 3px solid var(--blood5)`):

> Personajes nivel 1601+ que hagan reset para ingresar: **Ban de 4 semanas o permanente**. Cualquier personaje 1601+ que se beneficie del evento de cualquier forma será sancionado.

---

### Sección "Códigos de Ayuda — /LVL"

Tabla completa:

| Código | Recompensas | Ventana de reclamo |
|---|---|---|
| `/LVL400` | Talisman of Ascension + Wings L2 Box | Lv.400 a Lv.405 |
| `/LVL500` | Vault Expansion + Skeleton Ring 14d | Lv.500 a Lv.505 |
| `/LVL600` | Bloodangel Set Box + Weapon Box | Lv.600 a Lv.605 |
| `/LVL700` | Pentagram Box + 50 Jewel Packet | Lv.700 a Lv.705 |
| `/LVL750` | Guardian Elf Muun 30d + Guardian Angel | Lv.750 a Lv.755 |
| `/LVL800` | Wings L3 +13 Box + Darkangel Soul + 350k Ruud | Lv.800 a Lv.805 |

**Notas:**
- Solo 1 reclamo por código por cuenta
- Items llegan al Gremory Case (K) — reclamar antes de que expire
- Solo reclamables en Canales 8, 9, 10 y 11

---

### Sección FAQ (accordion)

8 preguntas frecuentes:

1. ¿Pierdo lo que farmeo cuando termina el Speed?
2. ¿Puedo participar con un personaje ya existente?
3. ¿Cuántos personajes puedo llevar al Speed?
4. ¿Cómo funciona el transfer al servidor principal?
5. ¿Los WCoins son transferibles al main?
6. ¿Qué pasa si ya tengo nivel 1601+?
7. ¿Hay penalización por no llegar al nivel máximo?
8. ¿El Crusader tiene ventaja en la carrera de clase?

Cada item: `border-bottom: 1px solid var(--b-stone)`, ícono `chevron-down` Lucide, max-height animado en JS.

---

### CTA Final del Speed

Sección centrada con borde tricolor Maya top:

```
"¿Estás listo para la gloria?"

[Crear Cuenta — GRATIS]     [Descargar Cliente]
```

---

## COMPONENTES COMPARTIDOS

### `css/main.css`

Contiene todo lo siguiente (todas las páginas lo importan):

- Variables CSS completas (colores, tipografía, espaciado, glows, bordes)
- Reset CSS minimal
- `#grain { position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:.032; background: url(svg feTurbulence); }`
- `.wrap`, `.wrap-narrow`, `.wrap-wide`
- `.reveal`, `.d1`–`.d4` (scroll reveal con transition-delay)
- `.glyph-sep` + variantes
- `.section-tag`, `.section-title`
- `.maya-bar::before` (borde tricolor)
- Botones: `.btn-p`, `.btn-o`, `.btn-speed-cta`, `.btn-ghost-xs`, `.btn-solid-xs`
- Scrollbar global: `3px`, track `--void`, thumb `--iron` → hover `--gold2`
- Selection: `background: rgba(196,144,48,.22); color: var(--ivory)`
- Utilidades tipográficas: `.t-display`, `.t-heading`, `.t-body`, `.t-label`, `.t-caption`

---

### `js/core.js`

```js
// 1. NAV SCROLL
// nav#nav → clase .solid al pasar 44px scroll
// solid: background rgba(4,3,2,.95) + backdrop-filter blur(18px) saturate(.65)

// 2. MOBILE DRAWER
// toggleDrawer() → transform: translateX(0/100%)

// 3. SCROLL REVEAL
// IntersectionObserver → .reveal → añade .on
// threshold: 0.07 — stagger via .d1-.d4

// 4. SMOOTH SCROLL
// a[href^="#"] → scrollIntoView({behavior:'smooth'})

// 5. CANVAS PARTICLES
// 30-50 partículas, colores: gold / blood / jade / teal
// Fade in/out suave, deriva aleatoria (dx: ±0.4, dy: -0.2 a -0.8)
// Resize handler, requestAnimationFrame

// 6. ONLINE COUNTER
// let count = 1312;
// setInterval: ±6 random, clamp(900, 1700), cada 4500ms
// document.querySelectorAll('[data-online]') → actualizar todos

// 7. ACTIVE NAV LINK
// Marcar con .current el link de la página activa
// basado en window.location.pathname
```

---

### `js/countdown.js`

```js
// TARGET: new Date('2025-04-05T21:00:00-03:00')
// Actualiza cada 1000ms con setInterval
// Selecciona por data attributes:
//   [data-cd="d"] → días
//   [data-cd="h"] → horas
//   [data-cd="m"] → minutos
//   [data-cd="s"] → segundos
// Funciona en cualquier página que tenga el markup
// Al llegar a 0: muestra "ACTIVO" con clase .live

// Markup esperado:
// <span data-cd="d">00</span>
// <span data-cd="h">00</span>
// <span data-cd="m">00</span>
// <span data-cd="s">00</span>
```

---

### NAV (idéntico en todas las páginas)

```html
<nav id="nav">
  <div class="nav-in">
    <a href="index.html" class="nav-logo">
      MU Maya <span class="s21-tag">S21</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Servidor</a></li>
      <li><a href="speed.html" class="nav-speed">Speed</a></li>
      <li><a href="rankings.html">Rankings</a></li>
      <li><a href="noticias.html">Noticias</a></li>
      <li><a href="descargar.html">Descargar</a></li>
    </ul>
    <div class="nav-acts">
      <a href="cuenta.html" class="btn-ghost-xs">Ingresar</a>
      <a href="cuenta.html#registro" class="btn-solid-xs">Crear Cuenta</a>
    </div>
    <button class="nav-tog" onclick="toggleDrawer()" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
```

> El link `Speed` debe tener tratamiento especial: `color: var(--gold2)` con mini glow pulsante para atraer atención, ya que es la página de conversión principal.

---

### FOOTER (idéntico en todas las páginas)

4 columnas: **Brand** | **Navegación** | **Cuenta** | **Soporte**

- Social: `D` Discord / `f` Facebook / `T` Telegram / `Y` YouTube
- Bottom bar: copyright izquierda + estado del servidor derecha (dot verde pulsante)
- Disclaimer: `"No afiliado a Webzen Inc. MU Online es propiedad de Webzen."`
- `border-top: 1px solid var(--b-stone)`

---

## ICONOS — LUCIDE

### Setup

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', () => lucide.createIcons());
</script>
```

### Uso en HTML

```html
<i data-lucide="zap"              width="20" height="20"></i>
<i data-lucide="trophy"           width="20" height="20"></i>
<i data-lucide="shield"           width="20" height="20"></i>
<i data-lucide="swords"           width="20" height="20"></i>
<i data-lucide="users"            width="20" height="20"></i>
<i data-lucide="clock"            width="20" height="20"></i>
<i data-lucide="download"         width="20" height="20"></i>
<i data-lucide="arrow-right"      width="16" height="16"></i>
<i data-lucide="chevron-down"     width="14" height="14"></i>
<i data-lucide="arrow-right-left" width="20" height="20"></i>
<i data-lucide="star"             width="16" height="16"></i>
<i data-lucide="activity"         width="20" height="20"></i>
<i data-lucide="check"            width="14" height="14"></i>
```

### Estilo global

```css
[data-lucide] {
  stroke-width: 1.5;
  color: inherit;
  vertical-align: middle;
  flex-shrink: 0;
}
```

---

## IMÁGENES Y ASSETS

### Fondos de Unsplash (URLs directas)

Aplicar siempre con:
```css
background-image: url('https://images.unsplash.com/...');
background-size: cover;
background-position: center;
filter: brightness(0.2) saturate(0.5);
```

Sugerencias de búsqueda para obtener URLs:
- Hero principal: `dark ruins night fantasy mountains`
- Speed Server: `battle energy motion blur dark`
- Rankings: `stone medieval dark architecture`

---

## ANIMACIONES — GSAP

```js
// ── HERO ENTRANCE ──
gsap.from('.hero-el', {
  y: 24, opacity: 0, stagger: 0.14,
  duration: 1.3, ease: 'power3.out', delay: 0.1
});

// ── STAT COUNTERS ──
gsap.from('.stat-value', {
  textContent: 0, duration: 2, ease: 'power2.out',
  snap: { textContent: 1 },
  scrollTrigger: { trigger: '.statsbar', start: 'top 80%' }
});

// ── CARDS REVEAL ──
gsap.from('.card', {
  y: 32, opacity: 0, scale: 0.97, stagger: 0.08,
  duration: 0.9, ease: 'power2.out',
  scrollTrigger: { trigger: '.cards-section', start: 'top 75%' }
});

// ── MILESTONE BAR FILL ──
gsap.from('.milestone-fill', {
  width: 0, duration: 2, ease: 'power2.out',
  scrollTrigger: { trigger: '.milestones', start: 'top 70%' }
});
```

---

## ANIMACIONES — CSS KEYFRAMES

```css
/* Badge pulsante */
@keyframes badge-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,144,48,0); }
  50%       { box-shadow: 0 0 0 6px rgba(196,144,48,0.18); }
}

/* Grid animado Speed Server */
@keyframes grid-move {
  0%   { background-position: 0 0; }
  100% { background-position: 36px 36px; }
}

/* Dot online */
@keyframes heartbeat {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.78); }
}

/* Scroll cue */
@keyframes scroll-drop {
  0%   { transform: translateY(-100%); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateY(220%); opacity: 0; }
}

/* Speed CTA glow */
@keyframes speed-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,144,48,0); }
  50%       { box-shadow: var(--glow-gold); }
}

/* Crusader card pulse */
@keyframes crusader-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,144,48,0); }
  50%       { box-shadow: 0 0 0 4px rgba(196,144,48,0.15); }
}
```

---

## RESPONSIVE — 3 BREAKPOINTS

```css
@media (max-width: 1024px) {
  /* Tablet landscape: colapsar grids de 2-3 col a 1-2 col */
}

@media (max-width: 768px) {
  /* Mobile: ocultar nav links, mostrar hamburger, stack completo */
  .nav-links, .nav-acts { display: none; }
  .nav-tog { display: flex; }
}

@media (max-width: 520px) {
  /* Mobile pequeño: ajustes de padding y grid de 1 columna */
  :root { --pad-section: 44px; }
}
```

---

## REGLAS DE PRODUCCIÓN

### Performance
- CSS compartido en `<link rel="stylesheet" href="css/main.css">` + `<style>` inline solo para overrides de página
- GSAP y Lucide cargados con `defer`
- Imágenes con `loading="lazy"` salvo hero
- `<link rel="preload">` para fuentes críticas en `<head>`
- Máximo 4 requests externos por página
- `will-change: transform` solo en elementos que realmente se animan

### Accesibilidad mínima
- `aria-label` en todos los botones sin texto visible
- `role="navigation"` en `<nav>`
- Focus visible en todos los elementos interactivos
- `alt=""` en imágenes decorativas, `alt="descripción"` en imágenes con contenido

### Restricciones de diseño obligatorias
- **Cero emojis** en todo el sitio
- **Sin rounded corners** — `border-radius: 0` en todo salvo avatares (`50%`)
- Todos los bordes: `.5px` o `1px solid var(--b-*)` — nunca colores hardcoded
- Backgrounds: nunca sólidos puros, siempre gradientes sutiles o transparencias
- Texto sobre fondos oscuros: mínimo contraste `4.5:1` (WCAG AA)

---

## ORDEN DE EJECUCIÓN

### Fase 1 — Base compartida

1. **`css/main.css`** — Sistema de tokens completo, nav, footer, botones, separadores, utilidades, animaciones CSS
2. **`js/core.js`** — Partículas, nav scroll, drawer, reveal, smooth scroll, online counter
3. **`js/countdown.js`** — Countdown universal por data attributes

### Fase 2 — Páginas prioritarias

4. **`index.html`** — Hero + about teaser + speed teaser + noticias + siege + download CTA
5. **`speed.html`** — Hero + countdown + reglas + recompensas + milestones + códigos + FAQ + CTA final

### Fase 3 — Páginas de contenido

6. **`rankings.html`** — 5 tabs con datos JS + animaciones
7. **`noticias.html`** — Grid asimétrico + filtros por categoría
8. **`descargar.html`** — Steps + specs + zonas + FAQ instalación
9. **`cuenta.html`** — Toggle login/registro + validación JS

---

## CRITERIO DE ÉXITO

El sitio es exitoso si:

- Un jugador que llega por primera vez **entiende el Speed Server en menos de 10 segundos** y hace clic en Inscribirse
- El diseño se ve **profesional y moderno**, comparable a MuBless.gs y MuTheMatrix
- La identidad **Maya es reconocible** sin ser kitsch ni infantil
- El sitio carga en **menos de 3 segundos** en conexión de 10 Mbps
- Funciona correctamente en **Chrome, Firefox y Edge** desktop + mobile Chrome/Safari
- El Speed Server genera registros nuevos y tráfico de referidos desde Discord y redes sociales

---

*Prompt generado para MU Maya S21 — Servidor Privado de MU Online para la comunidad hispana.*
