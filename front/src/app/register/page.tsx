"use client"

import React, { useState } from 'react';
import NotFoundPage from '../404/404';

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          if (response.status === 400 && errorMessage === 'User already exists') {
            setAlertMessage('El usuario ya existe');
          } else {
            throw new Error('Error al registrar usuario');
          }
        } else {
          const data = await response.json();
          console.log('Usuario registrado:', data);
          // Aquí puedes manejar la respuesta del backend, como almacenar el token JWT
        }
      } catch (error) {
        NotFoundPage
        console.error('Error al registrar usuario:', error);
      }
    } else {
      setAlertMessage('Por favor completa todos los campos');
    }
  };

  const validateForm = (): boolean => {
    // Verifica que todos los campos estén completos
    return (
      formData.name !== '' &&
      formData.email !== '' &&
      formData.password !== '' &&
      formData.address !== '' &&
      formData.phone !== ''
    );
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Register</h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Name:</label>
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
          <label htmlFor="email" className="sr-only">Email:</label>
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
          <label htmlFor="password" className="sr-only">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="sr-only">Address:</label>
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
          <label htmlFor="phone" className="sr-only">Phone:</label>
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
        <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
          Registrarse
        </button>
      </form>

      {alertMessage && (
        <div className="mx-auto max-w-md mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default Formulario;
