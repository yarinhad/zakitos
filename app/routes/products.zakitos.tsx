import {Link} from '@remix-run/react';
import {useState} from 'react';
import {HeatMeter} from '~/components/HeatMeter';

export function meta() {
  return [
    {title: 'Zakitos Crunch Chaos | Zakitos'},
    {
      name: 'description',
      content:
        'Whole dried chili strips. Bold flavor, real heat, no shortcuts. Choose your pack size.',
    },
  ];
}

const PACKS = [
  {
    id: '1x',
    label: '1-Pack',
    qty: 1,
    price: '$9.00',
    compareAt: null,
    savings: null,
    badge: null,
    image: '/zakitos-1-pack-package.png',
    description:
      'One bag of bold dried chili strips. The perfect introduction to real heat.',
  },
  {
    id: '5x',
    label: '5-Pack',
    qty: 5,
    price: '$38.00',
    compareAt: '$45.00',
    savings: 'Save 15%',
    badge: 'Most Popular',
    image: '/zakitos-5-pack-package.png',
    description:
      'Five bags. Stock your stash and save 15% vs buying singles.',
  },
  {
    id: '20x',
    label: '20-Pack',
    qty: 20,
    price: '$155.00',
    compareAt: '$180.00',
    savings: 'Save 28%',
    badge: 'Best Value',
    image: '/zakitos-20pack-package.png',
    description:
      'The full arsenal. Bulk pricing. Over a month of daily heat.',
  },
];

export default function ZakitosProductPage() {
  const [selectedPack, setSelectedPack] = useState(PACKS[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-zakitos-muted font-mono text-xs">
        <Link to="/" className="hover:text-zakitos-cream transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to="/collections/all"
          className="hover:text-zakitos-cream transition-colors"
        >
          Shop
        </Link>
        <span>/</span>
        <span className="text-zakitos-cream">Zakitos Crunch Chaos</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* ── Image ─────────────────────────────────────────────── */}
        <div className="aspect-square bg-zakitos-card overflow-hidden">
          <img
            key={selectedPack.id}
            src={selectedPack.image}
            alt={`Zakitos ${selectedPack.label}`}
            className="w-full h-full object-contain transition-opacity duration-300"
            loading="eager"
          />
        </div>

        {/* ── Details ───────────────────────────────────────────── */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide leading-none mb-2">
            ZAKITOS
            <br />
            <span className="text-gradient-fire">CRUNCH CHAOS</span>
          </h1>
          <p className="text-zakitos-muted font-mono text-xs tracking-widest uppercase mb-6">
            Whole Dried Chili Strips · 55g per bag
          </p>

          {/* Pack selector */}
          <div className="mb-5">
            <label className="font-display text-sm tracking-widest uppercase text-zakitos-muted mb-3 block">
              Choose Your Pack
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PACKS.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className={`relative p-3 border-2 transition-all text-left ${
                    selectedPack.id === pack.id
                      ? 'border-zakitos-red bg-zakitos-red/5'
                      : 'border-zakitos-border hover:border-zakitos-muted'
                  }`}
                >
                  {pack.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 badge-fire text-[10px] px-2 py-0.5 whitespace-nowrap">
                      {pack.badge}
                    </span>
                  )}
                  <p className="font-display text-lg text-zakitos-cream tracking-wide leading-tight">
                    {pack.label}
                  </p>
                  <p className="font-mono text-sm text-zakitos-cream">{pack.price}</p>
                  {pack.savings && (
                    <p className="font-mono text-xs text-zakitos-ember">{pack.savings}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-3xl text-zakitos-cream">
              {selectedPack.price}
            </span>
            {selectedPack.compareAt && (
              <span className="font-mono text-lg text-zakitos-muted line-through">
                {selectedPack.compareAt}
              </span>
            )}
            {selectedPack.savings && (
              <span className="badge-fire text-xs">{selectedPack.savings}</span>
            )}
          </div>

          {/* Heat Meter */}
          <div className="bg-zakitos-card border border-zakitos-border p-4 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs tracking-widest uppercase text-zakitos-muted">
                Heat Level
              </span>
              <span className="font-mono text-xs text-zakitos-muted">3,000–8,000 SHU</span>
            </div>
            <HeatMeter level={3} showLabel size="lg" showShu />
          </div>

          {/* Description */}
          <p className="text-zakitos-muted text-sm leading-relaxed mb-6">
            {selectedPack.description}
          </p>

          {/* Quantity + CTA */}
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
            <button
              disabled
              className="btn-fire flex-1 text-base py-4 opacity-60 cursor-not-allowed"
            >
              Sold Out — Notify Me
            </button>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zakitos-border text-center">
            {[
              {icon: '🚚', text: 'Free over $35'},
              {icon: '↩', text: '30-day returns'},
              {icon: '✓', text: 'Real ingredients'},
            ].map(({icon, text}) => (
              <div key={text} className="flex flex-col items-center gap-1">
                <span className="text-zakitos-red text-sm">{icon}</span>
                <span className="text-zakitos-muted text-[11px] font-mono">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ingredients & Details ──────────────────────────────── */}
      <div className="mt-12 border-t border-zakitos-border pt-8">
        <div className="space-y-0">
          {[
            {
              id: 'ingredients',
              title: 'Ingredients',
              content: (
                <div className="text-zakitos-muted text-sm leading-relaxed space-y-2">
                  <p>
                    <strong className="text-zakitos-cream">
                      100% Whole Dried Chili Strips
                    </strong>{' '}
                    — the real thing, not powder, not extract.
                  </p>
                  <p className="text-zakitos-ember mt-3">
                    No artificial flavors · No preservatives · No fillers
                  </p>
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
                    <strong className="text-zakitos-cream">layered heat</strong>: an
                    initial savory bite, a building chili warmth, and a lingering depth
                    that keeps you going back.
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
                  <p>Ships within 1–2 business days.</p>
                  <p>Not happy? 30-day no-questions-asked returns.</p>
                </div>
              ),
            },
          ].map((panel) => (
            <AccordionPanel key={panel.id} title={panel.title} content={panel.content} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AccordionPanel({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zakitos-border">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-display text-lg text-zakitos-cream tracking-wide">
          {title}
        </span>
        <span className="text-zakitos-muted text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pb-4 pr-4">{content}</div>}
    </div>
  );
}
