import React, { useState, useEffect, ChangeEvent } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from '../404/404';
import Image from 'next/image'; // Importamos Image de next/image

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    categoryId: 0
  });

  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error('Error al obtener las categorías');
      }
    } catch (error) {
      NotFoundPage;
      console.error('Error al obtener las categorías:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadToServe = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const url = `https://api.imgbb.com/1/upload?&key=${"014b88a821dac68c6fa90f97c780af0a"}&name=${imageFile.name}`;
      const data = new FormData();
      data.append("image", imageFile);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: data,
        });

        const responseData = await response.json();
        console.log("imageurlresponse: ", responseData.data.url);

        setImage(responseData.data.url);

      } catch (error) {
        NotFoundPage;
      }
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, image: image });
    console.log(formData)
    if (validateForm()) {
      try {
        console.log("nuevo product con imagen cambiada: ", formData)
        const response = await fetch('http://localhost:3001/products', {
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
          console.log('Producto creado:', data);
          toast.success("The new product has been Created!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setFormData({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            image: '',
            categoryId: 0
          })
        }
      } catch (error) {
        NotFoundPage;
        console.error('Error al registrar producto:', error);
      }
    } else {
      setAlertMessage('Por favor completa todos los campos');
    }
  };

  const validateForm = (): boolean => {
    return (
      formData.name !== '' &&
      formData.description !== '' &&
      formData.price !== 0 &&
      formData.stock !== 0 &&
      formData.image !== '' &&
      formData.categoryId !== 0
    );
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Create Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <div className="relative">
            <label htmlFor="image" className="cursor-pointer inline-block bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              onChange={uploadToServe}
              name="image"
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
            {image && <Image src={image} alt="" />} {/* Reemplazamos <img> con <Image /> */}
          </div>
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
          <label htmlFor="description" className="sr-only">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            placeholder="Description"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="sr-only">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="stock" className="sr-only">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            placeholder="Stock"
            required
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="sr-only">Category:</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
          Create new Product
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

export default CreateProduct;
