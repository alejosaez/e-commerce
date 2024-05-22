"use client"
import React from "react";
import ProductDetail from "@/app/component/ProductDetail";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




interface RouteParams {
  id: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const getProductDetail = async (id: string) => {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    cache: "no-store" // Configuración para evitar la caché
  });
  const product = await response.json();
  return product;
}

const Product: React.FC<{ params: RouteParams }> = ({ params }) => {
  const [product, setProduct] = React.useState<Product | null>(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await getProductDetail(params.id);
      setProduct(fetchedProduct);
    };

    fetchData();
  }, [params.id]);

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
      <div className="max-w-4xl mx-auto">
        {product ? (
          <ProductDetail product={product} onAddToCart={addToCart} /> 
        ) : (<img src="https://lh5.googleusercontent.com/proxy/a9ib5u8EJXw5MMefEYgwnK8LbCVFLoAL05XqkyGvBFLMmC5phEzo6OPasPoDsTe_UX4B4x3sTmWSZ-AUPU7Ay5A" alt="" />

        )}
      </div>
    </div>
  );
}

export default Product;
