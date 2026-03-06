import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, 'src', 'assets', 'images');
const args = process.argv.slice(2);
const usePublicTarget = args.includes('--public');
const TARGET_DIR = usePublicTarget
  ? path.join(ROOT_DIR, 'public', 'images')
  : path.join(ROOT_DIR, 'dist', 'images');

/**
 * Publica imágenes estáticas con rutas estables para Mercado Libre.
 * Por defecto copia a dist/images (ideal para build de Vercel).
 * Si se pasa --public, copia a public/images.
 */
const main = async () => {
  try {
    console.log('Publishing images with stable public paths...');
    console.log(`Source: ${SOURCE_DIR}`);
    console.log(`Target: ${TARGET_DIR}`);

    // Limpiar destino para evitar archivos huérfanos
    await rm(TARGET_DIR, { recursive: true, force: true });

    // Crear directorio target
    await mkdir(TARGET_DIR, { recursive: true });

    // Copiar todo el contenido recursivamente
    await cp(SOURCE_DIR, TARGET_DIR, { 
      recursive: true,
      force: true 
    });

    console.log('✅ Images published successfully');
    console.log('Public URL base: https://fenixmobiliario.com/images/...');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Error publishing images:', message);
    process.exit(1);
  }
};

main();
