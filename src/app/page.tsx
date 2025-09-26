import Hero from "@/components/home/hero";
import Products from "@/components/home/products";


const Home = () => {
  return (
    <div className="w-full mx-auto bg-background-primary transition-all duration-300">
      <Hero />
      <Products />
    </div>
  );
};

export default Home;
