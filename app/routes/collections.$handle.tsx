import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useSearchParams} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {ProductCard} from '~/components/ProductCard';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getHeatLevel} from '~/lib/utils';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const url = new URL(request.url);
  const heatFilter = url.searchParams.get('heat');
  const flavorFilter = url.searchParams.get('flavor');

  if (!handle) throw new Response('Not Found', {status: 404});

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, first: 48},
  });

  if (!collection) throw new Response('Collection Not Found', {status: 404});

  return json({collection, heatFilter, flavorFilter});
}

export function meta({data}: {data: any}) {
  return [
    {title: `${data?.collection?.title ?? 'Collection'} | Zakitos`},
    {name: 'description', content: data?.collection?.description ?? 'Shop our chili snack collection.'},
  ];
}

export default function CollectionPage() {
  const {collection, heatFilter, flavorFilter} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts = collection.products.nodes;

  // Client-side filtering by tags
  const filteredProducts = allProducts.filter((product: any) => {
    const tags: string[] = product.tags;
    if (heatFilter && !tags.some((t) => t === `heat-${heatFilter}`)) return false;
    if (flavorFilter && !tags.some((t) => t.toLowerCase().includes(flavorFilter.toLowerCase()))) return false;
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
            <Image
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
          <span className="font-mono text-xs text-zakitos-muted tracking-widest uppercase">Filter by:</span>

          {/* Heat level filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-zakitos-muted text-xs font-mono self-center">Heat:</span>
            {[
              {label: 'All', value: null},
              {label: '🌶 Mild', value: '1'},
              {label: '🌶🌶 Medium', value: '2'},
              {label: '🔥 Hot', value: '3'},
              {label: '🔥🔥 Fire', value: '4'},
              {label: '💀 Reaper', value: '5'},
            ].map(({label, value}) => (
              <button
                key={label}
                onClick={() => setFilter('heat', value)}
                className={`filter-chip text-xs ${heatFilter === value || (!heatFilter && !value) ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Flavor filters */}
          <div className="flex flex-wrap gap-2 md:ml-4">
            <span className="text-zakitos-muted text-xs font-mono self-center">Flavor:</span>
            {[
              {label: 'All', value: null},
              {label: 'Classic', value: 'classic'},
              {label: 'Garlic', value: 'garlic'},
              {label: 'Reaper', value: 'reaper'},
            ].map(({label, value}) => (
              <button
                key={label}
                onClick={() => setFilter('flavor', value)}
                className={`filter-chip text-xs ${flavorFilter === value || (!flavorFilter && !value) ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Clear filters */}
          {(heatFilter || flavorFilter) && (
            <button
              onClick={() => setSearchParams({}, {preventScrollReset: true})}
              className="text-zakitos-red text-xs font-mono hover:underline ml-auto"
            >
              Clear all ×
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
