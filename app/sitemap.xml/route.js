// we can't use the normal next.js sitemap generation due to the `output: 'export'` setting

import { getPromessasData } from '@/lib/promessas';

function urlForPromessa(promessa) {
  return `https://ogovernojacumpriu.pt/${promessa.data.sectionSlug}/${promessa.fileId}`;
}

async function getSitemap() {
  const map = getPromessasData().map(promessa => ({
    url: urlForPromessa(promessa),
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${map
      .map(
        (item) => `
            <url>
              <loc>${item.url}</loc>
              <lastmod>${item.lastModified.toISOString()}</lastmod>
              <changefreq>${item.changeFrequency}</changefreq>
              <priority>${item.priority}</priority>
            </url>
          `,
      )
      .join('')}
    </urlset>
  `;
}

export async function GET() {
  return new Response(await getSitemap(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}