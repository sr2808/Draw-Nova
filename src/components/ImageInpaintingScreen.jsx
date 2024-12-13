import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const ImageInpaintingScreen = ({ image, brushSize }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize the Fabric.js canvas once
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: canvasRef.current.parentElement.clientWidth,
      height: canvasRef.current.parentElement.clientHeight,
    });

    // Set the default brush
    fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.color = "white";
    fabricCanvas.freeDrawingBrush.width = brushSize;

    // Store the canvas instance for later use
    fabricCanvasRef.current = fabricCanvas;

    // Cleanup on component unmount
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Update brush size dynamically when brushSize changes
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize]);

  const handleClearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      setPreviewSrc(null);
    }
  };

  const handlePreviewCanvas = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL();
      setPreviewSrc(dataURL);
    }
  };

  const handleExportImage = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL();
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas-image.png";
      link.click();
    }
  };

  return (
    <div 
      className="relative flex flex-col justify-center items-center w-[80%] h-[90%] max-h-screen p-4 overflow-hidden"
    >
      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-4 w-full">
        <button
          className="px-3 py-2 text-xs md:text-sm font-medium text-white rounded-md bg-blue-600 shadow-md"
          onClick={handlePreviewCanvas}
        >
          Preview Canvas
        </button>
        <button
          className="px-3 py-2 text-xs md:text-sm font-medium text-white rounded-md bg-red-600 shadow-md"
          onClick={handleExportImage}
        >
          Export Canvas
        </button>
        <button
          className="px-3 py-2 text-xs md:text-sm font-medium rounded-md shadow-md bg-white"
          onClick={handleClearCanvas}
        >
          Clear Canvas
        </button>
      </div>

      {/* Main Canvas Container */}
      <div className="flex-grow w-full h-[90%] max-h-[100%] flex justify-center items-center bg-black/50"
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
        ></canvas>
      </div>

      {/* Preview Modal */}
      {previewSrc && (
        <div className="fixed inset-0 object-cover z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 overflow-auto">
         <div className="bg-gray-900 rounded-lg p-6 w-full h-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">Canvas Preview</h2>
              <button
                className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md"
                onClick={() => setPreviewSrc(null)}
              >
                Close
              </button>
            </div>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
              <div className="border border-white">
                <p className="text-white text-center mb-2">Original Image</p>
                <img
                  src={image}
                  alt="Original"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="border border-white">
                <p className="text-white text-center mb-2">Canvas Preview</p>
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="w-full h-auto object-contain max-h-1/2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInpaintingScreen;