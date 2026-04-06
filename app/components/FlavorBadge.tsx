interface FlavorBadgeProps {
  flavor: string;
  className?: string;
}

const FLAVOR_CONFIG: Record<string, {bg: string; text: string; border: string}> = {
  classic:  {bg: 'rgba(232,23,11,0.1)',   text: '#E8170B', border: 'rgba(232,23,11,0.3)'},
  garlic:   {bg: 'rgba(255,184,0,0.1)',   text: '#FFB800', border: 'rgba(255,184,0,0.3)'},
  reaper:   {bg: 'rgba(139,0,0,0.2)',     text: '#FF2020', border: 'rgba(139,0,0,0.4)'},
  lime:     {bg: 'rgba(134,239,172,0.1)', text: '#4ade80', border: 'rgba(134,239,172,0.3)'},
  smoky:    {bg: 'rgba(120,113,108,0.2)', text: '#a8a29e', border: 'rgba(120,113,108,0.3)'},
  sweet:    {bg: 'rgba(251,191,36,0.1)',  text: '#fbbf24', border: 'rgba(251,191,36,0.3)'},
  habanero: {bg: 'rgba(255,85,0,0.12)',   text: '#FF5500', border: 'rgba(255,85,0,0.3)'},
  sriracha: {bg: 'rgba(185,28,28,0.12)',  text: '#ef4444', border: 'rgba(185,28,28,0.3)'},
};

export function FlavorBadge({flavor, className = ''}: FlavorBadgeProps) {
  const key = flavor.toLowerCase();
  const config = FLAVOR_CONFIG[key] ?? FLAVOR_CONFIG.classic;

  return (
    <span
      className={`inline-flex items-center gap-1 font-display text-xs tracking-widest uppercase px-2.5 py-1 ${className}`}
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        borderRadius: '999px',
      }}
    >
      {flavor}
    </span>
  );
}

interface FlavorTagsProps {
  tags: string[];
  maxShow?: number;
}

export function FlavorTags({tags, maxShow = 3}: FlavorTagsProps) {
  const flavorKeywords = Object.keys(FLAVOR_CONFIG);
  const flavorTags = tags
    .filter((tag) => flavorKeywords.some((f) => tag.toLowerCase().includes(f)))
    .slice(0, maxShow);

  if (flavorTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {flavorTags.map((tag) => (
        <FlavorBadge key={tag} flavor={tag} />
      ))}
    </div>
  );
}
