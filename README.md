# Fénix Website

[![Build Status](https://github.com/JaimeCombita/furniture-fenix-website/actions/workflows/ci.yml/badge.svg)](https://github.com/JaimeCombita/furniture-fenix-website/actions/workflows/ci.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Vitest](https://img.shields.io/badge/Test-Vitest-6E9F18?logo=vitest)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JaimeCombita/furniture-fenix-website)
![GitHub last commit](https://img.shields.io/github/last-commit/JaimeCombita/furniture-fenix-website)
[![Vercel Production](https://img.shields.io/website?url=https%3A%2F%2Ffurniture-fenix-website.vercel.app%2F&up_message=online&down_message=down&label=Vercel%20Production&logo=vercel)](https://furniture-fenix-website.vercel.app/)

![Vercel](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel)

Dashboard: https://vercel.com/jaime-combitas-projects/furniture-fenix-website  
Production: https://furniture-fenix-website.vercel.app/

---

## ES

Sitio corporativo y catálogo de productos para Fénix Mobiliario Institucional.

### Objetivo

- Mostrar portafolio de mobiliario institucional por categorías y subcategorías.
- Permitir consulta de detalle de producto con galería e información comercial.
- Capturar leads por formulario de contacto y enviarlos por correo con Resend.

### Stack tecnológico

- React 19 + TypeScript.
- React Router para navegación por rutas.
- TanStack React Query para carga y caché de datos.
- Vite (rolldown-vite) para build y desarrollo.
- ESLint + Vitest + Testing Library para calidad.
- Husky + lint-staged para checks en pre-commit.

### Arquitectura (resumen)

- UI
  - `pages`: pantallas de ruta.
  - `components`: layout, ui y features reutilizables.
- Aplicación
  - `hooks`: paginación, filtros, carga incremental y queries.
  - `config/queryClient`: configuración de caché de React Query.
- Dominio
  - `domains/catalog`: repositorio de productos como source of truth.
  - `domains/contact`: servicio y validación de formulario.
- Infraestructura
  - `services/api.service.ts`: cliente HTTP base.
  - `data/`: datasets locales de categorías, banners y productos.
  - `api/contact.ts` + `server/contact/core.mjs`: endpoint serverless y lógica de correo.

### Estructura del proyecto

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

### Funcionalidades actuales

- Home con banners y secciones comerciales.
- Catálogo con filtros por categoría/subcategoría y búsqueda.
- Detalle de producto por id.
- Página de servicios.
- Página de contacto con validación de campos.
- Envío del formulario a `/api/contact`.
- Observabilidad de Core Web Vitals y errores runtime (si `gtag` está disponible).

### Flujo de datos

#### Catálogo

1. `useProductsQuery` consulta `productsRepository`.
2. `productsRepository` carga y cachea categorías + productos desde `src/data`.
3. Hooks de UI aplican filtro, paginación y carga incremental.

#### Contacto

1. `ContactForm` valida campos en frontend (`domains/contact/validation`).
2. `domains/contact/services` envía payload al endpoint `/api/contact`.
3. `api/contact` valida de nuevo y delega en `server/contact/core.mjs`.
4. `core.mjs` construye plantilla HTML y envía correo con Resend.

### Rutas públicas

- `/`
- `/catalogo`
- `/servicios`
- `/producto/:id`
- `/contacto`

### Configuración de entorno

```env
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:3000

RESEND_API_KEY=
RESEND_FROM_EMAIL=Fenix Web <onboarding@resend.dev>
CONTACT_TO_EMAIL=mobiliariofenix.07@gmail.com

LOCAL_API_PORT=3000
```

Notas:

- En desarrollo, Vite usa proxy hacia `LOCAL_API_PORT` para `/api`.
- En producción, Vercel atiende `/api/contact` como función serverless.

### Instalación y ejecución

```bash
npm install
```

Desarrollo completo (web + API local):

```bash
npm run dev
```

Solo frontend:

```bash
npm run dev:web
```

Solo API local:

```bash
npm run dev:api
```

### Scripts disponibles

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

### Build y optimización de imágenes

El build ejecuta:

1. Compilación TypeScript.
2. Bundle de Vite en `dist/`.
3. Optimización de imágenes en `dist/assets` (no toca `src/assets`).

Scripts de imágenes:

- `images:optimize`: optimiza y sobrescribe imágenes del bundle.
- `images:optimize:dry-run`: simula optimización y reporta ahorro sin escribir.

Extensiones soportadas: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`.

### Calidad y pruebas

- Lint: ESLint (`npm run lint`).
- Testing: Vitest + Testing Library (`npm run test:run`).
- Pre-commit: Husky ejecuta `npm run precommit:check` (lint-staged).
- CI: `.github/workflows/ci.yml` corre `install`, `lint`, `test:run` y `build`.

### Seguridad y despliegue

- `vercel.json` define:
  - headers de seguridad (HSTS, CSP, X-Frame-Options, etc.),
  - cache-control para rutas y assets,
  - rewrites para SPA y `/api`.
- Variables en Vercel:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `CONTACT_TO_EMAIL`

### Notas operativas

- `dist/` es artefacto de build; normalmente no se versiona.
- Los assets finales tienen hash de contenido generado por Vite.
- El modo development no usa imágenes optimizadas de `dist`; solo producción/preview.

### Licencia

Uso interno del proyecto Fénix. Ajustar esta sección si se define una licencia pública.

---

## EN

Corporate website and product catalog for Fénix Mobiliario Institucional.

### Goal

- Showcase institutional furniture portfolio by category and subcategory.
- Provide product detail pages with galleries and commercial information.
- Capture leads through a contact form and send them via Resend.

### Tech stack

- React 19 + TypeScript.
- React Router for client-side routing.
- TanStack React Query for data fetching and caching.
- Vite (rolldown-vite) for build and development.
- ESLint + Vitest + Testing Library for quality.
- Husky + lint-staged for pre-commit checks.

### Architecture (overview)

- UI
  - `pages`: route-level screens.
  - `components`: reusable layout, ui, and feature components.
- Application
  - `hooks`: pagination, filters, incremental loading, and queries.
  - `config/queryClient`: React Query cache configuration.
- Domain
  - `domains/catalog`: products repository as source of truth.
  - `domains/contact`: contact service and validation.
- Infrastructure
  - `services/api.service.ts`: base HTTP client.
  - `data/`: local datasets for categories, banners, and products.
  - `api/contact.ts` + `server/contact/core.mjs`: serverless endpoint and mail logic.

### Project structure

```text
.
├─ api/
├─ server/
├─ scripts/
├─ src/
│  ├─ assets/images/
│  ├─ components/
│  ├─ config/
│  ├─ data/
│  ├─ domains/
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

### Current features

- Home page with business sections and banners.
- Catalog with category/subcategory filters and search.
- Product detail page by id.
- Services page.
- Contact page with field validation.
- Contact form submission to `/api/contact`.
- Core Web Vitals and runtime error tracking (when `gtag` is available).

### Environment variables

```env
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:3000
RESEND_API_KEY=
RESEND_FROM_EMAIL=Fenix Web <onboarding@resend.dev>
CONTACT_TO_EMAIL=mobiliariofenix.07@gmail.com
LOCAL_API_PORT=3000
```

### Install and run

```bash
npm install
npm run dev
```

### Main scripts

```bash
npm run build
npm run lint
npm run test:run
npm run images:optimize
npm run images:optimize:dry-run
```

### Build and image optimization

Build runs in this order:

1. TypeScript compilation.
2. Vite bundle to `dist/`.
3. Image optimization in `dist/assets` (does not modify `src/assets`).

Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`.

### Quality, CI, and deployment

- Lint: `npm run lint`
- Tests: `npm run test:run`
- Pre-commit: Husky + lint-staged
- CI: `.github/workflows/ci.yml`
- Deployment and security headers: `vercel.json`

### License

Internal use for Fénix project. Update this section if a public license is defined.
