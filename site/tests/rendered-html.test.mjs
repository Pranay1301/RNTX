import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Revenant XSpark experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Revenant XSpark — One Wolven Spark<\/title>/i);
  assert.match(html, /<em>ONE<\/em><br\/>WOLVEN<br\/><i>SPARK\.<\/i>/);
  assert.match(html, /rntx-crest-2026\.webp/);
  assert.match(html, /href="\/teams"/);
  assert.match(html, /href="\/events"/);
  assert.match(html, /href="\/achievements"/);
  assert.match(html, /href="\/story"/);
  assert.match(html, /href="\/creators"/);
  assert.match(html, /href="\/shop"/);
  assert.match(html, /naruto-hero\.webp/);
});

test("publishes the complete route and media structure", async () => {
  const routes = [
    "../app/teams/page.tsx",
    "../app/teams/[slug]/page.tsx",
    "../app/events/page.tsx",
    "../app/achievements/page.tsx",
    "../app/story/page.tsx",
    "../app/creators/page.tsx",
    "../app/shop/page.tsx",
    "../app/players/[handle]/page.tsx",
    "../app/not-found.tsx",
    "../app/sitemap.ts",
    "../app/robots.ts",
  ];

  await Promise.all(routes.map((path) => access(new URL(path, import.meta.url))));
  await Promise.all([
    access(new URL("../public/assets/rntx-crest-2026.webp", import.meta.url)),
    access(new URL("../public/assets/people/tracegod.jpg", import.meta.url)),
    access(new URL("../public/assets/people/ninjajod.png", import.meta.url)),
    access(new URL("../public/assets/people/pain09.jpg", import.meta.url)),
    access(new URL("../public/assets/people/proton.jpg", import.meta.url)),
    access(new URL("../public/assets/people/sukuna.jpg", import.meta.url)),
  ]);

  const data = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");
  for (const handle of ["TRACEGOD", "NINJAJOD", "PAIN09", "PROTON", "SUKUNA"]) {
    assert.match(data, new RegExp(handle));
  }
  for (const playerSlug of ["tracegod", "ninjajod", "pain09", "proton", "sukuna"]) {
    assert.match(data, new RegExp(`slug: "${playerSlug}"`));
  }
  for (const slug of ["bgmi", "valorant", "brawl-stars", "pokemon-unite", "free-fire-max", "honor-of-kings"]) {
    assert.match(data, new RegExp(`slug: "${slug}"`));
  }
});

test("server-renders the new events and player dossier routes", async () => {
  const eventsResponse = await render("/events");
  assert.equal(eventsResponse.status, 200);
  const eventsHtml = await eventsResponse.text();
  assert.match(eventsHtml, /<title>Events &amp; Matches \| Revenant XSpark<\/title>/i);
  assert.match(eventsHtml, /NEXT HUNT\./);
  assert.match(eventsHtml, /CHALLENGERS FINALS/i);
  assert.match(eventsHtml, /HONOR OF KINGS WORLD CUP/i);

  const playerResponse = await render("/players/ninjajod");
  assert.equal(playerResponse.status, 200);
  const playerHtml = await playerResponse.text();
  assert.match(playerHtml, /<title>NINJAJOD — BGMI Player \| Revenant XSpark<\/title>/i);
  assert.match(playerHtml, /SHUBHAM RANJAN SAHOO/i);
  assert.match(playerHtml, /ninjajod\.png/);
});
