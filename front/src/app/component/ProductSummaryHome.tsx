"use client"

import React, { useState } from "react";
import { useAppContext } from "@/context";
import { BsPencil } from "react-icons/bs";


interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductSummaryProps {
  product: Product;

}

const ProductSummaryHome: React.FC<ProductSummaryProps> = ({ product}) => {
  const { token, userRole } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);



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
      <img
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105"
        src={editedProduct.image}
        alt={editedProduct.name}
      />
      <div className="text-black mt-5">
        <h5 className="text-sm font-semibold uppercase tracking-widest">{editedProduct.name}</h5>
        <h2 className="mt-2 font-black text-xl">${editedProduct.price}</h2>
        <h3 className="mt-2 font-black text-xl">Stock {editedProduct.stock}</h3>
        {isEditing ? (
          <>
            <input
              type="text"
              className="w-full rounded-lg border-gray-400 p-4 mb-2 pe-12 text-sm shadow-sm text-black"
              name="name"
              placeholder="New Name"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              className="w-full rounded-lg border-gray-400 p-4 mb-2 pe-12 text-sm shadow-sm text-black"
              placeholder="New Price"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              className="w-full rounded-lg border-gray-400 p-4 pe-12 text-sm shadow-sm text-black"
              placeholder="New stock"
              value={editedProduct.stock}
              onChange={handleInputChange}
            />
            <button className="inline-block mt-4 px-4 py-2 bg-red-700 text-[12px] font-bold uppercase tracking-widest text-white rounded-full"
              onClick={handleCancelEdit}>Cancel</button>
            <button className="inline-block mt-4 px-4 ml-4 py-2 bg-blue-500 text-[12px] font-bold uppercase tracking-widest text-white rounded-full"
              onClick={handleSaveEdit}>Save</button>
          </>
        ) : (
          <>
            <a
              className="inline-block mt-4 px-4 py-2 mr-4 bg-blue-700 text-sm font-bold uppercase tracking-widest text-white rounded-full"
              href={`/products/${editedProduct.id}`}
            >
              View Detail
            </a>
                      </>
        )}
      </div>
    </div>
  );
};

export default ProductSummaryHome;
