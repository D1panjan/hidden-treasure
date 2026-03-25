import { MetadataRoute } from 'next'

/** Generates robots.txt for Google Search Console */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://thehiddentreasure.in/sitemap.xml',
  }
}
