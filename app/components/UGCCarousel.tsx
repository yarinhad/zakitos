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

// Mock UGC data — replace with real API integration (e.g. Taggbox, Yotpo)
const MOCK_UGC: UGCPost[] = [
  {
    id: '1',
    username: 'MikeHeatFreak',
    handle: '@mikeheatfreak',
    avatar: '/ugc-avatar-1.jpg',
    image: '/ecomm-detail-lifestyle-closeup.png',
    caption: "Level 5 Reaper and I'm still alive?? @zakitos you've created a MONSTER 🔥🔥",
    likes: 4821,
    heatReaction: '💀 RIP my tongue',
    platform: 'tiktok',
  },
  {
    id: '2',
    username: 'SarahSpiceQueen',
    handle: '@sarahspicequeen',
    avatar: '/ugc-avatar-2.jpg',
    image: '/ecomm-hero-shot-one-package.png',
    caption: 'Finally a snack that respects my heat tolerance. This is IT.',
    likes: 2340,
    heatReaction: '🔥 Pure fire',
    platform: 'instagram',
  },
  {
    id: '3',
    username: 'ChiliDave',
    handle: '@chilidave',
    avatar: '/ugc-avatar-3.jpg',
    image: '/zakitos-1-pack-package.png',
    caption: 'Garlic Chili flavor hits DIFFERENT. Already ordered 3 bags 😭',
    likes: 1987,
    heatReaction: '🧄🌶 OBSESSED',
    platform: 'instagram',
  },
  {
    id: '4',
    username: 'TastyTorture',
    handle: '@tastytorture',
    avatar: '/ugc-avatar-4.jpg',
    image: '/ecomm-hero-shot.png',
    caption: 'The #ZakitosChallenge is NO JOKE. Rated it 9/10 heat. Send help.',
    likes: 8102,
    heatReaction: '🚨 I need water',
    platform: 'tiktok',
  },
  {
    id: '5',
    username: 'FoodieJessica',
    handle: '@foodiejessica',
    avatar: '/ugc-avatar-5.jpg',
    image: '/zakitos-5-pack-package.png',
    caption: 'Gift set is perfect for my spice-head boyfriend. Packaging is 🔥🔥🔥',
    likes: 1234,
    heatReaction: '🎁 Best gift',
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
            href="https://instagram.com/explore/tags/zakitoschallenge"
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
