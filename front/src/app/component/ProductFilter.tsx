
import React from 'react';

interface ProductCategory {
  label: string;
  value: string;
}

const ProductFilter: React.FC = () => {
  const categories: ProductCategory[] = [
    { label: 'Smartphone', value: 'smartphone' },
    { label: 'Smartwatch', value: 'smartwatch' },
    { label: 'Auriculares', value: 'auriculares' },
    { label: 'MacBook', value: 'macbook' },
  ];

  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-900">Filtrar por Categoría</label>
      <select id="category" name="category" className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
        <option value="">Selecciona una categoría</option>
        {categories.map((category, index) => (
          <optgroup key={index} label={category.label}>
            <option value={category.value}>{category.label}</option>
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;


