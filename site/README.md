# RNTX Website App

This folder contains the deployable AI-built Revenant XSpark website demo.

Live demo: https://revenant-xspark.pranay-ai.chatgpt.site

The app is a multi-page esports website concept with immersive motion, team pages, player profiles, achievements, events, story, founders/creators, and shop sections. Content was reviewed against Liquipedia during the final audit, and unsupported claims were removed.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## App Structure

- `app/` - routes, pages, components, and content data
- `public/assets/` - images and brand assets used by the site
- `.openai/hosting.json` - Sites hosting configuration
- `tests/` - rendered HTML smoke test

## Disclosure

This is a prototype/demo project made with AI assistance. It is not an official Revenant XSpark website or repository.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
