import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-semibold text-gray-800">
        Best Seller
      </p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10 mt-6'>
        {products.filter((product) => product.inStock).slice(0, 5).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default BestSeller;
