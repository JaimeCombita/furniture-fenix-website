# Fénix Website

Sitio corporativo y catálogo de productos para Fénix Mobiliario Institucional.

## Objetivo

- Mostrar portafolio de mobiliario institucional por categorías y subcategorías.
- Permitir consulta de detalle de producto con galería e información comercial.
- Capturar leads por formulario de contacto y enviarlos por correo con Resend.

## Stack tecnológico

- React 19 + TypeScript.
- React Router para navegación por rutas.
- TanStack React Query para carga/caché de datos.
- Vite (rolldown-vite) para build y desarrollo.
- ESLint + Vitest + Testing Library para calidad.
- Husky + lint-staged para checks en pre-commit.

## Arquitectura (resumen)

La app sigue una organización por capas con separación de dominio:

- UI
  - pages: pantallas de ruta.
  - components: layout, ui y features reutilizables.
- Aplicación
  - hooks: paginación, filtros, carga incremental y queries.
  - config/queryClient: configuración de caché de React Query.
- Dominio
  - domains/catalog: repositorio de productos como source of truth.
  - domains/contact: servicio y validación de formulario.
- Infraestructura
  - services/api.service.ts: cliente HTTP base.
  - data/: datasets locales de categorías, banners y productos.
  - api/contact.ts + server/contact/core.mjs: endpoint serverless y lógica de envío de correo.

## Estructura del proyecto

```text
.
├─ api/
│  └─ contact.ts
├─ server/
│  └─ contact/
│     └─ core.mjs
├─ scripts/
│  ├─ local-api.mjs
│  ├─ migrate-product-codes.mjs
│  └─ optimize-images.mjs
├─ src/
│  ├─ assets/images/
│  ├─ components/
│  │  ├─ features/
│  │  ├─ layout/
│  │  └─ ui/
│  ├─ config/
│  ├─ contexts/
│  ├─ data/
│  ├─ domains/
│  │  ├─ catalog/
│  │  └─ contact/
│  ├─ hooks/
│  ├─ pages/
│  ├─ services/
│  ├─ styles/
│  ├─ test/
│  ├─ types/
│  └─ utils/
├─ .github/workflows/ci.yml
├─ vite.config.ts
└─ vercel.json
```

## Funcionalidades actuales

- Home con banners y secciones comerciales.
- Catálogo con filtrado por categoría/subcategoría y búsqueda.
- Detalle de producto por id.
- Página de servicios.
- Página de contacto con validación de campos.
- Envío de formulario hacia endpoint /api/contact.
- Observabilidad de Core Web Vitals y errores runtime (si gtag está disponible).

## Flujo de datos

### Catálogo

1. useProductsQuery consulta productsRepository.
2. productsRepository carga y cachea categorías + productos desde src/data.
3. Hooks de UI aplican filtro, paginación y carga incremental.

### Contacto

1. ContactForm valida campos en frontend (domains/contact/validation).
2. domains/contact/services envía payload al endpoint /api/contact.
3. api/contact valida de nuevo y delega en server/contact/core.mjs.
4. core.mjs construye plantilla HTML y envía correo con Resend.

## Rutas públicas

- /
- /catalogo
- /servicios
- /producto/:id
- /contacto

## Configuración de entorno

Variables recomendadas para entorno local y/o producción:

```env
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:3000

RESEND_API_KEY=
RESEND_FROM_EMAIL=Fenix Web <onboarding@resend.dev>
CONTACT_TO_EMAIL=mobiliariofenix.07@gmail.com

LOCAL_API_PORT=3000
```

Notas:

- En desarrollo, Vite usa proxy hacia LOCAL_API_PORT para /api.
- En producción, Vercel atiende /api/contact como función serverless.

## Instalación y ejecución

```bash
npm install
```

### Desarrollo completo (web + API local)

```bash
npm run dev
```

### Solo frontend

```bash
npm run dev:web
```

### Solo API local

```bash
npm run dev:api
```

## Scripts disponibles

```bash
npm run dev
npm run dev:web
npm run dev:api
npm run build
npm run preview
npm run lint
npm run test
npm run test:run
npm run test:coverage
npm run images:optimize
npm run images:optimize:dry-run
npm run migrate:codes
```

## Build y optimización de imágenes

El build ejecuta:

1. Compilación TypeScript.
2. Bundle de Vite en dist/.
3. Optimización de imágenes en dist/assets (no toca src/assets).

Script de imágenes:

- images:optimize: optimiza y sobrescribe archivos de imagen del bundle.
- images:optimize:dry-run: simula optimización y reporta ahorro sin escribir cambios.

Tipos de archivo soportados: .jpg, .jpeg, .png, .webp, .svg.

## Calidad y pruebas

- Lint: ESLint (npm run lint).
- Testing: Vitest + Testing Library (jsdom).
- Pre-commit: Husky ejecuta npm run precommit:check (lint-staged).
- CI: .github/workflows/ci.yml corre install, lint, test:run y build en push/PR.

## Seguridad y despliegue

- vercel.json define:
  - Headers de seguridad (HSTS, CSP, X-Frame-Options, etc.).
  - Cache-control para rutas y assets.
  - Rewrites para SPA y /api.
- Configurar en Vercel:
  - RESEND_API_KEY
  - RESEND_FROM_EMAIL
  - CONTACT_TO_EMAIL

## Convenciones y notas operativas

- dist/ es artefacto de build; normalmente no se versiona.
- Los assets finales tienen hash de contenido generado por Vite.
- El modo development no usa las imágenes optimizadas de dist; solo producción/preview.

## Estado del proyecto

- Arquitectura por dominios aplicada para catálogo y contacto.
- Pipeline de calidad activo (lint, tests, CI, pre-commit).
- Optimización de imágenes integrada al proceso de build.

## Licencia

Uso interno del proyecto Fénix. Ajustar esta sección si se define una licencia pública.
