import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  LiveReload,
} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {defer} from '@shopify/remix-oxygen';
import {Analytics, useNonce} from '@shopify/hydrogen';
import stylesheet from '~/styles/app.css?url';
import {Layout} from '~/components/Layout';

export function links() {
  return [
    {rel: 'stylesheet', href: stylesheet},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
    {
      rel: 'preload',
      as: 'image',
      href: '/zakitos-transparent-logo.png',
    },
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, cart} = context;

  const [cartData] = await Promise.all([cart.get()]);

  return defer({
    cart: cartData,
    shop: storefront.query(SHOP_QUERY),
    publicStoreDomain: context.env.PUBLIC_STORE_DOMAIN,
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
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-zakitos-black text-zakitos-cream">
        <Analytics.Provider
          cart={data.cart}
          shop={data.shop}
          consent={{checkoutDomain: data.publicStoreDomain}}
        >
          <Layout cart={data.cart}>
            <Outlet />
          </Layout>
        </Analytics.Provider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
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
