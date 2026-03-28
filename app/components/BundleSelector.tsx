import {Link} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {HeatBadge} from '~/components/HeatMeter';

interface Bundle {
  id: string;
  title: string;
  description: string;
  savings: string;
  badge?: string;
  items: string[];
  price: {amount: string; currencyCode: CurrencyCode};
  compareAtPrice?: {amount: string; currencyCode: CurrencyCode};
  handle: string;
  heatLevel: number;
  icon: string;
  popular?: boolean;
}

// Pack size options
const BUNDLES: Bundle[] = [
  {
    id: '1-pack',
    title: '1-Pack',
    description: 'One bag. Try it, love it, come back for more.',
    savings: '',
    items: ['1 × Zakitos chili snack bag', 'Perfect for first-timers'],
    price: {amount: '9.00', currencyCode: 'USD' as CurrencyCode},
    compareAtPrice: undefined,
    handle: '1-pack',
    heatLevel: 3,
    icon: '🌶',
  },
  {
    id: '5-pack',
    title: '5-Pack',
    description: 'Five bags. Stock your stash and save 15%.',
    savings: 'Save 15%',
    badge: 'Most Popular',
    items: ['5 × Zakitos chili snack bags', 'Save vs. buying singles', 'Free shipping eligible'],
    price: {amount: '38.00', currencyCode: 'USD' as CurrencyCode},
    compareAtPrice: {amount: '45.00', currencyCode: 'USD' as CurrencyCode},
    handle: '5-pack',
    heatLevel: 3,
    icon: '🔥',
    popular: true,
  },
  {
    id: '24-pack',
    title: '24-Pack',
    description: 'Go all in. Bulk pricing, over a month of daily heat.',
    savings: 'Save 28%',
    items: ['24 × Zakitos chili snack bags', 'Best price per bag', 'Free shipping included'],
    price: {amount: '155.00', currencyCode: 'USD' as CurrencyCode},
    compareAtPrice: {amount: '216.00', currencyCode: 'USD' as CurrencyCode},
    handle: '24-pack',
    heatLevel: 3,
    icon: '💀',
  },
];

interface BundleSelectorProps {
  horizontal?: boolean;
}

export function BundleSelector({horizontal = false}: BundleSelectorProps) {
  return (
    <section className="py-20 bg-zakitos-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-2">
            Pick Your Pack
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide">
            MORE BAGS,
            <br />
            <span className="text-gradient-fire">MORE SAVINGS</span>
          </h2>
        </div>

        <div className={`grid gap-4 ${horizontal ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
          {BUNDLES.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-zakitos-muted text-sm">
            Subscribe & Save 15% · Free shipping over $35 · Skip or cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

function BundleCard({bundle}: {bundle: Bundle}) {
  const discount = bundle.compareAtPrice
    ? Math.round(
        ((parseFloat(bundle.compareAtPrice.amount) - parseFloat(bundle.price.amount)) /
          parseFloat(bundle.compareAtPrice.amount)) *
          100,
      )
    : 0;

  return (
    <div
      className={`relative card-dark p-6 transition-all duration-300 hover:-translate-y-1 ${
        bundle.popular ? 'border-zakitos-red ring-1 ring-zakitos-red/40' : ''
      }`}
    >
      {/* Popular badge */}
      {bundle.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge-fire text-xs px-3 py-1 whitespace-nowrap">
            ⚡ Most Popular
          </span>
        </div>
      )}

      {/* Icon & title */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-3xl mb-2">{bundle.icon}</div>
          <h3 className="font-display text-2xl text-zakitos-cream tracking-wide leading-tight">
            {bundle.title}
          </h3>
          <p className="text-zakitos-muted text-sm mt-1">{bundle.description}</p>
        </div>
        {discount > 0 && (
          <span className="badge-gold text-xs flex-shrink-0 ml-2">
            -{discount}%
          </span>
        )}
      </div>

      {/* Heat level */}
      <div className="mb-4">
        <HeatBadge level={bundle.heatLevel} />
      </div>

      {/* Items */}
      <ul className="space-y-1 mb-6">
        {bundle.items.map((item) => (
          <li key={item} className="text-zakitos-muted text-sm flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zakitos-ember flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-2xl text-zakitos-cream">
            <Money data={bundle.price} />
          </div>
          {bundle.compareAtPrice && (
            <div className="font-mono text-sm text-zakitos-muted line-through">
              <Money data={bundle.compareAtPrice} />
            </div>
          )}
        </div>

        <Link
          to={`/products/${bundle.handle}`}
          className={`btn-fire text-sm px-5 py-2.5 ${bundle.popular ? 'glow-fire' : ''}`}
          prefetch="intent"
        >
          Get Bundle
        </Link>
      </div>
    </div>
  );
}

// Inline bundle upsell for product pages
export function BundleUpsell({currentHandle}: {currentHandle: string}) {
  const relatedBundles = BUNDLES.filter((b) => b.handle !== currentHandle).slice(0, 2);

  return (
    <div className="mt-8 p-5 bg-zakitos-card border border-zakitos-border">
      <p className="font-display text-sm tracking-widest uppercase text-zakitos-orange mb-4">
        🔥 More Pack Options
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relatedBundles.map((bundle) => (
          <Link
            key={bundle.id}
            to={`/products/${bundle.handle}`}
            prefetch="intent"
            className="flex items-center gap-3 p-3 bg-zakitos-dark border border-zakitos-border hover:border-zakitos-red transition-colors"
          >
            <span className="text-2xl">{bundle.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm text-zakitos-cream truncate">{bundle.title}</p>
              <p className="font-mono text-xs text-zakitos-muted">
                <Money data={bundle.price} />
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-zakitos-muted flex-shrink-0">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
