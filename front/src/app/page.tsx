'use client'

import React, { useState, useEffect } from 'react';
import CardHome from './component/CardHome'
import Carousel from './component/Carousel';
import { FaTruck } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { useAppContext } from '@/context';
import ProductSummaryHome from './component/ProductSummaryHome';

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
        {/* Tarjeta 1 */}
        <div className="p-2 rounded-lg justify-center flex items-center">
          <FaTruck size={36} />
          <div className='items-center ml-6'>
            <p className="text-lg font-semibold text-white">Free Shipping Worldwide</p>
            <p className="text-white text-sm mt-1">We offer free shipping to all our customers worldwide.</p>
          </div>
        </div>

        {/* Tarjeta 2 */}

        <div className="p-2 rounded-lg justify-center flex items-center">
          <MdHeadsetMic size={36} />
          <div className='items-center ml-6'>
            <p className="text-lg font-semibold text-white">24/7 Customer Service</p>
            <p className="text-white text-sm mt-1">Our customer service team is available 24/7 to assist you.</p>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="p-2 rounded-lg justify-center flex items-center">
          <CiDiscount1 size={40} />
          <div className='items-center ml-6'>
            <p className="text-lg font-semibold text-white">Money Back Guarantee</p>
            <p className="text-white text-sm mt-1">We offer a money back guarantee on all our products.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mb-4">
  <div className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-105">
    <img src="https://www.shutterstock.com/image-illustration/mockup-three-cell-phones-front-600nw-1986039059.jpg" alt="Producto 1" className="w-full h-full object-cover" />
  </div>
  <div className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-105">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShSKvzHoxwucMiHhkYWBsJsBLto7c-63yJpddv_Y99nQ&s" alt="Producto 2" className="w-full h-full object-cover" />
  </div>
  <div className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-105">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeVYlZn3UvltDtgc14yPTh0fo8Hrf634P4YArcHF1qRw&s" alt="Producto 3" className="w-full h-full object-cover" />
  </div>
</div>

      <h1 className="text-3xl font-bold mb-8 mt-16">Top Product</h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          
          <img src="https://lh5.googleusercontent.com/proxy/a9ib5u8EJXw5MMefEYgwnK8LbCVFLoAL05XqkyGvBFLMmC5phEzo6OPasPoDsTe_UX4B4x3sTmWSZ-AUPU7Ay5A" alt="" />
        </div>
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
