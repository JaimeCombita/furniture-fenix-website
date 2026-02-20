const catalogImageMap = import.meta.glob(
  '/src/assets/images/catalogs/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,svg,SVG}',
  { eager: true }
) as Record<string, { default: string }>;

export const resolveCatalogImage = (filename: string): string => {
  if (!filename) return filename;
  
  const key = `/src/assets/images/catalogs/${filename}`;
  const imageModule = catalogImageMap[key];
  
  return imageModule?.default ?? filename;
};
