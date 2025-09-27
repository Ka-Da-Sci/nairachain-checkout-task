'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import { productSchema } from '@/lib/zod-schemas';
import { CartItem } from '@/utils/types';
import ProductDetailsInnerWrapper from './product-details-inner-wrapper';

const ProductDetails = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: products, isLoading, error } = useQuery<CartItem[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="w-full mx-auto flex justify-center items-center h-screen">
        <p className="font-inter text-sm">Loading product...</p>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="w-full mx-auto flex justify-center items-center h-screen">
        <p className="font-inter text-sm text-red-500">Error loading product: {error?.message || 'Product not found'}</p>
      </div>
    );
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="w-full mx-auto flex justify-center items-center h-screen">
        <p className="font-inter text-sm text-red-500">Product not found</p>
      </div>
    );
  }

  // Validate product with Zod
  try {
    const validatedProduct = productSchema.parse(product);
    return (
      <div className="w-full mx-auto flex">
        <ProductDetailsInnerWrapper product={validatedProduct} />
      </div>
    );
  } catch (validationError) {
    console.error('Product validation failed:', validationError);
    return (
      <div className="w-full mx-auto flex justify-center items-center h-screen">
        <p className="font-inter text-sm text-red-500">Invalid product data</p>
      </div>
    );
  }
};

export default ProductDetails;