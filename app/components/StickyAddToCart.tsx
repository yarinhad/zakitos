import {useFetcher} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {Money} from '@shopify/hydrogen';
import {HeatBadge} from '~/components/HeatMeter';

interface StickyAddToCartProps {
  product: {
    title: string;
    availableForSale: boolean;
    tags: string[];
    images: {
      nodes: Array<{url: string; altText?: string | null}>;
    };
  };
  selectedVariant: {
    id: string;
    availableForSale: boolean;
    price: {amount: string; currencyCode: string};
    compareAtPrice?: {amount: string; currencyCode: string} | null;
  } | null;
  heatLevel: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export function StickyAddToCart({
  product,
  selectedVariant,
  heatLevel,
  quantity,
  onQuantityChange,
}: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const fetcher = useFetcher();
  const isAdding = fetcher.state !== 'idle';

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past the main ATC section (~600px)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!selectedVariant) return null;

  const image = product.images.nodes[0];

  return (
    <div
      className={`sticky-atc ${visible ? 'visible' : ''} md:hidden`}
      aria-hidden={!visible}
    >
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Product thumbnail */}
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            className="w-10 h-10 object-cover flex-shrink-0 bg-zakitos-card"
          />
        )}

        <div className="flex-1 min-w-0">
          <p className="font-display text-sm text-zakitos-cream truncate leading-tight">
            {product.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-xs text-zakitos-cream">
              <Money data={selectedVariant.price} />
            </span>
            <HeatBadge level={heatLevel} />
          </div>
        </div>

        {/* Qty + ATC */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="qty-selector h-9 text-sm">
            <button
              className="qty-btn text-sm"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
            >
              –
            </button>
            <div className="qty-value text-xs w-8">{quantity}</div>
            <button
              className="qty-btn text-sm"
              onClick={() => onQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <fetcher.Form method="post" action="/cart">
            <input type="hidden" name="cartAction" value="ADD_TO_CART" />
            <input type="hidden" name="lines" value={JSON.stringify([{merchandiseId: selectedVariant.id, quantity}])} />
            <button
              type="submit"
              disabled={!selectedVariant.availableForSale || isAdding}
              className="btn-fire text-sm px-4 py-2 h-9"
            >
              {isAdding ? '...' : selectedVariant.availableForSale ? 'Add' : 'Sold Out'}
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
