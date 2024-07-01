import React, { useState, useEffect } from "react";

const App = () => {
  return (
    <div
      className="w-full h-screen bg-gradientBg
      bg-no-repeat bg-cover bg-center flex flex-col
      items-center justify-center px-4 lg:px-0"
    >
      <div className="w-full max-w-[450px] bg-black/20 min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        <div className="text-2xl font-semibold">
          Made by Dimitri Matcharashvili
        </div>
      </div>
    </div>
  );
};

export default App;
