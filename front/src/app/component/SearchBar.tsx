"use client";

import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import NotFoundPage from "../404/404";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

const SearchComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3001/products");
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const productsData: Product[] = await response.json();
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                NotFoundPage;
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ProductItem = ({ product }: { product: Product }) => (
        <article className="rounded-xl border-2 border-gray-100 bg-white">
            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                <a href={`http://localhost:3000/products/${product.id}`} className="block shrink-0">
                    <Image
                        alt=""
                        src={product.image}
                        width={56}
                        height={56}
                        className="rounded-lg object-cover"
                    />
                </a>

                <div>
                    <p className="font-medium sm:text-lg text-md">
                        <a href={`http://localhost:3000/products/${product.id}`} className="hover:underline">{product.name}</a>
                    </p>

                    <p className="line-clamp-2 text-sm text-gray-700">
                        {product.description}
                    </p>

                    <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                        <div className="text-gray-500 font-medium">{product.price}</div>
                    </div>
                </div>
            </div>
        </article>
    );

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 text-white px-10 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <BsSearch />
            </span>
            {searchTerm.length > 0 && !loading && (
                <div className="absolute z-10 bg-white text-blue-700 w-full rounded-md mt-1">
                    {filteredProducts.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
