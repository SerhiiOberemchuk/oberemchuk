// Read-only comparison: node --use-system-ca scripts/audit-html.mjs [local URL]
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {gzipSync} from 'node:zlib';

const local = process.argv[2] || 'http://localhost:3100';
const results = [];
for (const base of ['https://oberemchuk.online', local]) {
  for (const path of ['/', '/services', '/en', '/it', '/estimate', '/portfolio', '/robots.txt', '/sitemap.xml']) {
    const response = await fetch(base + path, {signal: AbortSignal.timeout(20000)});
    const html = await response.text();
    const result = {
      base, path, status: response.status, bytes: Buffer.byteLength(html), gzipBytes: gzipSync(html).length,
      title: html.match(/<title>(.*?)<\/title>/s)?.[1],
      h1: html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      canonical: html.match(/rel="canonical" href="([^"]+)/)?.[1],
      lang: html.match(/<html[^>]*lang="([^"]+)/)?.[1],
      alternateHeader: (response.headers.get('link') || '').split(',').filter(link => link.includes('hreflang')).join(','),
      sitemapUrls: path === '/sitemap.xml' ? (html.match(/<loc>/g) || []).length : undefined,
      robots: path === '/robots.txt' ? html : undefined,
      domElements: (html.match(/<[a-z][a-z0-9-]*(?:\s|>)/g) || []).length,
    };
    if (base === local) {
      assert.equal(response.status, 200, path);
      if (!path.endsWith('.txt') && !path.endsWith('.xml')) {
        assert.equal(result.alternateHeader, '', path + ' must not have conflicting middleware hreflang');
        assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path + ' must have one H1');
        assert.ok(result.canonical, path + ' must have a canonical');
        assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), path + ' must be indexable');
        assert.equal((html.match(/rel="alternate" hrefLang=/g) || []).length, 4, path + ' language alternates');
        assert.ok(!html.includes('MISSING_MESSAGE'), path + ' translations');
      }
    }
    results.push(result);
    console.log(JSON.stringify(result));
  }
}
// Root language must not vary with browser preferences or a stale locale cookie.
for (const language of ['en', 'it']) {
  const response = await fetch(local + '/', {headers: {'Accept-Language': language, Cookie: 'NEXT_LOCALE=' + language}, redirect: 'manual'});
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<html[^>]*lang="uk"/);
}
const missing = await fetch(local + '/services/this-service-does-not-exist');
const missingHtml = await missing.text();
// Next.js streams some not-found boundaries with HTTP 200 and a noindex tag.
assert.ok(missing.status === 404 || (missing.status === 200 && /<meta name="robots" content="[^"]*noindex/.test(missingHtml)));
fs.mkdirSync('docs/site-audit', {recursive: true});
fs.writeFileSync('docs/site-audit/html-results.json', JSON.stringify(results, null, 2) + '\n');
console.log('HTML, language routing, canonical, hreflang and 404 checks passed.');
