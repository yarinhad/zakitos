import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useSearchParams} from '@remix-run/react';
import {SafeImage} from '~/components/SafeImage';
import {ProductCard} from '~/components/ProductCard';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getHeatLevel} from '~/lib/utils';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const url = new URL(request.url);
  const packFilter = url.searchParams.get('pack');

  if (!handle) throw new Response('Not Found', {status: 404});

  // Fall back to mock collection when no Shopify credentials are configured
  const result = await storefront
    .query(COLLECTION_QUERY, {variables: {handle, first: 48}})
    .catch(() => null);

  const collection = result?.collection ?? getMockCollection(handle);

  return json({collection, packFilter});
}

export function meta({data}: {data: any}) {
  return [
    {title: `${data?.collection?.title ?? 'Collection'} | Zakitos`},
    {name: 'description', content: data?.collection?.description ?? 'Shop our chili snack collection.'},
  ];
}

export default function CollectionPage() {
  const {collection, packFilter} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts = collection.products.nodes;

  // Client-side filtering by pack size
  const filteredProducts = allProducts.filter((product: any) => {
    if (packFilter && !product.title.toLowerCase().includes(packFilter.toLowerCase())) return false;
    return true;
  });

  const setFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params, {preventScrollReset: true});
  };

  return (
    <>
      {/* Collection header */}
      <div className="relative overflow-hidden bg-zakitos-dark py-16 md:py-24">
        {/* Background image */}
        {collection.image && (
          <div className="absolute inset-0 opacity-10">
            <SafeImage
              data={collection.image}
              className="w-full h-full object-cover"
              loading="eager"
              sizes="100vw"
            />
          </div>
        )}
        {/* Ember glow */}
        <div
          className="absolute inset-0"
          style={{background: 'radial-gradient(ellipse at center, rgba(255,85,0,0.08) 0%, transparent 70%)'}}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-zakitos-muted font-mono text-xs">
            <Link to="/" className="hover:text-zakitos-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zakitos-cream">{collection.title}</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl text-zakitos-cream tracking-wide leading-none">
            {collection.title.toUpperCase()}
          </h1>
          {collection.description && (
            <p className="text-zakitos-muted mt-4 max-w-lg text-base">{collection.description}</p>
          )}
          <p className="font-mono text-zakitos-ember text-xs mt-3 tracking-widest">
            {filteredProducts.length} PRODUCTS
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-zakitos-border">
          <span className="font-mono text-xs text-zakitos-muted tracking-widest uppercase">Pack Size:</span>

          <div className="flex flex-wrap gap-2">
            {[
              {label: 'All', value: null},
              {label: '1-Pack', value: '1-pack'},
              {label: '5-Pack', value: '5-pack'},
              {label: '24-Pack', value: '24-pack'},
            ].map(({label, value}) => (
              <button
                key={label}
                onClick={() => setFilter('pack', value)}
                className={`filter-chip text-xs ${packFilter === value || (!packFilter && !value) ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {packFilter && (
            <button
              onClick={() => setSearchParams({}, {preventScrollReset: true})}
              className="text-zakitos-red text-xs font-mono hover:underline ml-auto"
            >
              Clear ×
            </button>
          )}
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-4xl text-zakitos-cream mb-4">NO MATCHES</p>
            <p className="text-zakitos-muted text-sm mb-6">Try adjusting your heat tolerance or flavor filter.</p>
            <button
              onClick={() => setSearchParams({}, {preventScrollReset: true})}
              className="btn-outline-fire"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product: any, i: number) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={i < 4 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        )}

        {/* Pagination (simple) */}
        {collection.products.pageInfo?.hasNextPage && (
          <div className="text-center mt-12">
            <button className="btn-outline-fire">
              Load More →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';

// ─── Mock data (shown when no Shopify credentials are set) ────────────────────

const ALL_MOCK_PRODUCTS = [
  {
    id: '1', title: 'Zakitos 1-Pack', handle: '1-pack',
    tags: ['snacks', 'bestseller'], availableForSale: false,
    priceRange: {
      minVariantPrice: {amount: '9.00', currencyCode: 'USD' as CurrencyCode},
      maxVariantPrice: {amount: '9.00', currencyCode: 'USD' as CurrencyCode},
    },
    images: {nodes: [{id: '1', url: '/zakitos-1-pack-package.png', altText: 'Zakitos 1-Pack', width: 800, height: 800}]},
    variants: {nodes: [{id: 'v1', title: '1-Pack', availableForSale: false, price: {amount: '9.00', currencyCode: 'USD' as CurrencyCode}, compareAtPrice: null, selectedOptions: [{name: 'Pack Size', value: '1-Pack'}]}]},
  },
  {
    id: '2', title: 'Zakitos 5-Pack', handle: '5-pack',
    tags: ['snacks', 'bestseller'], availableForSale: false,
    priceRange: {
      minVariantPrice: {amount: '38.00', currencyCode: 'USD' as CurrencyCode},
      maxVariantPrice: {amount: '38.00', currencyCode: 'USD' as CurrencyCode},
    },
    images: {nodes: [{id: '2', url: '/zakitos-5-pack-package.png', altText: 'Zakitos 5-Pack', width: 800, height: 800}]},
    variants: {nodes: [{id: 'v2', title: '5-Pack', availableForSale: false, price: {amount: '38.00', currencyCode: 'USD' as CurrencyCode}, compareAtPrice: {amount: '45.00', currencyCode: 'USD' as CurrencyCode}, selectedOptions: [{name: 'Pack Size', value: '5-Pack'}]}]},
  },
  {
    id: '3', title: 'Zakitos 24-Pack', handle: '24-pack',
    tags: ['snacks', 'bulk'], availableForSale: false,
    priceRange: {
      minVariantPrice: {amount: '155.00', currencyCode: 'USD' as CurrencyCode},
      maxVariantPrice: {amount: '155.00', currencyCode: 'USD' as CurrencyCode},
    },
    images: {nodes: [{id: '3', url: '/zakitos-24-pack-package.png', altText: 'Zakitos 24-Pack', width: 800, height: 800}]},
    variants: {nodes: [{id: 'v3', title: '24-Pack', availableForSale: false, price: {amount: '155.00', currencyCode: 'USD' as CurrencyCode}, compareAtPrice: {amount: '216.00', currencyCode: 'USD' as CurrencyCode}, selectedOptions: [{name: 'Pack Size', value: '24-Pack'}]}]},
  },
];

const COLLECTION_TITLES: Record<string, string> = {
  all: 'Shop All',
  snacks: 'All Packs',
  new: 'New Arrivals',
};

const COLLECTION_DESCRIPTIONS: Record<string, string> = {
  all: 'One bag, five bags, or twenty-four. Real chili, no shortcuts.',
  snacks: 'Pick your pack size. The chili is the same — bold, whole, and unapologetically real.',
  new: 'Fresh from the lab. The newest additions to the Zakitos lineup.',
};

function getMockCollection(handle: string) {
  const title = COLLECTION_TITLES[handle] ?? handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description = COLLECTION_DESCRIPTIONS[handle] ?? '';

  const products = ALL_MOCK_PRODUCTS;

  return {
    id: `mock-${handle}`,
    handle,
    title,
    description,
    image: null,
    products: {
      nodes: products,
      pageInfo: {hasPreviousPage: false, hasNextPage: false, startCursor: null, endCursor: null},
    },
  };
}

const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
      ) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
