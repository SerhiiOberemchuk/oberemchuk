// Run against a production server: node scripts/check-i18n.mjs [base URL]
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const baseUrl = process.argv[2] ?? "http://localhost:3100";
const readMessages = (locale, namespace) => JSON.parse(
  readFileSync(new URL(`../messages/catalogs/${locale}/${namespace}.json`, import.meta.url), "utf8")
);
const visibleHtml = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

for (const locale of ["uk", "en", "it"]) {
  const prefix = locale === "uk" ? "" : `/${locale}`;
  for (const path of ["", "/services", "/portfolio", "/estimate", "/blog", "/solutions", "/services/landing-pages"]) {
    const url = `${baseUrl}${prefix}${path || (prefix ? "" : "/")}`;
    const response = await fetch(url);
    const html = await response.text();
    assert.equal(response.status, 200, url);
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`), url);
    assert.ok(!html.includes("MISSING_MESSAGE"), url);
    assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), url);
    assert.match(html, /rel="canonical"/, url);
    if (path === "") {
      const hero = readMessages(locale, "HomeHero");
      const body = visibleHtml(html);
      // Exercise server components that resolve translations implicitly via root params.
      assert.ok(body.includes(hero.manifesto.title), `${url}: implicit hero translations`);
      assert.ok(body.includes(readMessages(locale, "HomeServices").title), `${url}: implicit service translations`);
    }
    console.log(`PASS ${prefix}${path || "/"} (${locale})`);
  }

  const response = await fetch(`${baseUrl}${prefix}/services/nonexistent-i18n-check`);
  const html = await response.text();
  assert.ok([200, 404].includes(response.status), `${locale}: not-found must not return 500`);
  assert.match(html, /<meta name="robots" content="[^"]*noindex/, `${locale}: not-found noindex`);
  assert.ok(visibleHtml(html).includes(readMessages(locale, "NotFoundPage").title), `${locale}: localized not-found`);
}

// These paths bypass the locale proxy; invalid root params must still render 404 UI.
for (const path of ["/unknown-locale.test", "/unknown-locale.test/services"]) {
  const response = await fetch(baseUrl + path);
  const html = await response.text();
  assert.ok([200, 404].includes(response.status), path);
  assert.match(html, /<meta name="robots" content="[^"]*noindex/, path);
}
console.log("All 26 locale and not-found checks passed.");
