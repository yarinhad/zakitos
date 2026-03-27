import {Image} from '@shopify/hydrogen';

interface ImageData {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface SafeImageProps {
  data: ImageData;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  style?: React.CSSProperties;
}

/**
 * Wrapper around Hydrogen's <Image> that falls back to a plain <img>
 * for local/relative URLs (e.g. /public assets in mock data).
 * Hydrogen's Image component only works with absolute Shopify CDN URLs.
 */
export function SafeImage({data, className, loading, sizes, style}: SafeImageProps) {
  const isShopifyCdn =
    data.url.startsWith('https://') || data.url.startsWith('http://');

  if (isShopifyCdn) {
    return (
      <Image
        data={data}
        className={className}
        loading={loading}
        sizes={sizes}
        style={style}
      />
    );
  }

  return (
    <img
      src={data.url}
      alt={data.altText ?? ''}
      className={className}
      loading={loading ?? 'lazy'}
      width={data.width ?? undefined}
      height={data.height ?? undefined}
      style={style}
    />
  );
}

import type React from 'react';
