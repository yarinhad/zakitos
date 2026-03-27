import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

// Format money to display string
export function formatMoney(money: MoneyV2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(money.amount));
}

// Extract metafield value by key
export function getMetafield(
  metafields: Array<{key: string; namespace: string; value: string} | null> | null | undefined,
  namespace: string,
  key: string,
): string | null {
  if (!metafields) return null;
  const field = metafields.find(
    (m) => m?.namespace === namespace && m?.key === key,
  );
  return field?.value ?? null;
}

// Get heat level from tags or metafield (1-5)
export function getHeatLevel(tags: string[], metafields?: any): number {
  // Check metafield first
  if (metafields) {
    const heatField = getMetafield(metafields, 'zakitos', 'heat_level');
    if (heatField) return parseInt(heatField, 10);
  }
  // Fall back to tags
  const heatTag = tags.find((t) => t.startsWith('heat-'));
  if (heatTag) {
    return parseInt(heatTag.replace('heat-', ''), 10) || 1;
  }
  return 2; // Default: medium heat
}

// Get flavor type from tags
export function getFlavorType(tags: string[]): string {
  const flavorTypes = ['classic', 'garlic', 'reaper', 'lime', 'smoky', 'sweet'];
  const tag = tags.find((t) => flavorTypes.some((f) => t.toLowerCase().includes(f)));
  return tag ?? 'classic';
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Get heat tier name by level
export function getHeatTierName(level: number): string {
  const tiers: Record<number, string> = {
    1: 'Mild',
    2: 'Medium',
    3: 'Hot',
    4: 'Fire',
    5: 'REAPER',
  };
  return tiers[level] ?? 'Hot';
}

// Get heat tier color by level
export function getHeatColor(level: number): string {
  const colors: Record<number, string> = {
    1: '#FFB800',
    2: '#FF8C00',
    3: '#FF5500',
    4: '#E8170B',
    5: '#8B0000',
  };
  return colors[level] ?? '#FF5500';
}

// Build product URL
export function productUrl(handle: string): string {
  return `/products/${handle}`;
}

// Build collection URL
export function collectionUrl(handle: string): string {
  return `/collections/${handle}`;
}

// SHU range by heat level
export function getShuRange(level: number): string {
  const ranges: Record<number, string> = {
    1: '500–2,500 SHU',
    2: '2,500–10,000 SHU',
    3: '10,000–100,000 SHU',
    4: '100,000–350,000 SHU',
    5: '1,000,000+ SHU',
  };
  return ranges[level] ?? '10,000+ SHU';
}

// Truncate text
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '…';
}

// Check if product is on sale
export function isOnSale(
  price: MoneyV2,
  compareAtPrice: MoneyV2 | null | undefined,
): boolean {
  if (!compareAtPrice) return false;
  return parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
}

// Calculate discount percentage
export function discountPercent(
  price: MoneyV2,
  compareAtPrice: MoneyV2 | null | undefined,
): number {
  if (!compareAtPrice) return 0;
  const original = parseFloat(compareAtPrice.amount);
  const current = parseFloat(price.amount);
  return Math.round(((original - current) / original) * 100);
}
