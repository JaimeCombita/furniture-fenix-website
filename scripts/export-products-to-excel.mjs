import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import * as XLSX from 'xlsx';
import productsData from '../src/data/products.json' with { type: 'json' };

const ROOT_DIR = process.cwd();
const EXPORT_DIR = path.join(ROOT_DIR, 'exports');
const OUTPUT_PATH = path.join(EXPORT_DIR, 'productos-fenix.xlsx');

const baseUrl = (process.env.PUBLIC_SITE_URL || process.env.VITE_PUBLIC_SITE_URL || 'https://fenixmobiliario.com')
  .trim()
  .replace(/\/$/, '');

const products = Array.isArray(productsData?.products) ? productsData.products : [];

const rows = products.map((product) => {
  const photoPath = Array.isArray(product.images) && product.images.length > 0 ? String(product.images[0]) : '';
  const photoUrl = photoPath ? `${baseUrl}${photoPath}` : '';
  const articleUrl = `${baseUrl}/producto/${product.id}`;

  return {
    id: product.id || '',
    codigo: product.code || '',
    nombre: product.name || '',
    categoria: product.category || '',
    descripcion_corta: product.shortDescription || '',
    descripcion: product.description || '',
    foto: photoUrl,
    precio: '',
    url_articulo: articleUrl,
  };
});

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(rows);

worksheet['!cols'] = [
  { wch: 35 },
  { wch: 15 },
  { wch: 45 },
  { wch: 18 },
  { wch: 70 },
  { wch: 120 },
  { wch: 80 },
  { wch: 14 },
  { wch: 70 },
];

XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

const main = async () => {
  await mkdir(EXPORT_DIR, { recursive: true });
  XLSX.writeFile(workbook, OUTPUT_PATH);

  console.log(`✅ Excel generado: ${OUTPUT_PATH}`);
  console.log(`📦 Productos exportados: ${rows.length}`);
  console.log('📝 Campo precio incluido vacío para edición manual.');
};

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('❌ Error generando Excel:', message);
  process.exit(1);
});
