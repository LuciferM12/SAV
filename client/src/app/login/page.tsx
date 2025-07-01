import React from 'react';
import { GoArrowUpRight } from 'react-icons/go';

const page = () => {
  return (
    <div className="flex h-screen w-screen gap-2 p-2 items-start justify-center bg-gray-100">
      <div className="w-1/2 h-full gap-2 flex flex-col">
        <div className="bg-gray-200 borde rounded-sm h-4/5"></div>
        <div className="bg-gray-200 rounded-sm h-1/5 flex justify-between items-center p-4">
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
      <div className="bg-blue-300 rounded-sm h-full w-1/2"></div>
    </div>
  );
};

export default page;
