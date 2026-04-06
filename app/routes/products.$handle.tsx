import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Link,
  useFetcher,
} from '@remix-run/react';
import {Money, VariantSelector, getSelectedProductOptions} from '@shopify/hydrogen';
import {SafeImage} from '~/components/SafeImage';
import {useState, useEffect} from 'react';
import {HeatMeter} from '~/components/HeatMeter';
import {FlavorBadge} from '~/components/FlavorBadge';
import {StickyAddToCart} from '~/components/StickyAddToCart';
import {PRODUCT_FRAGMENT} from '~/lib/fragments';
import {getHeatLevel, getMetafield, getShuRange, truncate} from '~/lib/utils';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) throw new Response('Not Found', {status: 404});

  // All old pack handles redirect to the unified product page
  if (['1-pack', '5-pack', '24-pack', '20-pack'].includes(handle)) {
    return redirect('/products/zakitos', {status: 301});
  }

  const selectedOptions = getSelectedProductOptions(request);

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product) throw new Response('Product Not Found', {status: 404});

  // All products are currently out of stock
  const productOutOfStock = {
    ...product,
    availableForSale: false,
    variants: {
      ...product.variants,
      nodes: product.variants.nodes.map((v: any) => ({...v, availableForSale: false})),
    },
  };

  return json({product: productOutOfStock});
}

