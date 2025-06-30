import React from 'react';

const page = () => {
  return (
    <div className="flex h-screen w-screen gap-2 p-2 items-start justify-center bg-gray-100">
      <div className="w-1/2 h-full gap-2 flex flex-col">
        <div className="bg-gray-200 borde rounded-sm h-4/5"></div>
        <div className="bg-gray-200 rounded-sm h-1/5"></div>
      </div>
      <div className="bg-blue-300 rounded-sm h-full w-1/2 "></div>
    </div>
  );
};

export default page;
