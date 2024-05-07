"use client";

import React, { FC, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Order {
  id: number;
  status: string;
  date: string;
  products: Product[];
}

interface OrderHistoryProps {
  orders: Order[];
}

const ProductItem: FC<{ product: Product }> = ({ product }) => (
  <article className="rounded-xl border-2 text-black border-gray-100 bg-white">
    <div className="flex items-start gap-2 p-2 sm:p-2 lg:p-4">
      <a
        href={`http://localhost:3001/products/${product.id}`}
        className="block shrink-0"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 object-cover rounded-md"
        />
      </a>

      <div>
        <p className="font-medium sm:text-lg text-md">
          <a
            href={`http://localhost:3000/products/${product.id}`}
            className="hover:underline"
          >
            {product.name}
          </a>
        </p>
        <p className="line-clamp-2 text-sm text-gray-700">
          {product.description}
        </p>

        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
          <div className="text-gray-500 font-medium">{product.price}</div>
        </div>
      </div>
    </div>
  </article>
);

const OrderHistory: FC<OrderHistoryProps> = ({ orders }) => {
  const [showProducts, setShowProducts] = useState<number | null>(null);

  const toggleShowProducts = (orderId: number) => {
    setShowProducts(showProducts === orderId ? null : orderId);
  };

  return (
    <div>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm mb-2"
        >
          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Status</dt>
            <dd className="text-gray-400 sm:col-span-2">
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="whitespace-nowrap text-sm">{order.status}</p>
              </span>
            </dd>

            <dt className="font-medium text-white">Description</dt>
            <dd className="text-gray-400 sm:col-span-2">{order.date}</dd>
            <button
              className={`inline-block rounded-lg px-3 py-3 text-sm font-medium w-1/2 ${showProducts === order.id
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
                }`}
              onClick={() => toggleShowProducts(order.id)}
            >
              {showProducts === order.id ? "Hide Products" : "Show Products"}
            </button>
          </div>
          {showProducts === order.id && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              {order.products.map((product, idx) => (
                <ProductItem key={idx} product={product} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
