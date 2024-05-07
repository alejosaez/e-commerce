// Importa Image desde next/image
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CardHome from './component/CardHome';
import Carousel from './component/Carousel';
import { FaTruck } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { useAppContext } from '@/context';
import ProductSummaryHome from './component/ProductSummaryHome';
import Loading from "@/app/component/Loading";
import NotFoundPage from './404/404';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, userRole, userId } = useAppContext();

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

  return (
    <div className="container mx-auto">
      <Carousel />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-8">
        <div className="p-2 rounded-lg justify-center flex items-center">
          <FaTruck size={36} />
          <div className='items-center ml-6'>
            <p className="text-lg font-semibold text-white">Free Shipping Worldwide</p>
            <p className="text-white text-sm mt-1">We offer free shipping to all our customers worldwide.</p>
          </div>
        </div>
        <div className="p-2 rounded-lg justify-center flex items-center">
          <MdHeadsetMic size={36} />
          <div className='items-center ml-6'>
            <p className="text-lg font-semibold text-white">24/7 Customer Service</p>
            <p className="text-white text-sm mt-1">Our customer service team is available 24/7 to assist you.</p>
          </div>
        </div>
        <div className="p-2 rounded-lg justify-center flex items-center">
          <CiDiscount1 size={40} />
          <div className='items-center ml-6'>
            <p className="text-lg font-semibold text-white">Money Back Guarantee</p>
            <p className="text-white text-sm mt-1">We offer a money back guarantee on all our products.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-lg">
            {/* Reemplazo de <img> con <Image /> */}
            <Image
              src={`https://via.placeholder.com/400x300?text=Product+${index + 1}`}
              alt={`Product ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-8">Top Product</h1>
      {loading ? (
        <Loading progress={75} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {products.slice(0, 4).map((product) => (
            <ProductSummaryHome key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
