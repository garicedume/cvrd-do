import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.tucvhoy.com';

  // 1. Páginas estáticas principales de la plataforma
  const staticPages = [
    '',
    '/templates', 
    '/features',   
    '/pricing',    
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Páginas/Plantillas dinámicas (Ejemplo: tus plantillas de CV)
  // Aquí puedes reemplazar este array simulado con una llamada a tu base de datos o API (ej. await db.templates.findMany())
  const templates = [
    'executive',
    'modern',
    'minimalist',
    'professional',
    'creative',
  ];

  const dynamicTemplates = templates.map((slug) => ({
    url: `${baseUrl}/templates/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9, // Alta prioridad porque aquí es donde los usuarios eligen y crean
  }));

  // Combinamos ambas listas en un solo sitemap
  return [...staticPages, ...dynamicTemplates];
}