const landingImageMap = import.meta.glob(
  '/src/assets/images/landing/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}',
  { eager: true }
) as Record<string, { default: string }>;

export const resolveLandingImage = (path: string): string => {
  if (!path) return path;
  
  // Si la ruta es del tipo "/images/landing/img-1.PNG", extraer solo el nombre
  const filename = path.split('/').pop() || path;
  
  const key = `/src/assets/images/landing/${filename}`;
  const imageModule = landingImageMap[key];
  
  return imageModule?.default ?? path;
};
