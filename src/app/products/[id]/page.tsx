import ProductDetails from "@/components/product-details/product-details";

// Main component for rendering the product page
const Product = () => {
  return (
    // Container for centering and laying out the ProductDetails component
    <div className="w-full mx-auto flex">
      <ProductDetails />
    </div>
  );
};

export default Product;
