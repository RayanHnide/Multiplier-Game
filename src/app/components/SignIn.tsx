// src/app/sign-in/page.tsx
'use client'
import React, { useState } from 'react';

type SignInProps = {
  setName: (name: string) => void;
};

const SignIn: React.FC<SignInProps> = ({ setName }) => {
  const [name, setNameLocal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(name); // Update the name in the App component
    console.log('Name submitted:', name);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="w-full">
        <h1 className="text-3xl text-center text-white mb-6">Welcome</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
              Please Insert Your Name
            </label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setNameLocal(e.target.value)} // Update local state
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full p-2 text-white rounded bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90"
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;