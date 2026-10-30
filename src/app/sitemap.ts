import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tucvhoy.com';

  // Páginas principales estáticas de la plataforma
  const staticPages = [
    '',
    '/templates', // O la ruta donde muestras las plantillas
    '/features',   // Si tienes sección de características
    '/pricing',    // Si aplica
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Aquí más adelante puedes agregar dinámicamente tus plantillas si vienen de una base de datos o array
  // const templates = [...]

  return [...staticPages];
}