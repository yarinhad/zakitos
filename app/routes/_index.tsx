import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {HeroSection} from '~/components/HeroSection';
import {ProductCard, ProductCardSkeleton} from '~/components/ProductCard';
import {UGCCarousel} from '~/components/UGCCarousel';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

export function meta() {
  return [
    {title: 'Zakitos — Real Heat. Real Chili.'},
    {
      name: 'description',
      content:
        'Premium artisanal dried chili snack strips. Bold flavors, real ingredients, maximum heat. Free shipping over $35.',
    },
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // Wrap in try/catch so the page renders with mock data when no API credentials are set
  const featuredProductsRaw = storefront
    .query(FEATURED_PRODUCTS_QUERY)
    .catch(() => ({products: {nodes: MOCK_PRODUCTS}}));

  // Mark all products out of stock
  const featuredProducts = featuredProductsRaw.then((data: any) => ({
    products: {
      nodes: data.products.nodes.map((p: any) => ({
        ...p,
        availableForSale: false,
        variants: p.variants
          ? {nodes: p.variants.nodes.map((v: any) => ({...v, availableForSale: false}))}
          : p.variants,
      })),
    },
  }));

  const collections = storefront
    .query(FEATURED_COLLECTIONS_QUERY)
    .catch(() => ({collections: {nodes: []}}));

  return defer({featuredProducts, collections});
}

export default function Homepage() {
  const {featuredProducts, collections} = useLoaderData<typeof loader>();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <HeroSection videoSrc="/hero.mp4" />

      {/* ── Marquee Band ─────────────────────────────────────── */}
      <MarqueeBand />

      {/* ── Featured Product ─────────────────────────────────── */}
      <section className="py-20 bg-zakitos-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-2">
              The Product
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide leading-none">
              ONE SNACK.
              <br />
              <span className="text-gradient-fire">ENDLESS HEAT.</span>
            </h2>
          </div>

          <Suspense fallback={<ProductCardSkeleton />}>
            <Await resolve={featuredProducts}>
              {({products}) => {
                const product = products?.nodes?.[0] ?? MOCK_PRODUCTS[0];
                return (
                  <div className="max-w-sm mx-auto">
                    <ProductCard product={product} loading="eager" />
                  </div>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </section>

      {/* ── Brand Story Teaser ────────────────────────────────── */}
      <BrandStoryTeaser />

      {/* ── UGC Wall ─────────────────────────────────────────── */}
      <UGCCarousel />

      {/* ── Cinematic Video 1 ────────────────────────────────── */}
      <CinematicVideoSection src="/hero-cinematic.mp4" headline="BOLD BY" highlight="NATURE." tag="The Craft" />

      {/* ── Cinematic Video 2 ────────────────────────────────── */}
      <CinematicVideoSection src="/hero-cinematic2.mp4" headline="NO" highlight="SHORTCUTS." tag="The Standard" />

      {/* ── Trust Strip ──────────────────────────────────────── */}
      <TrustStrip />

      {/* ── Flavor Quiz CTA ──────────────────────────────────── */}
      <FlavorQuizCTA />
    </>
  );
}

/* ─── Marquee Band ────────────────────────────────────────────────── */
function MarqueeBand() {
  const items = [
    'REAL HEAT',
    'REAL CHILI',
    'NO SHORTCUTS',
    'ARTISAN CRAFTED',
    'BOLD BY NATURE',
    'CLEAN INGREDIENTS',
    'MAXIMUM FLAVOR',
    '5 HEAT LEVELS',
  ];
  const repeated = [...items, ...items]; // duplicate for seamless loop

  return (
    <div className="marquee-container bg-zakitos-red py-3 border-y border-zakitos-red/30 overflow-hidden">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="marquee-item font-display text-sm tracking-widest uppercase text-white px-6 flex items-center gap-6"
          >
            {item}
            <span className="text-white/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HeatScaleSection() {
  return (
    <section className="py-24 bg-zakitos-black noise-overlay relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20rem] text-zakitos-red/5 pointer-events-none select-none leading-none tracking-tight">
        X
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-4">
          One Product. Every Size.
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-zakitos-cream tracking-wide leading-none mb-6">
          CRUNCH CHAOS
          <br />
          <span className="text-gradient-fire">YOUR WAY.</span>
        </h2>
        <p className="text-zakitos-muted max-w-md mx-auto mb-10">
          One bag to try it. Five to commit. Twenty to go full Zakitos.
          Choose your quantity on the product page.
        </p>
        <Link
          to="/products/zakitos"
          className="btn-fire text-base px-10 py-4"
          prefetch="intent"
        >
          Shop Crunch Chaos →
        </Link>
      </div>
    </section>
  );
}

/* ─── Brand Story Teaser ──────────────────────────────────────────── */
function BrandStoryTeaser() {
  return (
    <section
      className="py-0 relative overflow-hidden"
      style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)'}}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 min-h-[480px]">
          {/* Image side */}
          <div className="relative min-h-[320px] md:min-h-auto overflow-hidden">
            <img
              src="/ecomm-detail-lifestyle-closeup.png"
              alt="Zakitos Chili Close-Up"
              className="img-fill object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zakitos-dark md:to-zakitos-dark" />
          </div>

          {/* Text side */}
          <div className="flex flex-col justify-center px-8 md:px-12 py-14">
            <p className="font-mono text-zakitos-red text-xs tracking-widest uppercase mb-4">
              The Story
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-none mb-6">
              THE CHILI
              <br />
              <span className="text-gradient-fire">IS THE SNACK.</span>
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-8 max-w-sm">
              No chips. No powder. No filler. Just whole dried chili strips,
              sourced and seasoned with the boldness you deserve.
              Every bag is a deliberate act of flavor engineering.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                'Whole dried chili strips — the real thing',
                'Clean label — no artificial shortcuts',
                'Farm-traced chili sourcing',
                '5-tier heat scale, built for discovery',
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-zakitos-red/10 border border-zakitos-red/30 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#E8170B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/85 text-sm">{text}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-outline-fire self-start" prefetch="intent">
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Strip ─────────────────────────────────────────────────── */
const TRUST_ICONS = {
  shipping: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  returns: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
    </svg>
  ),
  clean: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  heat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
};

function TrustStrip() {
  const items = [
    {icon: TRUST_ICONS.shipping, title: 'Free Shipping', sub: 'On orders over $35'},
    {icon: TRUST_ICONS.returns,  title: '30-Day Returns', sub: 'No questions asked'},
    {icon: TRUST_ICONS.clean,    title: 'Clean Ingredients', sub: 'No artificial anything'},
    {icon: TRUST_ICONS.heat,     title: 'Real Heat', sub: 'Farm-sourced whole chilies'},
  ];

  return (
    <div className="bg-zakitos-card border-y border-zakitos-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-zakitos-border">
          {items.map(({icon, title, sub}) => (
            <div key={title} className="flex flex-col md:flex-row items-center md:justify-center gap-3 text-center md:text-left md:px-6">
              <div className="text-zakitos-red flex-shrink-0">{icon}</div>
              <div>
                <p className="font-display text-base text-zakitos-cream tracking-wide">{title}</p>
                <p className="text-zakitos-muted text-xs mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Flavor Quiz CTA ─────────────────────────────────────────────── */
function FlavorQuizCTA() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #7A0A05 0%, #B80F08 50%, #E8170B 100%)',
      }}
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[25vw] text-black/10 leading-none whitespace-nowrap">
          BOLD
        </span>
      </div>

      <div className="relative z-10 text-center px-4">
        <h2 className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none mb-4">
          NOT SURE WHERE
          <br />
          TO START?
        </h2>
        <p className="text-white/80 text-lg max-w-md mx-auto mb-8">
          Take the 60-second flavor quiz and we'll match you to your perfect heat level.
        </p>
        <Link
          to="/pages/flavor-quiz"
          className="inline-flex items-center gap-2 bg-white text-zakitos-cream font-display text-xl px-10 py-4 tracking-wide uppercase rounded-xl hover:bg-zakitos-dark transition-colors"
          prefetch="intent"
        >
          Find My Heat Level
          <span>→</span>
        </Link>
        <p className="text-white/60 text-xs mt-4 font-mono">
          Takes 60 seconds · No sign-up required
        </p>
      </div>
    </section>
  );
}

/* ─── Cinematic Video Section ─────────────────────────────────────── */
function CinematicVideoSection({
  src,
  headline,
  highlight,
  tag,
}: {
  src: string;
  headline: string;
  highlight: string;
  tag: string;
}) {
  return (
    <section className="relative bg-zakitos-black overflow-hidden">
      <div className="relative w-full aspect-video max-h-[85vh]">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zakitos-black via-transparent to-zakitos-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-zakitos-black/30 via-transparent to-zakitos-black/30 pointer-events-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-3">
            {tag}
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-zakitos-cream tracking-wide leading-none drop-shadow-2xl">
            {headline}
            <br />
            <span className="text-gradient-fire">{highlight}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

/* ─── Queries ─────────────────────────────────────────────────────── */
const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

const FEATURED_COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 4) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

/* ─── Mock data fallback (dev without Shopify) ────────────────────── */
const MOCK_PRODUCTS = [
  {
    id: 'gid://shopify/Product/1',
    title: 'Crunch Chaos',
    handle: 'zakitos',
    tags: ['snacks', 'bestseller'],
    availableForSale: false,
    priceRange: {
      minVariantPrice: {amount: '9.00', currencyCode: 'USD'},
      maxVariantPrice: {amount: '155.00', currencyCode: 'USD'},
    },
    images: {
      nodes: [
        {id: '1', url: '/zakitos-1-pack-package.png', altText: 'Zakitos Crunch Chaos', width: 800, height: 800},
      ],
    },
    variants: {
      nodes: [
        {
          id: 'gid://shopify/ProductVariant/1',
          title: '1-Pack',
          availableForSale: false,
          price: {amount: '9.00', currencyCode: 'USD'},
          compareAtPrice: null,
          selectedOptions: [{name: 'Pack Size', value: '1-Pack'}],
        },
      ],
    },
  },
];
