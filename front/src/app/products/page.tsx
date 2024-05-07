"use client"

import React, { useState, useEffect } from "react";
import ProductSummary from "../component/ProductSummary";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/app/component/Loading";
import NotFoundPage from "../404/404";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

const AllProducts: React.FC = () => {
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
NotFoundPage
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      toast.error("This product is already in the cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const updatedCart = [...cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("This product has been added to the cart 🛒", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center my-8">All Products</h1>
      {loading ? (
        <Loading progress={75} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductSummary key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
