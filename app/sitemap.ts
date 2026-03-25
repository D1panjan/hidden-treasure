import { MetadataRoute } from 'next'

/** Generates sitemap.xml for Google Search Console */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thehiddentreasure.in'
  
  // Define all static routes
  const routes = [
    '',
    '/about',
    '/rooms',
    '/experiences',
    '/gallery',
    '/getting-here',
    '/contact',
    '/booking',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
