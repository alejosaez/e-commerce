"use client"

import React, { useState, useEffect } from "react";
import ProductSummary from "../component/ProductSummary";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotFoundPage from "../404/404";
import ProductFilter from "../component/ProductFilter";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
  useEffect(() => {

    fetchProducts();
  }, []); //arreglo de dependencias.

  useEffect(() => {
    const filterCategory = async () => {
      try {
        if (selectedCategory === "all") {
          fetchProducts()
        }else{
          const response = await fetch(`http://localhost:3001/products/category/${selectedCategory}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const filteredProductsData = await response.json();
        setProducts(filteredProductsData);
        
      }
      setLoading(false)
        
      } catch (error) {
        console.error("Error fetching filtered products:", error);
        setLoading(false);
      }
    };

    filterCategory();
  }, [selectedCategory]);


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
      <h1 className="text-3xl font-bold text-center my-8  ">All Products</h1>
      <div className="mb-4 mt-4 mx-4  ">
      <ProductFilter setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <img src="https://lh5.googleusercontent.com/proxy/a9ib5u8EJXw5MMefEYgwnK8LbCVFLoAL05XqkyGvBFLMmC5phEzo6OPasPoDsTe_UX4B4x3sTmWSZ-AUPU7Ay5A" alt="" />
        </div>
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
