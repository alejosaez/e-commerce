'use client'

import React, { useState } from 'react';
import { deleteCookie } from 'cookies-next';
import SearchComponent from './SearchBar';
import { useAppContext } from '@/context';


const Navbar: React.FC = () => {
  // Obtiene el token y el rol del usuario del contexto de la aplicación
  const { token, userRole } = useAppContext();

  //  apertura y cierre del menú desplegable
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //  cierre de sesión
  const handleLogout = () => {
    deleteCookie("access-token");
    deleteCookie("user-id");
    deleteCookie("user-role");
    window.location.reload();
  };

  // Función menú desplegable
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between bg-gray-900 text-white w-screen mb-8">
      {/* Contenido principal del Navbar */}
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        {/* Lista de elementos de navegación */}
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><a className="hover:text-gray-200" href="/">Home</a></li>
          <li><a className="hover:text-gray-200" href="/products">Products</a></li>
          {token && userRole !== "admin" && <li><a className="hover:text-gray-200" href="/dashboard">Dashboard</a></li>}
          <li><a className="hover:text-gray-200" href="/contactus">Contact Us</a></li>
        </ul>
        {/* Botón para crear un nuevo producto, visible solo para el rol de admin */}
        {userRole === "admin" && (
          <a className="inline-block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium text-white" href="/createproduct">
            Create Product
          </a>
        )}
        {/* Barra de búsqueda */}
        <div className="relative">
          <SearchComponent />
        </div>
        {/* Icono del carrito de compras */}
        <div className="hidden xl:flex items-center space-x-5">
          {userRole !== "admin" && (
            <a className="flex items-center hover:text-gray-200" href="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
          )}
          {/* Botón para cerrar sesión */}
          {token ? (
            <button onClick={handleLogout} className="inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white">
              LogOut
            </button>
          ) : (
            <a className="flex items-center hover:text-gray-200" href={token ? "/logout" : "/login"}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      {/* Icono del menú hamburguesa para dispositivos móviles */}
      <div className="xl:hidden flex mr-6 items-center">
        <button onClick={toggleMenu} className="navbar-burger self-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Menú desplegable para dispositivos móviles */}
      <div className="xl:hidden flex flex-col items-center">
        {isMenuOpen && (
          <div className="absolute top-16 right-0 z-10 mt-2 w-56 rounded-md border border-black bg-gray-800 shadow-lg">
            {/* Contenido del menú desplegable */}
            <div className="p-2">
              {/* Opciones del menú desplegable */}
              <a href="/" className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700">Home</a>
              <a href="/products" className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700">Products</a>
              {token && userRole !== "admin" && <a className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700" href="/dashboard">Dashboard</a>}
              <a className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700"href="/contactus">Contact Us</a>

              {userRole !== "admin" && (
                <a className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700" href="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                 
                </a>
              )}
              {token ? (
                <button onClick={handleLogout} className="inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white mt-6 mb-2">
                  LogOut
                </button>
              ) : (
                <a className="flex items-center hover:text-gray-200" href={token ? "/logout" : "/login"}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              )}
             
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
