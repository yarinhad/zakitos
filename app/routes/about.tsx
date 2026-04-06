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
                src="/lifestyle-chili-closeup.png"
                alt="Zakitos Chili Closeup"
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
                svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                title: 'Boldness',
                description: "We don't do mild. In product, brand, and culture.",
                color: '#E8170B',
              },
              {
                svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: 'Authenticity',
                description: 'Real chilies, real sourcing, real heat — no artificial shortcuts.',
                color: '#FFB800',
              },
              {
                svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                title: 'Community',
                description: 'Chili lovers are our tribe. We build with them, not just for them.',
                color: '#FF5500',
              },
              {
                svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                title: 'Craftsmanship',
                description: 'Every bag is a deliberate act of flavor engineering.',
                color: '#E8170B',
              },
            ].map(({svg, title, description, color}) => (
              <div
                key={title}
                className="card-dark p-6 group hover:border-zakitos-red/50"
              >
                <div
                  className="mb-4 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{backgroundColor: `${color}18`, border: `2px solid ${color}30`, color}}
                >
                  {svg}
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
                Explore the Range
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
          className="absolute right-0 bottom-0 font-display leading-none pointer-events-none select-none"
          aria-hidden
          style={{fontSize: '18rem', color: 'rgba(232,23,11,0.05)'}}
        >
          Z
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
              {tier: 'Jalapeño', points: '0–500 pts', perk: 'Free shipping on all orders'},
              {tier: 'Habanero', points: '500–2K pts', perk: 'Exclusive flavor samples'},
              {tier: 'Reaper', points: '2K+ pts', perk: 'Limited drops & co-creation'},
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

      {/* ── Magic Plant Farms — Sourcing Partner ──────────────── */}
      <section className="py-24 bg-zakitos-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-mono text-zakitos-ember text-xs tracking-widest uppercase mb-2">
              Where Our Chilies Come From
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-zakitos-cream tracking-wide leading-none">
              GROWN AT THE
              <br />
              <span className="text-gradient-fire">SOURCE.</span>
            </h2>
            <p className="text-zakitos-muted mt-4 max-w-xl mx-auto text-base">
              Zakitos is powered by Magic Plant Farms — a world-class agricultural
              partner with decades of experience bringing the finest Capsicum
              products from farm to table.
            </p>
          </div>

          {/* Two-column: intro + location */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* About MPF */}
            <div className="card-dark p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M12 12C12 7 8 3 3 3c0 5 4 9 9 9"/><path d="M12 12c0-5 4-9 9-9c0 5-4 9-9 9"/></svg>
                </div>
                <h3 className="font-display text-2xl text-zakitos-cream tracking-wide">
                  MAGIC PLANT FARMS
                </h3>
              </div>
              <div className="space-y-4 text-zakitos-muted text-sm leading-relaxed">
                <p>
                  Magic Plant Farms is an international agricultural project management
                  company specializing in Capsicum products. Through years of experience,
                  deep-rooted connections, and rigorous knowledge of the supply chain,
                  they&apos;ve perfected the formula: <strong className="text-zakitos-cream">high-quality agro products
                  year-round, at the lowest cost, with premium service.</strong>
                </p>
                <p>
                  They grow a wide selection of Capsicums and process a broad variety of
                  products — helping food companies access a whole world of chili peppers
                  and spices. Their mission aligns perfectly with ours: develop new
                  products and spread bold new flavors across the food industry.
                </p>
                <p className="text-zakitos-cream italic">
                  &quot;We provide an extraordinary and economic supply solution to the
                  agriculture consumer.&quot;
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="card-dark p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(232,23,11,0.12)', border: '1px solid rgba(232,23,11,0.25)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8170B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
                </div>
                <h3 className="font-display text-2xl text-zakitos-cream tracking-wide">
                  GLOBAL REACH
                </h3>
              </div>
              <div className="space-y-5 text-zakitos-muted text-sm leading-relaxed">
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                    style={{backgroundColor: 'rgba(232,23,11,0.12)', border: '1px solid rgba(232,23,11,0.25)', color: '#E8170B'}}
                  >
                    US
                  </div>
                  <div>
                    <p className="font-display text-sm text-zakitos-cream tracking-wide mb-1">
                      US WAREHOUSE — TRI-CITIES, TENNESSEE
                    </p>
                    <p>
                      Located in the scenic Tri-Cities area of Northeastern Tennessee.
                      Conveniently near multiple transportation terminals, three major
                      interstates, and Tri-Cities Regional Airport (25 min away) — built
                      for fast, reliable shipping nationwide.
                    </p>
                  </div>
                </div>

                <div className="divider-fire" />

                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                    style={{backgroundColor: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.25)', color: '#FFB800'}}
                  >
                    WW
                  </div>
                  <div>
                    <p className="font-display text-sm text-zakitos-cream tracking-wide mb-1">
                      EXCLUSIVE CROPS — WORLDWIDE
                    </p>
                    <p>
                      Exclusive crops cultivated across <strong className="text-zakitos-warm">Asia, Africa,
                      South America, and the Middle East.</strong> Each region chosen for
                      optimal growing conditions that produce the authentic heat and flavor
                      profile you taste in every Zakitos bag.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {stat: '4', label: 'Continents', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>},
              {stat: '100%', label: 'Capsicum Specialists', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>},
              {stat: 'Year-Round', label: 'Supply Guarantee', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>},
              {stat: 'Direct', label: 'Farm-to-Bag Sourcing', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M12 12C12 7 8 3 3 3c0 5 4 9 9 9"/><path d="M12 12c0-5 4-9 9-9c0 5-4 9-9 9"/></svg>},
            ].map(({stat, label, svg}) => (
              <div key={label} className="bg-zakitos-card border border-zakitos-border p-5 text-center">
                <div className="flex justify-center mb-2 text-zakitos-red">{svg}</div>
                <div className="font-display text-2xl text-zakitos-red mb-1">{stat}</div>
                <div className="font-mono text-xs text-zakitos-muted tracking-wide uppercase">{label}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-zakitos-muted text-xs font-mono mt-8 italic">
            Powered by Magic Plant Farms — sourcing and shipping worldwide.
          </p>
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────────────────────── */}
      <section className="bg-zakitos-black">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            '/ecomm-hero-shot-all packages.png',
            '/ecomm hero-1-package.png',
            '/ecomm-detail-lifestyle-closeup.png',
            '/lifestyle-friends-snacking.png',
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
