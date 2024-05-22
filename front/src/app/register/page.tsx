"use client"
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      window.location.href = "/login";
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        if (
          response.status === 400 &&
          errorMessage === "User already exists"
        ) {
          toast.error("User already exists");
        } else {
          throw new Error("Error al registrar usuario");
        }
      } else {
        const data = await response.json();
        console.log("Usuario registrado:", data);
        toast.success("¡Usuario registrado exitosamente!");
        //   manejar la respuesta del backend, como almacenar el token JWT
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      toast.error("Error al registrar usuario");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Register</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="name" className="sr-only">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
              placeholder="Password"
              required
            />
            <span
              className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showPassword ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                )}
              </svg>
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="address" className="sr-only">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            placeholder="Address"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            placeholder="Phone"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Registrarse
        </button>
       
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            You have an account?{" "}
            <a className="underline ml-2" href="/login">
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
