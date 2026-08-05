# RNTX - Revenant XSpark Website Demo

This repository contains an AI-built concept website for Revenant XSpark, an Indian esports organization formed from the Revenant Esports and Team XSpark collaboration.

Live demo: https://revenant-xspark.pranay-ai.chatgpt.site

## About

The website was created as a high-end, immersive esports demo with multi-page navigation, 3D-style motion, premium visual treatment, merchandise sections, team lineups, achievements, event pages, founder/creator sections, and source-backed organization details.

This is not an official Revenant XSpark repository. It is a fan/prototype/demo project built with AI assistance to showcase what a polished technical and creative web experience for the organization could look like.

## Key Features

- Multi-page website for home, teams, achievements, events, story, founders/creators, player profiles, and shop.
- Revenant XSpark themed visual system based on the purple and gold brand palette.
- Immersive animation direction with scroll-driven scenes, motion layers, cinematic transitions, and premium esports styling.
- Source-backed team and achievement data reviewed against Liquipedia.
- Merchandise showcase using Naruto-collaboration themed product visuals where relevant.
- Responsive layout verified across desktop and mobile sizes.

## Data Sources

Research was primarily compiled from Liquipedia pages for Revenant XSpark across BGMI/PUBG Mobile, VALORANT, Brawl Stars, Pokemon UNITE, Free Fire, Honor of Kings, and Mobile Legends.

The research pack is included under:

- `research/revenant-xspark-research.md`
- `data/`
- `assets/images/image-manifest.csv`

Unsupported or unverified claims were intentionally removed from the website during the final data audit.

## Project Structure

- `site/` - main website application
- `site/app/` - pages, components, and structured content
- `site/public/assets/` - website visual assets
- `research/` - research notes and source-backed findings
- `data/` - CSV snapshots used during research
- `assets/` - external image manifest and research assets
- `video/` - scripts used for website showcase video rendering

Generated dependency folders, temporary renders, build output, and frame dumps are excluded from Git.

## Running Locally

```bash
cd site
npm install
npm run dev
```

Build check:

```bash
cd site
npm run build
```

## Disclosure

This website and repository were made with AI assistance. Human direction, review, and source verification were used to shape the final content and correct the data.

All trademarks, team names, player names, logos, and referenced game/IP assets belong to their respective owners. This project is a demonstration and is not affiliated with or endorsed by Revenant XSpark, Revenant Esports, Team XSpark, Naruto, or any related rights holders.
