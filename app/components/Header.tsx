import {Link, NavLink, useRouteLoaderData} from '@remix-run/react';
import type {CartReturn} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';

interface HeaderProps {
  cart: CartReturn | null;
}

export function Header({cart}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-zakitos-red py-2 px-4 text-center">
        <p className="font-display text-xs tracking-widest text-white uppercase">
          Free shipping on orders over $35 · Use code <span className="text-zakitos-gold">FIRSTBURN</span> for 15% off
        </p>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-zakitos-black/95 backdrop-blur-md border-b border-zakitos-border shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0" prefetch="intent">
              <img
                src="/zakitos-logo.png"
                alt="Zakitos"
                className="h-16 w-auto"
                loading="eager"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink
                to="/collections/all"
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                prefetch="intent"
              >
                Shop All
              </NavLink>
              <NavLink
                to="/collections/snacks"
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                prefetch="intent"
              >
                Snacks
              </NavLink>
              <NavLink
                to="/collections/bundles"
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                prefetch="intent"
              >
                Bundles
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
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zakitos-card border border-zakitos-border hover:border-zakitos-red transition-colors"
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-zakitos-dark border-t border-zakitos-border">
            <nav className="px-4 py-6 flex flex-col gap-1">
              {[
                {to: '/collections/all', label: 'Shop All'},
                {to: '/collections/snacks', label: 'Snacks'},
                {to: '/collections/bundles', label: 'Bundles'},
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
