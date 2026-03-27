import {
  createStorefrontClient,
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';
import type {
  Storefront,
  HydrogenCart,
} from '@shopify/hydrogen';

export interface Env {
  SESSION_SECRET?: string;
  PUBLIC_STOREFRONT_API_TOKEN?: string;
  PRIVATE_STOREFRONT_API_TOKEN?: string;
  PUBLIC_STORE_DOMAIN?: string;
  PUBLIC_STOREFRONT_ID?: string;
  PUBLIC_STOREFRONT_API_VERSION?: string;
  PUBLIC_CHECKOUT_DOMAIN?: string;
}

declare module '@shopify/remix-oxygen' {
  export interface AppLoadContext {
    env: Env;
    cart: HydrogenCart;
    storefront: Storefront;
  }
}

export async function createAppLoadContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const cache = await caches.open('hydrogen');

  const {storefront} = createStorefrontClient({
    cache,
    waitUntil,
    publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN ?? '',
    privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN ?? '',
    storeDomain: env.PUBLIC_STORE_DOMAIN ?? 'zakitos.myshopify.com',
    storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION ?? '2024-01',
    storefrontId: env.PUBLIC_STOREFRONT_ID ?? '',
  });

  const cart = createCartHandler({
    storefront,
    getCartId: cartGetIdDefault(request.headers),
    setCartId: cartSetIdDefault(),
  });

  return {
    storefront,
    cart,
    env,
    waitUntil,
  };
}
