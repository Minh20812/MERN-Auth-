import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";

const HumanBenchMark = () => {
  const [highlighted, setHighlighted] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [level, setLevel] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isReadyForNextLevel, setIsReadyForNextLevel] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const generateSequence = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
  };

  const playSequence = (newSequence) => {
    newSequence.forEach((number, index) => {
      setTimeout(() => {
        setHighlighted(number);
        setTimeout(() => setHighlighted(null), 500);
      }, index * 1000);
    });
  };

  const startLevel = () => {
    const newLevel = level + 1;
    const newSequence = generateSequence(newLevel);

    setLevel(newLevel);
    setSequence(newSequence);
    setPlayerSequence([]);
    setIsGameOver(false);
    setIsReadyForNextLevel(false);

    setTimeout(() => playSequence(newSequence), 1000);
  };

  const restartGame = () => {
    setLevel(0);
    setSequence([]);
    setPlayerSequence([]);
    setIsGameOver(false);
    setIsReadyForNextLevel(false);
    setHighlighted(null);
  };

  const handlePlayerClick = (number) => {
    if (isGameOver || isReadyForNextLevel) return;

    setPlayerSequence((prev) => {
      const newSequence = [...prev, number];
      const isCorrect = sequence[newSequence.length - 1] === number;

      if (!isCorrect) {
        setIsGameOver(true);
        return prev;
      }

      if (newSequence.length === sequence.length) {
        setIsReadyForNextLevel(true);
      }

      return newSequence;
    });
  };

  const handleShowNumber = () => {
    setShowNumber((prev) => !prev);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-white rounded-2xl overflow-hidden">
      <BreadCrumb />

      <div className="flex justify-center items-center font-bold">
        <h1 className=" text-5xl">Level: {level}</h1>
      </div>

      <div className="flex flex-grow justify-center items-center p-2">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              onClick={() => handlePlayerClick(index + 1)}
              className={`aspect-square flex items-center justify-center rounded-lg p-10 
                ${highlighted === index + 1 ? "bg-white" : "bg-slate-500"} 
                cursor-pointer hover:bg-slate-300 hover:scale-105`}
            >
              {showNumber ? index + 1 : ""}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center pb-10 gap-3">
        <div className=" flex gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleShowNumber}
          >
            Hiện số
          </button>

          {!isGameOver && level === 0 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={startLevel}
            >
              Bắt đầu
            </button>
          )}

          {!isGameOver && isReadyForNextLevel && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={startLevel}
            >
              Tiếp tục
            </button>
          )}

          {isGameOver && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={restartGame}
            >
              Chơi lại
            </button>
          )}
        </div>

        {isGameOver && (
          <>
            <p className="text-red-500 font-bold text-center">
              Bạn đã chinh phục đến Level: {level}. Dãy số đúng:{" "}
              {sequence.join(", ")}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default HumanBenchMark;
