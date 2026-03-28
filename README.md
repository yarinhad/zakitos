# Zakitos — Shopify Hydrogen Storefront

Premium artisanal dried chili snack brand. DTC Shopify store built on Hydrogen 2024.4.3 (Remix SSR).

---

## Brand

- **Name:** Zakitos
- **Tagline:** Real Heat. Real Chili.
- **Aesthetic:** Obsidian Flame — near-black backgrounds, fire-red/orange/gold accents
- **Fonts:** Anton (display), DM Sans (body), Space Mono (numbers/mono)
- **Colors:** `#E8170B` red · `#FF5500` ember · `#FFB800` gold · `#0A0A0A` black

## Products

3 SKUs (pack sizes):

| Product | Handle | Price | Compare At |
|---|---|---|---|
| Zakitos 1-Pack | `1-pack` | $9 | — |
| Zakitos 5-Pack | `5-pack` | $38 | $45 (save 15%) |
| Zakitos 24-Pack | `24-pack` | $155 | $216 (save 28%) |

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Shopify Hydrogen 2024.4.3 |
| Router | Remix (SSR) |
| Runtime | Shopify Oxygen (Cloudflare Workers) |
| Styling | TailwindCSS + custom CSS variables |
| Build | Vite 5 |
| Dev server | `@shopify/mini-oxygen` **3.0.6** (pinned — 3.1+ requires Vite 6) |
| Language | TypeScript |

---

## Project Structure

```
app/
  routes/
    _index.tsx          # Homepage
    collections.$handle.tsx  # Collection pages (all, snacks)
    products.$handle.tsx     # Product detail page
    about.tsx           # About / Our Story
    cart.tsx            # Cart page
  components/
    Header.tsx          # Sticky header with nav + cart
    Footer.tsx          # Footer with email capture, social links
    HeroSection.tsx     # Full-screen video/image hero
    ProductCard.tsx     # Product grid card
    BundleSelector.tsx  # Pack size selector (homepage + PDP)
    HeatMeter.tsx       # 5-pip heat level indicator
    FlavorBadge.tsx     # Flavor tag badge
    UGCCarousel.tsx     # Social proof image wall
    SafeImage.tsx       # Routes local paths to <img>, CDN to Hydrogen <Image>
    StickyAddToCart.tsx # Mobile sticky ATC bar
    Layout.tsx          # Shell with Header + Footer
  lib/
    context.ts          # Shopify storefront + cart client setup
    fragments.ts        # Reusable GraphQL fragments
    utils.ts            # getHeatLevel, getMetafield, etc.
  styles/
    app.css             # Design system: CSS vars, animations, utilities
  root.tsx              # App shell, links, ErrorBoundary
  entry.server.tsx      # Oxygen SSR entry
server.ts               # Cloudflare Worker fetch handler
tailwind.config.js      # Brand tokens
vite.config.ts          # hydrogen.preset() + Remix
public/
  zakitos-logo.png              # Transparent header logo
  hero.mp4                      # Hero video (current brand video)
  hero-cinematic.mp4            # Cinematic product video (homepage section)
  zakitos-1-pack-package.png    # Product image
  zakitos-5-pack-package.png    # Product image
  zakitos-24-pack-package.png   # Product image
  social-1.jpg … social-7.jpg   # Social media / UGC images
  ecomm-*.png                   # Lifestyle / hero shots
```

---

## Key Architecture Decisions

### Mock data fallback
All Shopify storefront queries are wrapped in `.catch(() => null)` so the site renders with mock data when `.env` is not configured. Useful for local dev without credentials.

### SafeImage component
Hydrogen's `<Image>` component throws on non-HTTPS URLs (local `/public` paths). `SafeImage` detects local vs CDN URLs and routes accordingly.

### No Analytics.Provider
`Analytics.Provider` was removed from `root.tsx` — it requires a specific object shape from `getShopAnalytics()`, not a raw storefront query. Can be wired up properly once the store is live and the correct query is added.

### mini-oxygen pinned to 3.0.6
`@shopify/mini-oxygen` 3.1+ requires Vite 6, but Hydrogen 2024.4.3 needs Vite 5. Pinned in `package.json`.

---

## Local Development

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000` with mock data (no `.env` required).

To connect to real Shopify data, create `.env`:
```
PUBLIC_STORE_DOMAIN=zakitos.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=your_token
PRIVATE_STOREFRONT_API_TOKEN=your_private_token
PUBLIC_STOREFRONT_ID=your_id
SESSION_SECRET=your_secret
```

---

## Deployment

Deploy to Shopify Oxygen:
```bash
npx shopify hydrogen deploy
```

Authenticate with Shopify when prompted (browser flow). Select the production environment.

GitHub repo: `git@github.com:yarinhad/zakitos.git`

---

## Brand Assets

Source files at: `/Users/yarinhad/yarin/business/theyeda/zakitos/marketing/refs/`

---

## Contact & Socials

| Channel | Handle / URL |
|---|---|
| Email | support@zakitos.com |
| TikTok | [@zakitos_snacks](https://www.tiktok.com/@zakitos_snacks) |
| Instagram | [@zakitos_snacks](https://www.instagram.com/zakitos_snacks) |
| Facebook | [Zakitos](https://www.facebook.com/profile.php?id=61575473248993) |

---

## Sourcing Partner

**Magic Plant Farms** — capsicum specialists with farms across Asia, Africa, South America, and the Middle East. US base: Tri-Cities, TN. Supplies year-round whole dried chili peppers direct to Zakitos.
