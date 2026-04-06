import {Link} from '@remix-run/react';
import {useEffect, useRef, useState} from 'react';

interface HeroSectionProps {
  videoSrc?: string;
  imageSrc?: string;
}

export function HeroSection({
  videoSrc,
  imageSrc = '/ecomm-hero-shot.png',
}: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zakitos-black">
      {/* Background media */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          />
        ) : (
          <img
            src={imageSrc}
            alt="Zakitos Hero"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              loaded ? 'opacity-35' : 'opacity-0'
            }`}
            loading="eager"
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-zakitos-black via-zakitos-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zakitos-black via-transparent to-transparent" />
        {/* Ember glow */}
        <div className="absolute inset-0 bg-ember-glow" />
      </div>

      {/* Ember particles */}
      <EmberParticles />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col justify-between min-h-[80vh]">
        <div className="max-w-3xl">
          {/* Pre-headline */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{transitionDelay: '100ms'}}
          >
            <div className="h-px w-8 bg-zakitos-red" />
            <span className="font-mono text-zakitos-red text-xs tracking-widest uppercase">
              Whole Dried Chili Snacks
            </span>
          </div>

          {/* Main headline — 2 lines, wide */}
          <h1
            className={`font-display leading-none tracking-wide transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{transitionDelay: '200ms', fontSize: 'clamp(72px, 11vw, 148px)'}}
          >
            <span className="text-zakitos-cream block">BORN FROM</span>
            <span className="text-gradient-fire block">THE HEAT.</span>
          </h1>

          {/* Sub-copy + CTAs row */}
          <div
            className={`flex flex-col sm:flex-row sm:items-end gap-6 mt-8 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{transitionDelay: '380ms'}}
          >
            <p className="text-zakitos-warm text-base md:text-lg max-w-xs leading-relaxed flex-shrink-0">
              No artificial anything —<br />
              just bold, whole chili flavor<br />
              built for the fearless.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/collections/all" className="btn-fire text-base px-8 py-4" prefetch="intent">
                Shop Now
              </Link>
              <Link to="/about" className="btn-ghost text-base px-8 py-4" prefetch="intent">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className={`flex items-center gap-8 mt-16 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{transitionDelay: '560ms'}}
        >
          {[
            {value: '4.9/5', label: '2,400+ reviews'},
            {value: '5', label: 'heat levels'},
            {value: '0', label: 'artificial additives'},
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-8">
              {i > 0 && <div className="w-px h-8 bg-zakitos-border" />}
              <div className="flex flex-col">
                <span className="font-display text-xl text-zakitos-cream">{stat.value}</span>
                <span className="text-zakitos-muted text-xs font-mono">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-zakitos-muted text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zakitos-ember to-transparent animate-pulse" />
      </div>

      {/* Diagonal bottom cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'var(--color-black)',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
        }}
      />
    </section>
  );
}

// CSS-only ember particles
function EmberParticles() {
  const particles = Array.from({length: 12});
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            backgroundColor: i % 3 === 0 ? '#E8170B' : i % 3 === 1 ? '#FF5500' : '#FFB800',
            animation: `ember-rise ${3 + Math.random() * 4}s ease-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}
