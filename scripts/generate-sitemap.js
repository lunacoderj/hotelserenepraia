import fs from 'fs';
import path from 'path';

// Define the static routes
const staticRoutes = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/rooms', priority: 0.9, changefreq: 'weekly' },
  { url: '/banquet', priority: 0.8, changefreq: 'weekly' },
  { url: '/restaurant', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/about', priority: 0.6, changefreq: 'monthly' },
  { url: '/gallery', priority: 0.6, changefreq: 'monthly' },
  { url: '/attractions', priority: 0.7, changefreq: 'weekly' },
  { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { url: '/terms', priority: 0.3, changefreq: 'yearly' },
];

const rooms = [
  'deluxe-room',
  'premium-room',
  'executive-room',
  'suite-room'
];

const locations = [
  'hotel-near-rushikonda-beach',
  'hotel-near-rk-beach',
  'hotel-near-kailasagiri',
  'hotel-near-simhachalam-temple',
  'hotel-near-vizag-airport',
  'hotel-near-gitam-university',
  'hotel-near-andhra-university',
  'hotel-near-it-sez',
  'hotel-near-bheemili-beach',
  'hotel-near-ins-kurusura',
  'hotel-near-tenneti-park',
  'hotel-near-thotlakonda'
];

const guides = [
  'things-to-do-in-vizag',
  'weekend-trip-vizag',
  'scuba-diving-vizag'
];

const SITE_URL = 'https://hotelserenepraia.in';

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `  <url>\n    <loc>${SITE_URL}${route.url}</loc>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
  });

  // Add rooms
  rooms.forEach(room => {
    xml += `  <url>\n    <loc>${SITE_URL}/rooms/${room}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Add locations
  locations.forEach(location => {
    xml += `  <url>\n    <loc>${SITE_URL}/nearby/${location}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Add guides
  guides.forEach(guide => {
    xml += `  <url>\n    <loc>${SITE_URL}/guide/${guide}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += '</urlset>\n';

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Generated sitemap at ${sitemapPath} with ${staticRoutes.length + rooms.length + locations.length + guides.length} URLs.`);
}

generateSitemap();
