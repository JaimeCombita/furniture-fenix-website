const productImageMap = import.meta.glob(
  '/src/assets/images/products/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,svg,SVG}',
  { eager: true }
) as Record<string, { default: string }>;

export const resolveProductImage = (path: string): string => {
  if (!path) return path;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  const key = `/src/assets/${normalized}`;
  const imageModule = productImageMap[key];
  return imageModule?.default ?? path;
};
