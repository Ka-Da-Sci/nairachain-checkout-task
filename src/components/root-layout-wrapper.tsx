'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import useCartStore from './store/cart-store';
import Header from './header';
import QueryClientProvider from '@/lib/tanstack-wrapper';
import UtilityHoverCard from './utility-hover-card';
const CartCheckoutModal = dynamic(() => import('./cart-checkout-modal'), {
  ssr: false,
});

// Root Layout wrapper component
const RootLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const {
    isCartModalOpen,
    showUtilityCardModal
  } = useCartStore();


  return (
    <QueryClientProvider>
      <main className="w-full">
        <Header />
        {children}
        {isCartModalOpen && <CartCheckoutModal />}
      {showUtilityCardModal && <UtilityHoverCard />}

      </main>
    </QueryClientProvider>
  );
};

export default RootLayoutWrapper;
