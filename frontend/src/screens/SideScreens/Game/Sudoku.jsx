import React, { useState, useRef, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";

const Sudoku = () => {
  const canvasRef = useRef(null);
  const [gridSize] = useState(50);

  const drawGrid = (ctx) => {
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= 450; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 450);
      ctx.stroke();
    }

    for (let y = 0; y <= 450; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(450, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      drawGrid(ctx);
    }
  }, [gridSize]);

  return (
    <>
      <div className="h-screen w-full flex flex-col bg-gray-900 text-white rounded-2xl">
        <BreadCrumb />
        <div className="h-screen flex flex-col justify-center items-center ">
          <canvas ref={canvasRef} width={450} height={450}></canvas>
        </div>
      </div>
    </>
  );
};

export default Sudoku;
