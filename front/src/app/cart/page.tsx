"use client";

import React, { useState, useEffect } from "react";
import CartItem from "../component/CartItem";
import { useAppContext } from "@/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

const Cart = () => {
  const { token, userId } = useAppContext();
  console.log("el usuario tiene: ", userId)
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const removeItemFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.warning("This product has been deleted from the cart 🛒", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          products: cart.map((product) => product.id),
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating order");
      }

      await response.json();
      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
      alert("Se realizo la compra con exito!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {token ? (
        <>
          <ToastContainer />
          <div className="mx-auto max-w-5xl">
            <header className="text-center">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cart.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    removeFromCart={removeItemFromCart}
                  />
                ))}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="text-xl text-gray-200">
                    <div className="flex justify-between">
                      <dt>Total</dt>
                      <dd>{totalPrice}</dd>
                    </div>
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={handlePurchase}
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Checkout
                      </button>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              You need to Login to access your Cart!
            </h1>
            <p className="mt-4 text-gray-500">
              Log in to be able to make your purchases
            </p>
          </div>
          <div className="flex max-w-md items-center justify-between mt-8">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account? 
              <a className="underline ml-2" href="/register">
                Sign up
              </a>
            </p>
            <a
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              href="/login"
            >
              Log in
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
