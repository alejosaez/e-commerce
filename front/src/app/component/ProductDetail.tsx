"use client";

import React from "react";
import { useAppContext } from '@/context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const { token, userRole } = useAppContext()

  const handleAddToCart = () => {
    if (!token) {
      window.location.href = "/login";
    } else {
      onAddToCart(product);
    }
  };

  return (
    <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-white">
      <div className="h-48 md:h-full md:col-span-1">
        {" "}
        
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          objectFit="contain"
        />
      </div>

      <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8 text-black">
        <p className="text-sm font-semibold uppercase tracking-widest">
          {product.name}
        </p>

        <h2 className="mt-6 font-black uppercase">
          <span className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Price: ${product.price}
          </span>

          <span className="mt-2 block text-sm">{product.description}</span>
        </h2>

        <p className="mt-2 text-gray-800">Stock: {product.stock}</p>
        {userRole !== "admin" && <button
          onClick={handleAddToCart} className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
        >
          Add To Cart
        </button>}

        <p className="mt-8 text-xs font-medium uppercase text-gray-400">
          Offer valid until 24th March, 2024 *
        </p>
      </div>
    </section>
  );
};

export default ProductDetail;
