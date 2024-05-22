"use client"

import React, { useEffect, useState } from 'react';

const ProductFilter: React.FC<{ setSelectedCategory: (category: string) => void, selectedCategory: string }> = ({ setSelectedCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error("Error al obtener las categorías");
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "all" ? "all" : selectedValue);
  };

  return (
    <div>
      <label htmlFor="categoryId" className="sr-only">
        Category:
      </label>
      <select
        id="categoryId"
        name="categoryId"
        value={selectedCategory || "all"}
        onChange={handleCategoryChange}
        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black font-bold  "
        required
      >
        <option value="all">All Product</option>
        {categories.map((category: any) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};


export default ProductFilter
