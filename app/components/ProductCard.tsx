import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {HeatBadge} from '~/components/HeatMeter';
import {getHeatLevel, isOnSale, discountPercent} from '~/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    tags: string[];
    availableForSale: boolean;
    priceRange: {
      minVariantPrice: {amount: string; currencyCode: CurrencyCode};
      maxVariantPrice: {amount: string; currencyCode: CurrencyCode};
    };
    images: {
      nodes: Array<{id?: string; url: string; altText?: string | null; width?: number | null; height?: number | null}>;
    };
    variants: {
      nodes: Array<{
        id: string;
        availableForSale: boolean;
        price: {amount: string; currencyCode: CurrencyCode};
        compareAtPrice?: {amount: string; currencyCode: CurrencyCode} | null;
        selectedOptions: Array<{name: string; value: string}>;
      }>;
    };
  };
  loading?: 'lazy' | 'eager';
}

export function ProductCard({product, loading = 'lazy'}: ProductCardProps) {
  const heatLevel = getHeatLevel(product.tags);
  const firstVariant = product.variants.nodes[0];
  const secondImage = product.images.nodes[1];
  const firstImage = product.images.nodes[0];
  const onSale = firstVariant && isOnSale(firstVariant.price, firstVariant.compareAtPrice);
  const discount = onSale ? discountPercent(firstVariant.price, firstVariant.compareAtPrice) : 0;

  return (
    <Link
      to={`/products/${product.handle}`}
      prefetch="intent"
      className="group block"
    >
      <article className="card-dark overflow-hidden">
        {/* Image container */}
        <div className="product-image-container aspect-product bg-zakitos-card relative">
          {firstImage && (
            <Image
              data={firstImage}
              loading={loading}
              className="img-fill object-contain p-4"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          )}
          {/* Second image on hover */}
          {secondImage && (
            <Image
              data={secondImage}
              loading="lazy"
              className="product-image-hover img-fill object-contain p-4"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {!product.availableForSale && (
              <span className="badge-dark text-xs">Sold Out</span>
            )}
            {onSale && discount > 0 && (
              <span className="badge-fire text-xs">–{discount}%</span>
            )}
          </div>

          {/* Quick add overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200 bg-gradient-to-t from-zakitos-black to-transparent">
            <button
              className="btn-fire w-full py-2 text-sm"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Quick add to cart
              }}
            >
              Quick Add
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          {/* Heat badge */}
          <div className="mb-2">
            <HeatBadge level={heatLevel} />
          </div>

          <h3 className="font-display text-xl tracking-wide text-zakitos-cream group-hover:text-zakitos-orange transition-colors leading-tight mb-1">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-mono text-base text-zakitos-cream">
              <Money data={product.priceRange.minVariantPrice} />
            </span>
            {firstVariant?.compareAtPrice && (
              <span className="font-mono text-sm text-zakitos-muted line-through">
                <Money data={firstVariant.compareAtPrice} />
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

// Skeleton loader for product cards
export function ProductCardSkeleton() {
  return (
    <div className="card-dark overflow-hidden">
      <div className="aspect-product skeleton" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-16 rounded" />
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/4 rounded" />
      </div>
    </div>
  );
}
