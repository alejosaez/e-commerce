"use client"

import React from "react";

interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    role: string;
    phone: number;
}

const UserProfile = ({ user }: { user: User }) => {
  return (
    <a
      href="#"
      className="relative block overflow-hidden rounded-lg borderp-4 sm:p-6 lg:p-8"
    >

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">{user.name}</h3>
          <p className="mt-1 text-md font-medium text-gray-400">Email: {user.email}</p>
        </div>
      </div>

      <div className="mt-8">
          <h3 className="text-lg font-bold text-white sm:text-xl">Personal Information:</h3>
          <p className="mt-1 text-md font-medium text-gray-400">Address: {user.address}</p>
          <p className="mt-1 text-md font-medium text-gray-400">Phone: {user.phone}</p>
          <p className="mt-1 text-md font-medium text-gray-400">Role: {user.role}</p>
      </div>
      
    </a>
  );
};

export default UserProfile;
