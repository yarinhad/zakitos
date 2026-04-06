import {Link} from '@remix-run/react';

export function meta() {
  return [
    {title: 'Shop All | Zakitos'},
    {name: 'description', content: 'Zakitos Crunch Chaos — whole dried chili strips. Bold flavor, real heat, no shortcuts.'},
  ];
}

export default function ShopAll() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-2">
          The Lineup
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-zakitos-cream tracking-wide leading-none">
          SHOP ALL
        </h1>
        <p className="text-zakitos-muted mt-3 font-mono text-xs tracking-widest">
          1 PRODUCT
        </p>
      </div>

      {/* Single product card */}
      <div className="max-w-sm">
        <Link
          to="/products/zakitos"
          prefetch="intent"
          className="group card-dark overflow-hidden block"
        >
          <div className="aspect-square bg-zakitos-dark overflow-hidden">
            <img
              src="/zakitos-1-pack-package.png"
              alt="Zakitos Crunch Chaos"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
          </div>
          <div className="p-5">
            <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-1">
              Whole Dried Chili Strips
            </p>
            <h2 className="font-display text-3xl text-zakitos-cream tracking-wide leading-tight mb-1">
              CRUNCH CHAOS
            </h2>
            <p className="text-zakitos-muted text-sm mb-4">
              Bold flavor. Real heat. No shortcuts. Choose your pack size.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg text-zakitos-cream">From $9.00</span>
              <span className="font-display text-sm tracking-wide text-zakitos-red group-hover:underline">
                Shop Now →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
