import {Link} from '@remix-run/react';

export function Footer() {
  return (
    <footer className="bg-zakitos-dark border-t border-zakitos-border">
      {/* Email capture */}
      <div className="bg-zakitos-card py-14 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-display text-4xl md:text-5xl text-zakitos-cream mb-2 tracking-wide">
            JOIN THE <span className="text-gradient-fire">HEAT TRIBE</span>
          </p>
          <p className="text-zakitos-muted mb-6 text-sm">
            First-access drops, challenge invites, and a 15% welcome offer.
          </p>
          <form
            action="https://manage.klaviyo.com/email-signup/subscribe"
            method="POST"
            className="flex gap-0 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="input-fire flex-1 rounded-none"
            />
            <button type="submit" className="btn-fire px-6 text-sm">
              Ignite
            </button>
          </form>
          <p className="text-zakitos-muted text-xs mt-3">
            No spam. Just fire. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/zakitos-transparent-logo.png"
              alt="Zakitos"
              className="h-8 w-auto mb-4 brightness-0"
            />
            <p className="text-zakitos-muted text-sm leading-relaxed max-w-xs">
              Premium artisanal dried chili snacks. Real heat. Real chili. No shortcuts.
            </p>
            <div className="flex gap-3 mt-4">
              {/* TikTok */}
              <a href="https://www.tiktok.com/@zakitos_snacks" aria-label="TikTok" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-zakitos-muted hover:text-zakitos-red transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.83 4.83 0 01-1.01-.05z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/zakitos_snacks" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-zakitos-muted hover:text-zakitos-red transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61575473248993" aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-zakitos-muted hover:text-zakitos-red transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-sm tracking-widest uppercase text-zakitos-cream mb-4">Shop</h4>
            <ul className="space-y-2">
              {[
                {to: '/collections/all', label: 'All Products'},
                {to: '/collections/snacks', label: 'Snacks'},
                {to: '/collections/bundles', label: 'Bundles & Gifts'},
                {to: '/collections/new', label: 'New Arrivals'},
              ].map(({to, label}) => (
                <li key={to}>
                  <Link to={to} className="text-zakitos-muted text-sm hover:text-zakitos-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-display text-sm tracking-widest uppercase text-zakitos-cream mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                {to: '/about', label: 'Our Story'},
                {to: '/pages/heat-scale', label: 'Heat Scale Guide'},
                {to: '/pages/sourcing', label: 'Sourcing'},
                {to: '/blogs/news', label: 'The Weekly Burn'},
              ].map(({to, label}) => (
                <li key={to}>
                  <Link to={to} className="text-zakitos-muted text-sm hover:text-zakitos-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-sm tracking-widest uppercase text-zakitos-cream mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                {to: '/pages/faq', label: 'FAQ'},
                {to: '/pages/shipping', label: 'Shipping & Returns'},
                {to: '/pages/contact', label: 'Contact Us'},
                {to: '/pages/privacy', label: 'Privacy Policy'},
              ].map(({to, label}) => (
                <li key={to}>
                  <Link to={to} className="text-zakitos-muted text-sm hover:text-zakitos-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:support@zakitos.com"
                  className="text-zakitos-muted text-sm hover:text-zakitos-cream transition-colors"
                >
                  support@zakitos.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-fire my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zakitos-muted text-xs font-mono">
            © {new Date().getFullYear()} ZAKITOS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-zakitos-muted text-xs font-mono">HEAT LEVEL:</span>
            <div className="flex gap-1 items-center">
              {[1,2,3,4,5].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full inline-block"
                  style={{background: `rgba(232,23,11,${0.3 + i * 0.14})`}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
