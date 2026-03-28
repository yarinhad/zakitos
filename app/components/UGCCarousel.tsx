import {useState} from 'react';

interface UGCPost {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  heatReaction: string;
  platform: 'tiktok' | 'instagram';
}

// UGC data using real brand social imagery
const MOCK_UGC: UGCPost[] = [
  {
    id: '1',
    username: 'ZakitosOfficial',
    handle: '@zakitos',
    avatar: '/zakitos-logo.png',
    image: '/social-1.jpg',
    caption: "Dragon Fire Blend — not for the faint-hearted. Are you brave enough? 🔥",
    likes: 4821,
    heatReaction: '💀 Dragon-level heat',
    platform: 'instagram',
  },
  {
    id: '2',
    username: 'ZakitosOfficial',
    handle: '@zakitos',
    avatar: '/zakitos-logo.png',
    image: '/social-2.jpg',
    caption: 'Close-up never lies. Real chili. Real texture. Real heat. 🌶',
    likes: 2340,
    heatReaction: '🔥 Pure fire',
    platform: 'instagram',
  },
  {
    id: '3',
    username: 'ZakitosOfficial',
    handle: '@zakitos',
    avatar: '/zakitos-logo.png',
    image: '/social-3.jpg',
    caption: 'The full lineup. One for every level of courage. Which one are you?',
    likes: 3987,
    heatReaction: '🌶 Full heat scale',
    platform: 'tiktok',
  },
  {
    id: '4',
    username: 'ZakitosOfficial',
    handle: '@zakitos',
    avatar: '/zakitos-logo.png',
    image: '/social-4.png',
    caption: 'When the heat hits different. #ZakitosChallenge 🔥🔥🔥',
    likes: 8102,
    heatReaction: '🚨 Send help',
    platform: 'tiktok',
  },
  {
    id: '5',
    username: 'ZakitosOfficial',
    handle: '@zakitos',
    avatar: '/zakitos-logo.png',
    image: '/social-6.png',
    caption: 'Bold by design. The dragon never sleeps. 🐉',
    likes: 5431,
    heatReaction: '💀 Legendary',
    platform: 'instagram',
  },
  {
    id: '6',
    username: 'ZakitosOfficial',
    handle: '@zakitos',
    avatar: '/zakitos-logo.png',
    image: '/social-7.jpg',
    caption: 'Art meets heat. The Zakitos universe is expanding. 🌶🐉',
    likes: 6230,
    heatReaction: '🔥 Iconic',
    platform: 'instagram',
  },
];

export function UGCCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-zakitos-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-mono text-zakitos-red text-xs tracking-widest uppercase mb-2">
            #ZakitosChallenge
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide">
            REAL PEOPLE.
            <br />
            <span className="text-gradient-fire">REAL REACTIONS.</span>
          </h2>
          <p className="text-zakitos-muted mt-4 max-w-md mx-auto">
            Post your reaction, tag @zakitos, and you might end up here.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_UGC.map((post, index) => (
            <UGCCard
              key={post.id}
              post={post}
              featured={index === 0}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/zakitos_snacks"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-fire inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            See All Reactions
          </a>
        </div>
      </div>
    </section>
  );
}

function UGCCard({
  post,
  featured,
  onHover,
}: {
  post: UGCPost;
  featured: boolean;
  onHover: () => void;
}) {
  return (
    <div
      className={`ugc-card rounded-none cursor-pointer ${featured ? 'md:col-span-1 row-span-2' : ''}`}
      onMouseEnter={onHover}
    >
      <div className={`relative ${featured ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden`}>
        <img
          src={post.image}
          alt={`${post.handle} reaction`}
          className="img-fill object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="overlay" />

        {/* Platform badge */}
        <div className="absolute top-2 right-2 z-10">
          {post.platform === 'tiktok' ? (
            <span className="badge-dark text-[10px] px-1.5 py-0.5">TT</span>
          ) : (
            <span className="badge-dark text-[10px] px-1.5 py-0.5">IG</span>
          )}
        </div>

        {/* Hover content */}
        <div className="absolute inset-0 p-3 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
          <p className="font-mono text-zakitos-red text-xs font-bold mb-1">
            {post.heatReaction}
          </p>
          <p className="text-zakitos-cream text-xs line-clamp-2 leading-tight">
            {post.caption}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-zakitos-muted text-[10px]">{post.handle}</span>
            <span className="text-zakitos-muted text-[10px] flex items-center gap-0.5">
              ♥ {post.likes.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
