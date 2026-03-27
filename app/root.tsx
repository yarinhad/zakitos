import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {json} from '@shopify/remix-oxygen';
import {Analytics, useNonce} from '@shopify/hydrogen';
import stylesheet from '~/styles/app.css?url';
import {Layout} from '~/components/Layout';

export function links() {
  return [
    {rel: 'stylesheet', href: stylesheet},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
    {rel: 'preload', as: 'image', href: '/zakitos-transparent-logo.png'},
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, cart} = context;

  // Await everything — no defer needed in root so Analytics.Provider gets resolved data
  const [cartData, shopData] = await Promise.all([
    cart.get().catch(() => null),
    storefront.query(SHOP_QUERY).catch(() => null),
  ]);

  return json({
    cart: cartData,
    shop: shopData,
    publicStoreDomain: context.env.PUBLIC_STORE_DOMAIN ?? '',
  });
}

export function meta() {
  return [
    {title: 'Zakitos — Real Heat. Real Chili.'},
    {name: 'description', content: 'Premium artisanal dried chili snack strips. Unapologetically bold. Clean ingredients. Maximum heat.'},
    {property: 'og:title', content: 'Zakitos — Real Heat. Real Chili.'},
    {property: 'og:type', content: 'website'},
  ];
}

export default function App() {
  const nonce = useNonce();
  const {cart, shop, publicStoreDomain} = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-zakitos-black text-zakitos-cream">
        {shop ? (
          <Analytics.Provider
            cart={cart as any}
            shop={shop as any}
            consent={{checkoutDomain: publicStoreDomain || 'zakitos.myshopify.com'}}
          >
            <Layout cart={cart as any}>
              <Outlet />
            </Layout>
          </Analytics.Provider>
        ) : (
          // No Shopify credentials yet — render without analytics
          <Layout cart={null}>
            <Outlet />
          </Layout>
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body className="bg-zakitos-black text-zakitos-cream min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display text-8xl text-zakitos-red mb-4">500</h1>
          <p className="text-zakitos-muted text-lg mb-8">Something went wrong. Even the hottest chilies have off days.</p>
          <a href="/" className="btn-fire">Back to Home</a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

const SHOP_QUERY = `#graphql
  query ShopLayout {
    shop {
      id
      name
      description
      primaryDomain {
        url
      }
      brand {
        logo {
          image {
            url
          }
        }
      }
    }
  }
`;
