import React from 'react';
import Image from 'next/image'; // Importamos Image de next/image

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

interface CardProps {
  product: Product;
}

const CardHome: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg ml-4 mr-4 mb-4">
      <Image // Cambiamos <img> por <Image />
        src={product.image}
        alt={product.name}
        width={400} // Ajusta el ancho de la imagen según tus necesidades
        height={350} // Ajusta la altura de la imagen según tus necesidades
        className="object-cover transition duration-500 group-hover:scale-105" // Estilos opcionales
      />

      <div className="text-black mt-8">
        <h5 className="text-sm font-semibold uppercase tracking-widest">{product.name}</h5>

        <h2 className="mt-2 font-black text-xl">${product.price}</h2>
        
        <p className="mt-2 text-gray-800">{product.description}</p>
        
        <a
          className="inline-block mt-4 px-4 py-2 bg-black text-sm font-bold uppercase tracking-widest text-white rounded-full"
          href="#"
        >
          View Product
        </a>

        <p className="mt-2 text-xs font-medium uppercase text-gray-400">
          Stock: {product.stock}
        </p>
      </div>
    </div>
  );
};

export default CardHome;
