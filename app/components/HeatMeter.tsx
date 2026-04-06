import {getHeatTierName, getHeatColor, getShuRange} from '~/lib/utils';

interface HeatMeterProps {
  level: number; // 1-5
  showLabel?: boolean;
  showShu?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function HeatMeter({
  level,
  showLabel = true,
  showShu = false,
  size = 'md',
}: HeatMeterProps) {
  const tierName = getHeatTierName(level);
  const color = getHeatColor(level);
  const shuRange = getShuRange(level);
  const totalPips = 5;

  const sizeClasses = {
    sm: {pip: 'w-4 h-4 text-xs', label: 'text-xs', gap: 'gap-1'},
    md: {pip: 'w-5 h-5 text-sm', label: 'text-sm', gap: 'gap-1.5'},
    lg: {pip: 'w-7 h-7 text-base', label: 'text-base', gap: 'gap-2'},
  }[size];

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <div className="flex items-center gap-2">
          <span
            className={`font-display tracking-widest uppercase ${sizeClasses.label}`}
            style={{color}}
          >
            {tierName}
          </span>
          {showShu && (
            <span className="font-mono text-xs text-zakitos-muted">
              {shuRange}
            </span>
          )}
        </div>
      )}

      {/* Pip row */}
      <div className={`flex items-center ${sizeClasses.gap}`}>
        {Array.from({length: totalPips}).map((_, i) => {
          const active = i < level;
          return (
            <div
              key={i}
              className={`
                ${sizeClasses.pip}
                rounded-full
                transition-all duration-300
                flex items-center justify-center
                ${active ? 'scale-100' : 'opacity-25'}
              `}
              style={{
                backgroundColor: active ? color : 'transparent',
                border: `2px solid ${active ? color : 'rgba(245,235,217,0.2)'}`,
                boxShadow: active ? `0 0 8px ${color}60` : 'none',
              }}
            >
              {/* pip fill handled by background color */}
            </div>
          );
        })}
      </div>

      {/* Bar */}
      <div className="heat-bar w-full">
        <div
          className="heat-bar-fill"
          style={{width: `${(level / totalPips) * 100}%`}}
        />
      </div>
    </div>
  );
}

// Compact inline variant for product cards
export function HeatBadge({level}: {level: number}) {
  const tierName = getHeatTierName(level);
  const color = getHeatColor(level);

  return (
    <span
      className="inline-flex items-center gap-1 font-display text-xs tracking-widest uppercase px-2.5 py-1"
      style={{
        backgroundColor: `${color}22`,
        color,
        border: `1px solid ${color}44`,
        borderRadius: '999px',
      }}
    >
      {Array.from({length: level}).map((_, i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{background: color}}
        />
      ))}
      <span className="ml-1">{tierName}</span>
    </span>
  );
}
