'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import useCartStore from './store/cart-store';
import Header from './header';
import QueryClientProvider from '@/lib/tanstack-wrapper';
const CartModal = dynamic(() => import('./cart-modal'), {
  ssr: false,
});

const RootLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const {
    isCartModalOpen,
  } = useCartStore();


  return (
    <QueryClientProvider>
      <main className="w-full">
        <Header />
        {children}
        {isCartModalOpen && <CartModal />}
      </main>
    </QueryClientProvider>
  );
};

export default RootLayoutWrapper;