export function meta({data}: {data: any}) {
  const p = data?.product;
  return [
    {title: `${p?.seo?.title ?? p?.title ?? 'Product'} | Zakitos`},
    {name: 'description', content: p?.seo?.description ?? p?.description ?? ''},
    {property: 'og:title', content: p?.title},
    {property: 'og:image', content: p?.images?.nodes?.[0]?.url},
  ];
}

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.nodes[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const fetcher = useFetcher();
  const isAdding = fetcher.state !== 'idle';

  const heatLevel = getHeatLevel(product.tags, product.metafields);
  const flavorNotes = getMetafield(product.metafields, 'zakitos', 'flavor_notes');
  const shuRating = getMetafield(product.metafields, 'zakitos', 'shu_rating');
  const chiliType = getMetafield(product.metafields, 'zakitos', 'chili_type');
  const origin = getMetafield(product.metafields, 'zakitos', 'origin');
  const images = product.images.nodes;

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      setAddedToCart(true);
      const timeout = setTimeout(() => setAddedToCart(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [fetcher.state, fetcher.data]);

  // Tag-derived flavor types
  const flavorTags = product.tags.filter((t: string) =>
    ['classic', 'garlic', 'reaper', 'lime', 'smoky', 'sweet', 'habanero'].some((f) =>
      t.toLowerCase().includes(f),
    ),
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-zakitos-muted font-mono text-xs">
          <Link to="/" className="hover:text-zakitos-cream transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections/all" className="hover:text-zakitos-cream transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-zakitos-cream">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* ── Image Gallery ──────────────────────────────────── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="aspect-square bg-zakitos-card relative overflow-hidden">
              {images[activeImage] && (
                <SafeImage
                  data={images[activeImage]}
                  loading="eager"
                  className="w-full h-full object-contain p-6 transition-opacity duration-300"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              )}
              {/* Heat level overlay */}
              <div className="absolute top-4 left-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                  style={{
                    borderColor: getHeatColor(heatLevel),
                    backgroundColor: `${getHeatColor(heatLevel)}22`,
                  }}
                >
                  <span className="font-mono text-xs font-bold" style={{color: getHeatColor(heatLevel)}}>
                    {heatLevel}/5
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((image: any, i: number) => (
                  <button
                    key={image.id ?? i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-16 h-16 border-2 transition-all overflow-hidden ${
                      activeImage === i
                        ? 'border-zakitos-red'
                        : 'border-zakitos-border hover:border-zakitos-muted'
                    }`}
                  >
                    <SafeImage
                      data={image}
                      loading="lazy"
                      className="w-full h-full object-contain p-1"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Details ────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {flavorTags.map((tag: string) => (
                <FlavorBadge key={tag} flavor={tag} />
              ))}
              {!product.availableForSale && (
                <span className="badge-dark">Sold Out</span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide leading-none mb-4">
              {product.title.toUpperCase()}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-3xl text-zakitos-cream">
                <Money data={selectedVariant?.price ?? product.priceRange.minVariantPrice} />
              </span>
              {selectedVariant?.compareAtPrice && (
                <span className="font-mono text-lg text-zakitos-muted line-through">
                  <Money data={selectedVariant.compareAtPrice} />
                </span>
              )}
              {isSubscription && (
                <span className="badge-fire text-xs">–15% with sub</span>
              )}
            </div>

            {/* Heat Meter */}
            <div className="bg-zakitos-card border border-zakitos-border p-4 mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs tracking-widest uppercase text-zakitos-muted">
                  Heat Level
                </span>
                <span className="font-mono text-xs text-zakitos-muted">
                  {shuRating ?? getShuRange(heatLevel)}
                </span>
              </div>
              <HeatMeter level={heatLevel} showLabel size="lg" showShu />
            </div>

            {/* Flavor description */}
            {flavorNotes && (
              <p className="text-zakitos-warm text-base italic leading-relaxed mb-5 border-l-2 border-zakitos-ember pl-4">
                "{flavorNotes}"
              </p>
            )}

            {/* Description */}
            <div
              className="text-zakitos-muted text-sm leading-relaxed mb-6 prose-sm"
              dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
            />

            {/* Subscribe toggle */}
            <div className="sub-toggle mb-4">
              <button
                className={`sub-toggle-btn ${!isSubscription ? 'active' : ''}`}
                onClick={() => setIsSubscription(false)}
              >
                One-time
              </button>
              <button
                className={`sub-toggle-btn ${isSubscription ? 'active' : ''}`}
                onClick={() => setIsSubscription(true)}
              >
                Subscribe & Save 15%
              </button>
            </div>

            {/* Variant selector */}
            <VariantSelector
              handle={product.handle}
              options={product.options}
              variants={product.variants.nodes}
            >
              {({option}) => (
                <div key={option.name} className="mb-4">
                  <label className="font-display text-sm tracking-widest uppercase text-zakitos-muted mb-2 block">
                    {option.name}: <span className="text-zakitos-cream">{option.value}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map(({value, isAvailable, isActive, to}) => (
                      <Link
                        key={value}
                        to={to}
                        prefetch="intent"
                        preventScrollReset
                        replace
                        className={`
                          px-4 py-2 font-mono text-sm border transition-all
                          ${isActive
                            ? 'border-zakitos-red bg-zakitos-red/10 text-zakitos-cream'
                            : isAvailable
                            ? 'border-zakitos-border text-zakitos-muted hover:border-zakitos-cream hover:text-zakitos-cream'
                            : 'border-zakitos-border text-zakitos-muted opacity-40 cursor-not-allowed line-through'
                          }
                        `}
                      >
                        {value}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </VariantSelector>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-5">
              <div className="qty-selector">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                >
                  –
                </button>
                <div className="qty-value">{quantity}</div>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>

              <fetcher.Form method="post" action="/cart" className="flex-1">
                <input type="hidden" name="cartAction" value="ADD_TO_CART" />
                <input
                  type="hidden"
                  name="lines"
                  value={JSON.stringify([
                    {merchandiseId: selectedVariant?.id, quantity},
                  ])}
                />
                <button
                  type="submit"
                  disabled={!selectedVariant?.availableForSale || isAdding}
                  className={`btn-fire w-full text-base py-4 transition-all ${
                    addedToCart ? 'bg-green-600 border-green-600' : ''
                  }`}
                >
                  {isAdding
                    ? 'Adding…'
                    : addedToCart
                    ? '✓ Added to Cart'
                    : selectedVariant?.availableForSale
                    ? 'Add to Cart'
                    : 'Sold Out'}
                </button>
              </fetcher.Form>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zakitos-border text-center">
              {[
                {icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, text: 'Free over $35'},
                {icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>, text: '30-day returns'},
                {icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Real ingredients'},
              ].map(({icon, text}) => (
                <div key={text} className="flex flex-col items-center gap-1">
                  <span className="text-zakitos-red">{icon}</span>
                  <span className="text-zakitos-muted text-[11px] font-mono">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Ingredients & Details ───────────────────────────── */}
        <ProductDetails
          product={product}
          chiliType={chiliType}
          origin={origin}
        />


        {/* ── Reviews placeholder ─────────────────────────────── */}
        <ReviewsSection />
      </div>

      {/* Sticky ATC (mobile) */}
      <StickyAddToCart
        product={product}
        selectedVariant={selectedVariant}
        heatLevel={heatLevel}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    </>
  );
}

function getHeatColor(level: number): string {
  const colors: Record<number, string> = {
    1: '#FFB800', 2: '#FF8C00', 3: '#FF5500', 4: '#E8170B', 5: '#8B0000',
  };
  return colors[level] ?? '#FF5500';
}

/* ─── Product Details Accordion ───────────────────────────────────── */
function ProductDetails({
  product,
  chiliType,
  origin,
}: {
  product: any;
  chiliType: string | null;
  origin: string | null;
}) {
  const [openPanel, setOpenPanel] = useState<string | null>('ingredients');

  const panels = [
    {
      id: 'ingredients',
      title: '🧪 Ingredients',
      content: (
        <div className="text-zakitos-muted text-sm leading-relaxed space-y-2">
          <p>
            <strong className="text-zakitos-cream">100% Whole Dried Chili Strips</strong> — the real thing, not powder, not extract.
          </p>
          {chiliType && <p><strong className="text-zakitos-cream">Chili Variety:</strong> {chiliType}</p>}
          {origin && <p><strong className="text-zakitos-cream">Origin:</strong> {origin}</p>}
          <p className="text-zakitos-ember mt-3">No artificial flavors · No preservatives · No fillers</p>
        </div>
      ),
    },
    {
      id: 'heat',
      title: 'About This Heat',
      content: (
        <div className="text-zakitos-muted text-sm leading-relaxed space-y-2">
          <p>
            Every bag delivers{' '}
            <strong className="text-zakitos-cream">layered heat</strong>: an initial savory bite,
            a building chili warmth, and a lingering depth that keeps you going back.
          </p>
          <p>This isn't a one-note burn. This is craft.</p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="text-zakitos-muted text-sm space-y-2">
          <p>Free standard shipping on orders over $35.</p>
          <p>Ships within 1-2 business days.</p>
          <p>Not happy? 30-day no-questions-asked returns.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-12 border-t border-zakitos-border pt-8">
      <div className="space-y-0">
        {panels.map((panel) => (
          <div key={panel.id} className="border-b border-zakitos-border">
            <button
              className="w-full flex items-center justify-between py-4 text-left"
              onClick={() => setOpenPanel(openPanel === panel.id ? null : panel.id)}
            >
              <span className="font-display text-lg text-zakitos-cream tracking-wide">
                {panel.title}
              </span>
              <span className="text-zakitos-muted text-xl">
                {openPanel === panel.id ? '−' : '+'}
              </span>
            </button>
            {openPanel === panel.id && (
              <div className="pb-4 pr-4">
                {panel.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Reviews placeholder ─────────────────────────────────────────── */
function ReviewsSection() {
  const mockReviews = [
    {
      author: 'Mike H.',
      rating: 5,
      title: 'Best chili snack I\'ve ever had',
      body: 'The heat is REAL. Not that artificial powder garbage. Whole dried chilies that actually taste like chilies. Reordered 3 times.',
      heat: 'Level 5',
      verified: true,
    },
    {
      author: 'Sarah K.',
      rating: 5,
      title: 'Obsessed with the Garlic Chili',
      body: 'Perfect balance of heat and flavor. The garlic notes come through beautifully. Already got 2 friends hooked.',
      heat: 'Level 3',
      verified: true,
    },
    {
      author: 'James T.',
      rating: 4,
      title: 'Great snack, impressive packaging',
      body: 'The black foil bag is gorgeous. Perfect for gifting. Heat is real but approachable even for non-spicy heads.',
      heat: 'Level 2',
      verified: true,
    },
  ];

  return (
    <section className="mt-16">
      <div className="flex items-center gap-6 mb-8">
        <div>
          <h2 className="font-display text-4xl text-zakitos-cream tracking-wide">REVIEWS</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">
              {Array.from({length: 5}).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB800" className="flex-shrink-0">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="font-mono text-sm text-zakitos-muted">4.9 · 2,400+ reviews</span>
          </div>
        </div>
        <div className="ml-auto">
          <button className="btn-outline-fire text-sm px-4 py-2">
            Write a Review
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {mockReviews.map((review, i) => (
          <div key={i} className="card-dark p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-0.5">
                {Array.from({length: review.rating}).map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#FFB800">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              {review.verified && (
                <span className="text-zakitos-ember text-[10px] font-mono tracking-wide">Verified</span>
              )}
            </div>
            <p className="font-display text-base text-zakitos-cream tracking-wide mb-2">
              {review.title}
            </p>
            <p className="text-zakitos-muted text-sm leading-relaxed mb-3">
              {review.body}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zakitos-muted">{review.author}</span>
              <span className="text-xs">{review.heat}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Queries ─────────────────────────────────────────────────────── */
const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
        ...ProductVariant
      }
    }
  }
  fragment ProductVariant on ProductVariant {
    id
    availableForSale
    quantityAvailable
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    selectedOptions {
      name
      value
    }
    sku
    title
  }
  ${PRODUCT_FRAGMENT}
`;

