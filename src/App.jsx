import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import BrushSection from "./components/BrushSection";
import ImageUploadSection from "./components/ImageUploadSection";
import ImageInpaintingScreen from "./components/ImageInpaintingScreen";

const App = () => {
  const [image, setImage] = useState(null);
  const [brushSize, setBrushSize] = useState(10);
  return (
    <div className="overflow-auto">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-start md:items-start bg-slate-200 w-screen h-screen">

        {/* Brush Section */}
        <BrushSection setBrushSize={setBrushSize} />

        {/* Image Upload or Inpainting Screen */}
        {!image && <ImageUploadSection setImage={setImage} />}

        {image && brushSize && (
          <ImageInpaintingScreen image={image} brushSize={brushSize} />
        )}
      </div>
    </div>
  );
};

export default App;
