import {Link} from '@remix-run/react';
import {HeatMeter} from '~/components/HeatMeter';

export function meta() {
  return [
    {title: 'Our Story | Zakitos'},
    {
      name: 'description',
      content:
        'Zakitos exists to deliver unapologetically bold snacking rooted in authentic chili craftsmanship. Learn our story.',
    },
  ];
}

export default function AboutPage() {
  return (
    <article>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-zakitos-black">
        {/* Background image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/ecomm-hero-shot.png"
            alt="Zakitos Story"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zakitos-black via-zakitos-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zakitos-black via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="font-mono text-zakitos-red text-xs tracking-widest uppercase mb-4">
            The Zakitos Story
          </p>
          <h1 className="font-display text-7xl md:text-9xl text-zakitos-cream tracking-wide leading-none mb-6">
            WE DON'T
            <br />
            <span className="text-gradient-fire">DO MILD.</span>
          </h1>
          <p className="text-zakitos-warm text-xl max-w-lg leading-relaxed">
            In product. In brand. In life.
            Zakitos is the snack for people who mean it.
          </p>
        </div>

        {/* Diagonal bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: 'var(--color-dark)',
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
          }}
        />
      </section>

      {/* ── Origin Story ──────────────────────────────────────── */}
      <section className="py-20 bg-zakitos-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-4">
                Where It Started
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide leading-none mb-6">
                THE CHILI
                <br />
                THAT STARTED
                <br />
                EVERYTHING
              </h2>
              <div className="space-y-4 text-zakitos-muted text-base leading-relaxed">
                <p>
                  It started with a bag of dried chili strips from a small market in Tel Aviv.
                  No fancy branding. No marketing. Just impossibly bold, whole dried chili —
                  and a realization: <em className="text-zakitos-cream">this is what snacking should be.</em>
                </p>
                <p>
                  The snack market was flooded with artificial powder coatings, tortilla chips
                  dusted with capsaicin extract, and brands chasing a "heat stunt" rather than
                  real flavor. The gap was obvious.
                </p>
                <p>
                  <strong className="text-zakitos-cream">Zakitos was born to fill it.</strong> Premium artisanal dried chili strips
                  made for people who actually love heat — not just the idea of it.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/zakitos-In_a_still_life_photography_style_a_black_pouch_b5.png"
                alt="Zakitos Packaging"
                className="w-full max-w-sm mx-auto md:ml-auto"
                loading="lazy"
              />
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(232,23,11,0.1) 0%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ────────────────────────────────────── */}
      <section className="py-20 bg-zakitos-black noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-2">
              What We Stand For
            </p>
            <h2 className="font-display text-6xl md:text-7xl text-zakitos-cream tracking-wide leading-none">
              CORE
              <br />
              <span className="text-gradient-fire">VALUES</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: '⚡',
                title: 'Boldness',
                description: 'We don't do mild. In product, brand, and culture.',
                color: '#E8170B',
              },
              {
                icon: '🌱',
                title: 'Authenticity',
                description: 'Real chilies, real sourcing, real heat — no artificial shortcuts.',
                color: '#FFB800',
              },
              {
                icon: '🤝',
                title: 'Community',
                description: 'Chili lovers are our tribe. We build with them, not just for them.',
                color: '#FF5500',
              },
              {
                icon: '🏺',
                title: 'Craftsmanship',
                description: 'Every bag is a deliberate act of flavor engineering.',
                color: '#E8170B',
              },
            ].map(({icon, title, description, color}) => (
              <div
                key={title}
                className="card-dark p-6 group hover:border-zakitos-red/50"
              >
                <div
                  className="text-4xl mb-4 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{backgroundColor: `${color}18`, border: `2px solid ${color}30`}}
                >
                  {icon}
                </div>
                <h3 className="font-display text-2xl text-zakitos-cream tracking-wide mb-2">
                  {title.toUpperCase()}
                </h3>
                <p className="text-zakitos-muted text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Product ───────────────────────────────────────── */}
      <section className="py-20 bg-zakitos-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-3">
              <img
                src="/ecomm-hero-shot-one-package.png"
                alt="Zakitos Single Pack"
                className="w-full rounded-none"
                loading="lazy"
              />
              <img
                src="/ecomm hero-1-package.png"
                alt="Zakitos Package"
                className="w-full rounded-none mt-8"
                loading="lazy"
              />
              <img
                src="/ecomm-detail-lifestyle-closeup.png"
                alt="Chili Close-up"
                className="w-full col-span-2 rounded-none"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-4">
                The Product
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide leading-none mb-6">
                WHOLE CHILI.
                <br />
                ZERO
                <br />
                COMPROMISE.
              </h2>
              <div className="space-y-4 text-zakitos-muted text-base leading-relaxed mb-8">
                <p>
                  Most chili snacks are tortilla chips dusted with flavoring powder.
                  <strong className="text-zakitos-cream"> Zakitos is different</strong> — the whole
                  dried chili strip IS the snack. You can see the texture. You can taste the real heat.
                </p>
                <p>
                  We source whole chili varieties — from Jalapeño to Carolina Reaper —
                  and dry them to create a snack with visible, tangible authenticity.
                  Clean label. Short ingredient list. Long flavor memory.
                </p>
              </div>

              <div className="bg-zakitos-card border border-zakitos-border p-5 mb-8">
                <p className="font-display text-sm tracking-widest uppercase text-zakitos-muted mb-4">
                  The Heat Scale
                </p>
                <div className="space-y-4">
                  {[
                    {name: 'Jalapeño', level: 1, desc: 'Warm welcome'},
                    {name: 'Serrano', level: 2, desc: 'Building confidence'},
                    {name: 'Habanero', level: 3, desc: 'Now we\'re talking'},
                    {name: 'Ghost', level: 4, desc: 'Not for everyone'},
                    {name: 'Reaper', level: 5, desc: 'Maximum heat'},
                  ].map(({name, level, desc}) => (
                    <div key={name} className="flex items-center gap-4">
                      <span className="font-mono text-xs text-zakitos-muted w-20 flex-shrink-0">{name}</span>
                      <div className="flex-1">
                        <HeatMeter level={level} showLabel={false} size="sm" />
                      </div>
                      <span className="font-mono text-xs text-zakitos-muted w-32 text-right flex-shrink-0 hidden sm:block">
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/collections/all" className="btn-fire" prefetch="intent">
                Explore the Range 🌶
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Community ─────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{background: 'linear-gradient(135deg, #111 0%, #1A1A1A 100%)'}}
      >
        <div
          className="absolute right-0 bottom-0 text-[18rem] font-display leading-none text-zakitos-red/5 pointer-events-none select-none"
          aria-hidden
        >
          🔥
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-4">
            The Community
          </p>
          <h2 className="font-display text-6xl md:text-8xl text-zakitos-cream tracking-wide leading-none mb-6">
            JOIN THE
            <br />
            <span className="text-gradient-fire">HEAT TRIBE</span>
          </h2>
          <p className="text-zakitos-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            When you buy Zakitos, you're joining a community of bold eaters.
            Earn points, unlock exclusive drops, and rise through the heat scale tiers —
            from Jalapeño all the way to Reaper status.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {tier: '🌶 Jalapeño', points: '0–500 pts', perk: 'Free shipping on all orders'},
              {tier: '🔥 Habanero', points: '500–2K pts', perk: 'Exclusive flavor samples'},
              {tier: '💀 Reaper', points: '2K+ pts', perk: 'Limited drops & co-creation'},
            ].map(({tier, points, perk}) => (
              <div key={tier} className="card-dark p-5 text-center">
                <div className="font-display text-2xl text-zakitos-cream tracking-wide mb-1">
                  {tier}
                </div>
                <div className="font-mono text-xs text-zakitos-orange mb-3">{points}</div>
                <p className="text-zakitos-muted text-sm">{perk}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/collections/all" className="btn-fire text-base px-8 py-4" prefetch="intent">
              Start Your Journey
            </Link>
            <a
              href="https://discord.gg/zakitos"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base px-8 py-4"
            >
              Join The Reaper Club
            </a>
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────────────────────── */}
      <section className="bg-zakitos-black">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            '/ecomm-hero-shot-all packages.png',
            '/ecomm hero-1-package.png',
            '/ecomm-detail-lifestyle-closeup.png',
            '/zakitos-In_a_still_life_photography_style_a_black_pouch_b5.png',
          ].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={src}
                alt={`Zakitos ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
