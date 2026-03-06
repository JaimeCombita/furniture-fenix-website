import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import productsData from '../src/data/products.json' with { type: 'json' };

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const ROBOTS_PATH = path.join(PUBLIC_DIR, 'robots.txt');

const baseUrl = (process.env.PUBLIC_SITE_URL || process.env.VITE_PUBLIC_SITE_URL || 'https://fenixmobiliario.com')
  .trim()
  .replace(/\/$/, '');

const staticRoutes = ['/', '/catalogo', '/servicios', '/contacto'];
const productRoutes = (productsData.products || []).map((product) => `/producto/${product.id}`);

const uniqueRoutes = Array.from(new Set([...staticRoutes, ...productRoutes]));
const lastmod = new Date().toISOString();

const buildUrlNode = (route) => {
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  const loc = `${baseUrl}${normalizedRoute}`;

  return [
    '  <url>',
    `    <loc>${encodeURI(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>0.8</priority>',
    '  </url>',
  ].join('\n');
};

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...uniqueRoutes.map(buildUrlNode),
  '</urlset>',
  '',
].join('\n');

const robotsTxt = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${baseUrl}/sitemap.xml`,
  '',
].join('\n');

const main = async () => {
  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(SITEMAP_PATH, sitemapXml, 'utf-8');
  await writeFile(ROBOTS_PATH, robotsTxt, 'utf-8');
  console.log(`✅ sitemap generado en: ${SITEMAP_PATH}`);
  console.log(`✅ robots generado en: ${ROBOTS_PATH}`);
  console.log(`🌐 base URL: ${baseUrl}`);
  console.log(`📄 URLs incluidas: ${uniqueRoutes.length}`);
};

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('❌ Error generando sitemap:', message);
  process.exit(1);
});
