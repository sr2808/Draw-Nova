import React, { useState } from 'react';

const ImageUploadSection = ({ setImage }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      setImage(imageUrl); 
    }
  };

  return (
    <div
      className="flex flex-1 justify-center items-start mt-10 w-[90%] h-[80%]"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <input
        type="file"
        id="image-upload"
        className="hidden"
        onChange={handleImageUpload}
        accept="image/*"
      />
      <label
        htmlFor="image-upload"
        className="flex justify-center items-center w-[90%] h-full cursor-pointer"
      >
        {!backgroundImage && (
          <div className="text-4xl font-bold text-blue-700">
            Click Here to Upload Image
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploadSection;
