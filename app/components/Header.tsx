import {Link, NavLink, useNavigate} from '@remix-run/react';
import type {CartReturn} from '@shopify/hydrogen';
import {useState, useEffect, useRef} from 'react';

interface HeaderProps {
  cart: CartReturn | null;
}

export function Header({cart}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const cartCount = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-zakitos-red py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/zakitos_snacks" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@zakitos" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/80 hover:text-white transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/zakitos" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
          <p className="font-display text-xs tracking-widest text-white uppercase text-center flex-1">
            Free shipping on orders over $35 · Use code <span className="text-zakitos-gold">FIRSTBURN</span> for 15% off
          </p>
          <div className="w-[46px]" />
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-zakitos-black/95 backdrop-blur-md border-b border-zakitos-border shadow-sm'
            : 'bg-zakitos-black/90 backdrop-blur-md border-b border-zakitos-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0" prefetch="intent">
              <img
                src="/zakitos-transparent-logo.png"
                alt="Zakitos"
                className="h-16 w-auto brightness-0"
                loading="eager"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink
                to="/products/shop-all"
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                prefetch="intent"
              >
                Shop All
              </NavLink>
              <NavLink
                to="/about"
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                prefetch="intent"
              >
                Our Story
              </NavLink>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center justify-center w-9 h-9 text-zakitos-muted hover:text-zakitos-cream transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                prefetch="intent"
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zakitos-card border border-zakitos-border hover:border-zakitos-red hover:bg-zakitos-dark transition-colors"
                aria-label={`Cart — ${cartCount} items`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-zakitos-cream">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 rounded-full bg-zakitos-red flex items-center justify-center font-mono text-[10px] text-white font-bold px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 text-zakitos-cream"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div
            className="fixed inset-0 z-50 bg-zakitos-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <div className="w-full max-w-2xl bg-zakitos-card border border-zakitos-border rounded-2xl shadow-2xl overflow-hidden">
              <form onSubmit={handleSearch} className="flex items-center gap-3 px-4 py-3 border-b border-zakitos-border">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-zakitos-muted flex-shrink-0">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  className="flex-1 bg-transparent text-zakitos-cream placeholder-zakitos-muted text-base outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-zakitos-muted hover:text-zakitos-cream transition-colors text-xs font-mono tracking-widest"
                >
                  ESC
                </button>
              </form>
              <div className="px-4 py-3">
                <p className="text-zakitos-muted text-xs font-mono tracking-widest uppercase mb-2">Quick links</p>
                <div className="flex flex-wrap gap-2">
                  {['Crunch Chaos', '1-Pack', '5-Pack', '20-Pack'].map((label) => (
                    <button
                      key={label}
                      onClick={() => {
                        setSearchQuery(label);
                        navigate(`/search?q=${encodeURIComponent(label)}`);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="font-mono text-xs text-zakitos-cream bg-zakitos-dark border border-zakitos-border px-3 py-1.5 rounded-full hover:border-zakitos-red transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-zakitos-dark border-t border-zakitos-border">
            <nav className="px-4 py-6 flex flex-col gap-1">
              {[
                {to: '/products/shop-all', label: 'Shop All'},
                {to: '/about', label: 'Our Story'},
              ].map(({to, label}) => (
                <NavLink
                  key={to}
                  to={to}
                  prefetch="intent"
                  onClick={() => setMenuOpen(false)}
                  className={({isActive}) =>
                    `font-display text-2xl tracking-wide py-2 transition-colors ${
                      isActive ? 'text-zakitos-red' : 'text-zakitos-cream hover:text-zakitos-orange'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
