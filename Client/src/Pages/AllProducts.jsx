import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import ProductCard from '../Components/ProductCard'

const AllProducts = () => {
    const { products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [sortOption, setSortOption] = useState("");


    useEffect(() => {
        let filtered = [...products]; // ✅ prevent in-place mutation

        // Apply search filter
        if (searchQuery.length > 0) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sort
        if (sortOption === "priceLowHigh") {
            filtered.sort((a, b) => a.offerPrice - b.offerPrice);
        } else if (sortOption === "priceHighLow") {
            filtered.sort((a, b) => b.offerPrice - a.offerPrice);
        } else if (sortOption === "az") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "za") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(filtered);
    }, [products, searchQuery, sortOption]);     // 👈 Add sortOption here too

    return (
        <div className='mt-16 flex flex-col px-4 md:px-10 max-w-[1320px] mx-auto'>
            <div className='flex flex-col items-start w-full'>
                <p className='text-2xl md:text-3xl font-semibold text-gray-800'>All Products</p>
                <div className='w-20 h-1 bg-primary rounded-full mt-1'></div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
                <label htmlFor="sort" className="text-sm text-gray-600">Sort By:</label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 text-sm px-3 py-1 rounded-md focus:outline-none"
                >
                    <option value="">Default</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="az">Name: A-Z</option>
                    <option value="za">Name: Z-A</option>
                </select>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-8'>
                {filteredProducts.filter((product) => product.inStock).map((product, index) => (<ProductCard key={index} product={product} />))}
            </div>
        </div>


    )
}

export default AllProducts
