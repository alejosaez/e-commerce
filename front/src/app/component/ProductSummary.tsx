"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context";
import { BsPencil } from "react-icons/bs";
import NotFoundPage from "../404/404";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductSummaryProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({ product, onAddToCart }) => {
  const { token, userRole } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleAddToCart = () => {
    if (!token) {
      window.location.href = "/login";
    } else {
      onAddToCart(product);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProduct(product);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/${editedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la edición del producto');
      }

      setIsEditing(false);
    } catch (error) {
      NotFoundPage

      console.error('Error al guardar la edición del producto:', error);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg ml-4 mr-4 mb-4">
      {userRole === "admin" && <button className="flex rounded-lg bg-orange-500 px-3 mb-3 py-3 text-sm font-medium text-white" onClick={handleEditClick}>
        <BsPencil />
      </button>}
      <Image
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105"
        src={editedProduct.image}
        alt={editedProduct.name}
        width={400}
        height={350}
      />
      <div className="text-black mt-8">
        <h5 className="text-sm font-semibold uppercase tracking-widest">{editedProduct.name}</h5>
        <h2 className="mt-2 font-black text-xl">${editedProduct.price}</h2>
        <h3 className="mt-2 font-black text-xl">Stock {editedProduct.stock}</h3>
        {isEditing ? (
          <>
            <input
              type="text"
              className="w-full rounded-lg border-gray-400 p-4 mb-2 pe-12 text-sm shadow-sm text-black"
              name="name"
              placeholder="Ingrese el nuevo nombre"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              className="w-full rounded-lg border-gray-400 p-4 mb-2 pe-12 text-sm shadow-sm text-black"
              placeholder="Ingrese el nuevo precio"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              className="w-full rounded-lg border-gray-400 p-4 pe-12 text-sm shadow-sm text-black"
              placeholder="Ingrese el nuevo stock"
              value={editedProduct.stock}
              onChange={handleInputChange}
            />
            <button className="inline-block mt-4 px-4 py-2 bg-red-700 text-[12px] font-bold uppercase tracking-widest text-white rounded-full"
              onClick={handleCancelEdit}>Cancelar</button>
            <button className="inline-block mt-4 px-4 ml-4 py-2 bg-blue-500 text-[12px] font-bold uppercase tracking-widest text-white rounded-full"
              onClick={handleSaveEdit}>Guardar</button>
          </>
        ) : (
          <>
            <a
              className="inline-block mt-4 px-4 py-2 mr-4 bg-blue-700 text-sm font-bold uppercase tracking-widest text-white rounded-full"
              href={`/products/${editedProduct.id}`}
            >
              View Detail
            </a>
            {userRole !== "admin" &&
              <button
                onClick={handleAddToCart}
                className="inline-block mt-4 px-4 py-2 bg-black text-sm font-bold uppercase tracking-widest text-white rounded-full"
              >
                Add to Cart
              </button>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSummary;
