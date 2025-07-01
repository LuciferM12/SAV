'use client';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import React, { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';

const login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-screen gap-2 p-2 items-start justify-center bg-gray-100">
      <div className="w-1/2 h-full gap-2 flex flex-col">
        <div className="bg-gray-200 borde rounded-3xl h-4/5 p-12 flex flex-col gap-4">
          <h1 className="font-thin">Company Login Page</h1>
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-3xl">Welcome to </h2>
            <h2 className="font-bold text-3xl">Company Name </h2>
          </div>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat, esse commodi
            incidunt a quo et iusto voluptatibus maxime qui!
          </p>
          <div className="relative flex items-center rounded-2xl bg-gray-100 border pl-2 focus-within:bg-white">
            <MailIcon className="h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              className="bg-transparent border-0 focus-visible:ring-0 focus:ring-0 focus:outline-none shadow-none"
            />
          </div>
          <div className="relative flex items-center rounded-2xl bg-gray-100 focus-within:bg-white px-2">
            <LockIcon className="h-5 w-5 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="border-0 focus-visible:ring-0 shadow-none"
            />
            <button onClick={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        <div className="bg-gray-200 rounded-3xl h-1/5 flex justify-between items-center p-4">
          <div className=" flex justify-start items-center">
            <div className="rounded-full bg-black w-14 h-14 border-2 border-white z-30 -translate-x-2" />
            <div className="rounded-full bg-blue-500 w-14 h-14 border-2 border-white z-20 -translate-x-4" />
            <div className="rounded-full bg-blue-950 w-14 h-14 border-2 border-white z-10 -translate-x-6" />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Join with 20k+ Users!</h1>
              <h1 className="text-sm text-gray-500">Let's see our happy customer</h1>
            </div>
          </div>
          <div className="border border-black w-14 h-14 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all duration-300">
            <GoArrowUpRight className="text-black w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="bg-blue-300 rounded-3xl h-full w-1/2"></div>
    </div>
  );
};

export default login;
