import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Money} from '@shopify/hydrogen';
import {SafeImage} from '~/components/SafeImage';
import {HeroSection} from '~/components/HeroSection';
import {ProductCard, ProductCardSkeleton} from '~/components/ProductCard';
import {UGCCarousel} from '~/components/UGCCarousel';
import {BundleSelector} from '~/components/BundleSelector';
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

      {/* ── Featured Products ────────────────────────────────── */}
      <section className="py-20 bg-zakitos-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-2">
                The Lineup
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide leading-none">
                CHOOSE YOUR
                <br />
                <span className="text-gradient-fire">HEAT LEVEL</span>
              </h2>
            </div>
            <Link
              to="/collections/all"
              className="hidden md:flex items-center gap-2 text-zakitos-muted hover:text-zakitos-cream transition-colors font-mono text-sm"
              prefetch="intent"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({length: 4}).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <Await resolve={featuredProducts}>
              {({products}) => (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(products?.nodes ?? MOCK_PRODUCTS).map((product: any, i: number) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>

          <div className="text-center mt-8 md:hidden">
            <Link to="/collections/all" className="btn-outline-fire" prefetch="intent">
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Heat Scale Explorer ───────────────────────────────── */}
      <HeatScaleSection />

      {/* ── Brand Story Teaser ────────────────────────────────── */}
      <BrandStoryTeaser />

      {/* ── UGC Wall ─────────────────────────────────────────── */}
      <UGCCarousel />

      {/* ── Cinematic Video 1 ────────────────────────────────── */}
      <CinematicVideoSection src="/hero-cinematic.mp4" headline="BOLD BY" highlight="NATURE." tag="The Craft" />

      {/* ── Cinematic Video 2 ────────────────────────────────── */}
      <CinematicVideoSection src="/hero-cinematic2.mp4" headline="NO" highlight="SHORTCUTS." tag="The Standard" />

      {/* ── Bundles ──────────────────────────────────────────── */}
      <BundleSelector />

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

/* ─── Pack Options ────────────────────────────────────────────────── */
const PACK_OPTIONS = [
  {
    handle: '1-pack',
    title: '1-Pack',
    tagline: 'Try it out.',
    description: 'One bag of bold dried chili strips. The first hit is free.',
    emoji: '🌶',
    color: '#FFB800',
    price: '$9',
    savings: null,
    badge: null,
    image: '/zakitos-1-pack-package.png',
  },
  {
    handle: '5-pack',
    title: '5-Pack',
    tagline: 'Stock up.',
    description: 'Five bags. Enough to share — or not. Save 15% vs buying singles.',
    emoji: '🔥',
    color: '#FF5500',
    price: '$38',
    savings: 'Save 15%',
    badge: 'Most Popular',
    image: '/zakitos-5-pack-package.png',
  },
  {
    handle: '24-pack',
    title: '24-Pack',
    tagline: 'Go all in.',
    description: 'The full arsenal. Bulk pricing. Over a month of daily heat.',
    emoji: '💀',
    color: '#E8170B',
    price: '$155',
    savings: 'Save 28%',
    badge: 'Best Value',
    image: '/zakitos-24-pack-package.png',
  },
];

function HeatScaleSection() {
  return (
    <section className="py-24 bg-zakitos-black noise-overlay relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-display text-zakitos-red/5 pointer-events-none select-none leading-none">
        🌶
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-2">
            Choose Your Pack
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-zakitos-cream tracking-wide leading-none">
            HOW MUCH
            <br />
            <span className="text-gradient-fire">HEAT DO YOU NEED?</span>
          </h2>
          <p className="text-zakitos-muted mt-4 max-w-md mx-auto">
            One bag to start, five to commit, twenty-four to go full Zakitos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PACK_OPTIONS.map((pack) => (
            <Link
              key={pack.handle}
              to={`/products/${pack.handle}`}
              prefetch="intent"
              className="group card-dark p-6 text-left hover:border-zakitos-red/60 transition-all duration-300 relative"
            >
              {pack.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge-fire text-xs px-3 py-1 whitespace-nowrap">
                    {pack.badge}
                  </span>
                </div>
              )}

              <div className="aspect-square bg-zakitos-dark mb-5 overflow-hidden flex items-center justify-center">
                <img
                  src={pack.image}
                  alt={pack.title}
                  className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-3xl text-zakitos-cream tracking-wide">
                    {pack.title}
                  </h3>
                  <p className="text-zakitos-warm text-sm mt-0.5 italic">{pack.tagline}</p>
                </div>
                <span className="text-3xl">{pack.emoji}</span>
              </div>

              <p className="text-zakitos-muted text-sm leading-relaxed mb-4">
                {pack.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="font-mono text-xl text-zakitos-cream">{pack.price}</span>
                  {pack.savings && (
                    <span className="ml-2 text-xs font-mono text-zakitos-ember">{pack.savings}</span>
                  )}
                </div>
                <span
                  className="font-display text-sm tracking-wide group-hover:underline"
                  style={{color: pack.color}}
                >
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
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
            <h2 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide leading-none mb-6">
              THE CHILI
              <br />
              <span className="text-gradient-fire">IS THE SNACK.</span>
            </h2>
            <p className="text-zakitos-muted text-base leading-relaxed mb-8 max-w-sm">
              No chips. No powder. No filler. Just whole dried chili strips,
              sourced and seasoned with the boldness you deserve.
              Every bag is a deliberate act of flavor engineering.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                {icon: '🌶', text: 'Whole dried chili strips — the real thing'},
                {icon: '✓', text: 'Clean label — no artificial shortcuts'},
                {icon: '🌍', text: 'Farm-traced chili sourcing'},
                {icon: '🔥', text: '5-tier heat scale, built for discovery'},
              ].map(({icon, text}) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="text-lg w-6 flex-shrink-0">{icon}</span>
                  <span className="text-zakitos-warm text-sm">{text}</span>
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
function TrustStrip() {
  const items = [
    {icon: '🚚', title: 'Free Shipping', sub: 'On orders over $35'},
    {icon: '🔄', title: '30-Day Returns', sub: 'No questions asked'},
    {icon: '🌿', title: 'Clean Ingredients', sub: 'No artificial anything'},
    {icon: '🔥', title: 'Real Heat', sub: 'Farm-sourced whole chilies'},
  ];

  return (
    <div className="bg-zakitos-card border-y border-zakitos-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-zakitos-border">
          {items.map(({icon, title, sub}) => (
            <div key={title} className="flex flex-col md:flex-row items-center md:justify-center gap-3 text-center md:text-left md:px-6">
              <span className="text-3xl">{icon}</span>
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
        background: 'linear-gradient(135deg, #E8170B 0%, #FF5500 50%, #FFB800 100%)',
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
          className="inline-flex items-center gap-2 bg-white text-zakitos-black font-display text-xl px-10 py-4 tracking-wide uppercase hover:bg-zakitos-cream transition-colors"
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
    title: 'Zakitos 1-Pack',
    handle: '1-pack',
    tags: ['snacks', 'bestseller'],
    availableForSale: false,
    priceRange: {
      minVariantPrice: {amount: '9.00', currencyCode: 'USD'},
      maxVariantPrice: {amount: '9.00', currencyCode: 'USD'},
    },
    images: {
      nodes: [
        {id: '1', url: '/zakitos-1-pack-package.png', altText: 'Zakitos 1-Pack', width: 800, height: 800},
        {id: '2', url: '/ecomm-hero-shot-one-package.png', altText: 'Zakitos 1-Pack Lifestyle', width: 800, height: 800},
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
  {
    id: 'gid://shopify/Product/2',
    title: 'Zakitos 5-Pack',
    handle: '5-pack',
    tags: ['snacks', 'bestseller'],
    availableForSale: false,
    priceRange: {
      minVariantPrice: {amount: '38.00', currencyCode: 'USD'},
      maxVariantPrice: {amount: '38.00', currencyCode: 'USD'},
    },
    images: {
      nodes: [
        {id: '3', url: '/zakitos-5-pack-package.png', altText: 'Zakitos 5-Pack', width: 800, height: 800},
        {id: '4', url: '/ecomm-hero-shot-all packages.png', altText: 'Zakitos 5-Pack Lifestyle', width: 800, height: 800},
      ],
    },
    variants: {
      nodes: [
        {
          id: 'gid://shopify/ProductVariant/2',
          title: '5-Pack',
          availableForSale: false,
          price: {amount: '38.00', currencyCode: 'USD'},
          compareAtPrice: {amount: '45.00', currencyCode: 'USD'},
          selectedOptions: [{name: 'Pack Size', value: '5-Pack'}],
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'Zakitos 24-Pack',
    handle: '24-pack',
    tags: ['snacks', 'bulk'],
    availableForSale: false,
    priceRange: {
      minVariantPrice: {amount: '155.00', currencyCode: 'USD'},
      maxVariantPrice: {amount: '155.00', currencyCode: 'USD'},
    },
    images: {
      nodes: [
        {id: '5', url: '/zakitos-24-pack-package.png', altText: 'Zakitos 24-Pack', width: 800, height: 800},
        {id: '6', url: '/ecomm-hero-shot-all packages.png', altText: 'Zakitos 24-Pack Lifestyle', width: 800, height: 800},
      ],
    },
    variants: {
      nodes: [
        {
          id: 'gid://shopify/ProductVariant/3',
          title: '24-Pack',
          availableForSale: false,
          price: {amount: '155.00', currencyCode: 'USD'},
          compareAtPrice: {amount: '216.00', currencyCode: 'USD'},
          selectedOptions: [{name: 'Pack Size', value: '24-Pack'}],
        },
      ],
    },
  },
];
