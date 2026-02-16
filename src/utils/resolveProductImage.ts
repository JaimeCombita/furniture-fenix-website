const productImageMap = import.meta.glob(
  '/src/assets/images/products/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,svg,SVG}',
  { eager: true, as: 'url' }
) as Record<string, string>;

export const resolveProductImage = (path: string): string => {
  if (!path) return path;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  const key = `/src/assets/${normalized}`;
  return productImageMap[key] ?? path;
};
