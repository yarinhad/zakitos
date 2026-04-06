import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useSearchParams, Form} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {SafeImage} from '~/components/SafeImage';

const SEARCH_QUERY = `#graphql
  query Search($query: String!, $first: Int!) {
    products(query: $query, first: $first) {
      nodes {
        id
        title
        handle
        tags
        availableForSale
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 1) {
          nodes { id url altText width height }
        }
      }
    }
  }
`;

const MOCK_PRODUCTS = [
  {
    id: '1', title: 'Zakitos 1-Pack', handle: '1-pack',
    tags: ['snacks', 'bestseller'], availableForSale: false,
    priceRange: {minVariantPrice: {amount: '9.00', currencyCode: 'USD' as CurrencyCode}},
    images: {nodes: [{id: '1', url: '/zakitos-1-pack-package.png', altText: 'Zakitos 1-Pack', width: 800, height: 800}]},
  },
  {
    id: '2', title: 'Zakitos 5-Pack', handle: '5-pack',
    tags: ['snacks', 'bestseller'], availableForSale: false,
    priceRange: {minVariantPrice: {amount: '38.00', currencyCode: 'USD' as CurrencyCode}},
    images: {nodes: [{id: '2', url: '/zakitos-5-pack-package.png', altText: 'Zakitos 5-Pack', width: 800, height: 800}]},
  },
  {
    id: '3', title: 'Zakitos 24-Pack', handle: '24-pack',
    tags: ['snacks', 'bulk'], availableForSale: false,
    priceRange: {minVariantPrice: {amount: '155.00', currencyCode: 'USD' as CurrencyCode}},
    images: {nodes: [{id: '3', url: '/zakitos-24-pack-package.png', altText: 'Zakitos 24-Pack', width: 800, height: 800}]},
  },
];

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim() ?? '';

  if (!q) return json({products: [], query: ''});

  const result = await context.storefront
    .query(SEARCH_QUERY, {variables: {query: q, first: 20}})
    .catch(() => null);

  const products =
    result?.products?.nodes ??
    MOCK_PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())),
    );

  return json({products, query: q});
}

export function meta({data}: {data: any}) {
  return [{title: data?.query ? `Search: "${data.query}" | Zakitos` : 'Search | Zakitos'}];
}

export default function SearchPage() {
  const {products, query} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide mb-6">
          SEARCH
        </h1>

        <Form method="get" action="/search" className="flex gap-0 max-w-xl">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search products…"
            autoFocus
            className="input-fire flex-1 text-base py-3 px-4"
          />
          <button type="submit" className="btn-fire px-6 py-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Search
          </button>
        </Form>
      </div>

      {/* Results */}
      {query && (
        <p className="font-mono text-sm text-zakitos-muted mb-6">
          {products.length === 0
            ? `No results for "${query}"`
            : `${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`}
        </p>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product: any) => (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              prefetch="intent"
              className="group card-dark p-4 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="aspect-square bg-zakitos-dark rounded-xl overflow-hidden mb-3">
                {product.images?.nodes?.[0] && (
                  <SafeImage
                    data={product.images.nodes[0]}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <p className="font-display text-zakitos-cream tracking-wide text-base leading-tight mb-1 group-hover:text-zakitos-orange transition-colors">
                {product.title}
              </p>
              <p className="font-mono text-sm text-zakitos-muted">
                <Money data={product.priceRange.minVariantPrice} />
              </p>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <p className="text-zakitos-muted text-base mb-6">Try a different search term.</p>
          <Link to="/collections/all" className="btn-fire px-8 py-3" prefetch="intent">
            Browse All Products
          </Link>
        </div>
      ) : null}
    </div>
  );
}
