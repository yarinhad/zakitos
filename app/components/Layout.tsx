import type {ReactNode} from 'react';
import type {CartReturn} from '@shopify/hydrogen';
import {Header} from '~/components/Header';
import {Footer} from '~/components/Footer';

interface LayoutProps {
  children: ReactNode;
  cart: CartReturn | null;
}

export function Layout({children, cart}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header cart={cart} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
