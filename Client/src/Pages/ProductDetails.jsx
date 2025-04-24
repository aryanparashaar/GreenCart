import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();
    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0 && product) {
            const filtered = products
                .filter((item) => product.category === item.category && item._id !== product._id)
                .slice(0, 5);
            setRelatedProducts(filtered);
        }
    }, [products, product]);

    useEffect(() => {
        setThumbnail(product?.image[0] || null);
    }, [product]);

    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="mt-12 px-4 md:px-8 lg:px-12 max-w-[1320px] mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="text-sm mb-8 text-gray-600">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link> / 
                <Link to="/products" className="hover:text-primary transition-colors"> Products</Link> / 
                <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors"> {product.category}</Link> / 
                <span className="text-primary font-medium"> {product.name}</span>
            </nav>

            {/* Main Product Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="flex flex-col-reverse md:flex-row gap-4 w-full lg:w-1/2">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2">
                        {product.image.map((image, index) => (
                            <div 
                                key={index} 
                                onClick={() => setThumbnail(image)}
                                className={`min-w-[80px] h-20 border rounded-md overflow-hidden cursor-pointer transition-all ${
                                    thumbnail === image 
                                        ? 'ring-2 ring-primary border-transparent' 
                                        : 'border-gray-200 hover:border-primary'
                                }`}
                            >
                                <img 
                                    src={image} 
                                    className="w-full h-full object-cover" 
                                    alt={`${product.name} thumbnail ${index + 1}`} 
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Main Image */}
                    <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden aspect-square">
                        <img 
                            src={thumbnail} 
                            className="w-full h-full object-contain p-4" 
                            alt={product.name} 
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <img 
                                key={i} 
                                src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                                className="w-4 h-4" 
                                alt={i < 4 ? "Filled star" : "Empty star"} 
                            />
                        ))}
                        <span className="text-gray-600 ml-1">(24 reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="mt-4">
                        <p className="text-lg text-gray-400 line-through">{currency}{product.price}</p>
                        <p className="text-2xl font-bold text-primary">{currency}{product.offerPrice}</p>
                        <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            {product.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button
                            onClick={() => addToCart(product._id)}
                            className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => { addToCart(product._id); navigate("/cart") }}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
                    <div className="w-16 h-1 bg-primary mx-auto mt-2"></div>
                </div>

                {relatedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {relatedProducts.filter(p => p.inStock).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">No related products found</p>
                )}

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/products')}
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                        View All Products
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="ml-1 w-4 h-4" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;