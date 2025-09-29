import Hero from "@/components/home/hero";
import Products from "@/components/home/products";

// Main component for the homepage
const Home = () => {
  return (
    
    // Container for the homepage with full width, centered, and themed background
    <div className="w-full mx-auto bg-background-primary transition-all duration-300">
      <Hero />
      <Products />
    </div>
  );
};

export default Home;
