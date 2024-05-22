"use client"

import React, { useState, useEffect } from "react";
import OrderHistory from "../component/OrderHistory";
import { useAppContext } from "@/context";
import UserProfile from "../component/Profile";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  phone: number;
}

const Page = () => {
  const { token, userId } = useAppContext();

  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState<User | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Cambiar el estado de carga cuando la solicitud haya finalizado
    }
  };

  const getUserById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching user");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    getUserById();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <div>
              <h2 className="text-lg font-bold mb-2">My Profile</h2>
              {user && <UserProfile user={user} />}
            </div>
          </div>
          <div className="col-span-2">
            {loading ? (
              // indicador de carga
              <div className="flex justify-center items-center h-screen">
                <img src="https://lh5.googleusercontent.com/proxy/a9ib5u8EJXw5MMefEYgwnK8LbCVFLoAL05XqkyGvBFLMmC5phEzo6OPasPoDsTe_UX4B4x3sTmWSZ-AUPU7Ay5A" alt="" />
              </div>

            ) : orders.length > 0 ? (
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">My Purchases</h2>
                <OrderHistory orders={orders} />
              </div>
            ) : (
              <>
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                    You don't have any orders yet!
                    </h1>
                    <p className="mt-4 text-gray-500">
                    Go to the cart and make your first purchase
                    </p>
                  </div>
                  <div className="max-w-md items-center justify-center mt-8">
                    <a
                      className="rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                      href="/products"
                    >
                      Products
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
