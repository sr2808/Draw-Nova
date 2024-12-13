import React from 'react';

const brushSizes = [
  { dimension: 20, size: 40 },
  { dimension: 16, size: 20 },
  { dimension: 14, size: 10 },
  { dimension: 12, size: 5 },
  { dimension: 10, size: 3 },
  { dimension: 8, size: 1 },
];

const BrushSection = ({ setBrushSize }) => {
  const handleBrushSizeChange = (size) => {
    setBrushSize(size); 
  };

  return (
    <div className="flex md:flex-col items-center md:w-[10%] bg-gradient-to-b to-slate-200 from-blue-500">
      <h1 className="text-2xl font-bold text-white flex h-full items-center mx-2">Brush Size</h1>
      {brushSizes.map((brush, index) => (
        <button
        key={index}
        className={`flex items-center justify-center text-lg font-bold text-black/50 rounded-full bg-white hover:border-8 hover:border-pink-200 cursor-pointer my-4 mx-1 p-2 h-fit md:${brush.dimension === 20 ? 'w-20 h-20' : ''} md:${brush.dimension === 16 ? 'w-16 h-16' : ''} md:${brush.dimension === 14 ? 'w-14 h-14' : ''}  md:${brush.dimension === 12 ? 'w-12 h-12' : ''} md:${brush.dimension === 10 ? 'w-10 h-10' : ''} md:${brush.dimension === 8 ? 'w-8 h-8' : ''}`}  
        onClick={() => handleBrushSizeChange(brush.size)}
      >
        {brush.size}
      </button>
      
      ))}
    </div>
  );
};

export default BrushSection;
