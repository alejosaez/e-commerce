import React, { useState, useEffect } from "react";
import OrderHistory from "../component/OrderHistory";
import { useAppContext } from "@/context";
import UserProfile from "../component/Profile";
import NotFoundPage from "../404/404";

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

  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
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
        console.log("las ordenes: ", data);
        setOrders(data);
      } catch (error) {
        NotFoundPage;
        console.error("Error fetching orders:", error);
      }
    };

    const getUserById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching user");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        NotFoundPage;
        console.error("Error fetching user:", error);
      }
    };

    const fetchData = async () => {
      await fetchOrders();
      await getUserById();
    };

    fetchData();
  }, [token, userId]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <div>
              <h2 className="text-lg font-bold mb-2">Mi Perfil</h2>
              {user && <UserProfile user={user} />}
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Mis Compras</h2>
              {/* Renderizar  componente OrderHistory */}
              <OrderHistory orders={orders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
