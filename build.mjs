import fs from 'node:fs';
import path from 'node:path';

// Build the public static website without copying server secrets or Netlify functions.
const dist = 'dist';
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
const publicFiles = ['index.html', 'style.css', 'app.js', 'manifest.webmanifest', 'sw.js', 'icon.svg', 'icon-192.png', 'icon-512.png', 'robots.txt', 'sitemap.xml', '_headers'];
for (const name of publicFiles) {
  if (fs.existsSync(name) && fs.statSync(name).isFile()) {
    fs.copyFileSync(name, path.join(dist, name));
  }
}
if (!fs.existsSync(path.join(dist, 'index.html'))) throw new Error('Missing website entry point');
console.log('Prepared static site for Cloudflare Pages in dist/');
