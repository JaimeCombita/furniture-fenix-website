import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const categoriesPath = path.join(rootDir, 'src/data/categories.json');
const productsPath = path.join(rootDir, 'src/data/products.json');

const CATEGORY_CODES = {
  sillas: 'SIL',
  mesas: 'MES',
  lockers: 'LOC',
  archivadores: 'ARC',
  carpas: 'CAR',
  'linea-exterior': 'LEX'
};

const SUBCATEGORY_CODES = {
  sillas: {
    gerenciales: 'GER',
    ejecutivas: 'EJE',
    gamer: 'GAM',
    otras: 'OTR'
  },
  carpas: {
    kioscos: 'KIO',
    hangares: 'HAN'
  }
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};

const ensureCode = (code, context) => {
  if (!/^[A-Z0-9]{3}$/.test(code)) {
    throw new Error(`Invalid 3-char code for ${context}: ${code}`);
  }
};

const categoriesData = readJson(categoriesPath);
const productsData = readJson(productsPath);

const categories = categoriesData.categories || [];
for (const category of categories) {
  const categoryCode = CATEGORY_CODES[category.id];
  if (!categoryCode) {
    throw new Error(`Missing category code mapping for: ${category.id}`);
  }

  ensureCode(categoryCode, `category ${category.id}`);
  category.code = categoryCode;

  for (const subcategory of category.subcategories || []) {
    const subcategoryCode = SUBCATEGORY_CODES[category.id]?.[subcategory.id];
    if (!subcategoryCode) {
      throw new Error(
        `Missing subcategory code mapping for: ${category.id}/${subcategory.id}`
      );
    }

    ensureCode(subcategoryCode, `subcategory ${category.id}/${subcategory.id}`);
    subcategory.code = subcategoryCode;
  }
}

const categoryById = new Map(categories.map((category) => [category.id, category]));
const products = productsData.products || productsData;
const sequenceByPrefix = new Map();
const productCodes = new Set();

for (const product of products) {
  const category = categoryById.get(product.category);
  if (!category) {
    throw new Error(`Unknown product category: ${product.id} -> ${product.category}`);
  }

  let subcategoryCode = '000';
  if (product.subcategory) {
    const subcategory = (category.subcategories || []).find(
      (item) => item.id === product.subcategory
    );

    if (!subcategory) {
      throw new Error(
        `Unknown product subcategory: ${product.id} -> ${product.category}/${product.subcategory}`
      );
    }

    subcategoryCode = subcategory.code;
  }

  const prefix = `${category.code}${subcategoryCode}`;
  const nextSequence = (sequenceByPrefix.get(prefix) || 0) + 1;
  sequenceByPrefix.set(prefix, nextSequence);

  const sequenceCode = String(nextSequence).padStart(4, '0');
  const productCode = `${prefix}${sequenceCode}`;

  if (productCodes.has(productCode)) {
    throw new Error(`Duplicate generated product code: ${productCode}`);
  }

  product.code = productCode;
  productCodes.add(productCode);
}

writeJson(categoriesPath, { categories });
writeJson(productsPath, { products });

console.log(`Updated categories: ${categories.length}`);
console.log(`Updated products: ${products.length}`);
console.log('Data migration completed successfully.');
