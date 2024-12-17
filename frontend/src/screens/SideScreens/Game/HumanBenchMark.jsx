import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";

const HumanBenchMark = () => {
  const [highlighted, setHighlighted] = useState(null); // Ô đang sáng
  const [sequence, setSequence] = useState([]); // Thứ tự ô sáng
  const [playerSequence, setPlayerSequence] = useState([]); // Lựa chọn của người chơi
  const [isStarted, setIsStarted] = useState(false); // Trạng thái khởi động
  const [isGameOver, setIsGameOver] = useState(false); // Trạng thái game

  useEffect(() => {
    let timeout;
    if (isStarted && sequence.length < 9) {
      timeout = setTimeout(() => {
        // Lọc ra các số chưa sáng
        const availableNumbers = [...Array(9).keys()]
          .map((i) => i + 1)
          .filter((num) => !sequence.includes(num));

        if (availableNumbers.length === 0) {
          setIsStarted(false); // Dừng khi đủ 9 số
          return;
        }

        // Chọn ngẫu nhiên một số chưa sáng
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const randomNumber = availableNumbers[randomIndex];

        // Hiển thị ô sáng trong thời gian ngắn
        setHighlighted(randomNumber);
        setSequence((prev) => [...prev, randomNumber]);

        // Tắt ô sau 500ms
        setTimeout(() => {
          setHighlighted(null);
        }, 500);
      }, 1000);
    }

    return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount
  }, [isStarted, sequence]);

  const handleStart = () => {
    setHighlighted(null);
    setSequence([]);
    setPlayerSequence([]);
    setIsStarted(true);
    setIsGameOver(false);
  };

  const handlePlayerClick = (number) => {
    if (isGameOver || !isStarted || sequence.length === 0) return;

    setPlayerSequence((prev) => {
      const newSequence = [...prev, number];

      // Kiểm tra thứ tự
      const isCorrect = sequence[newSequence.length - 1] === number;

      if (!isCorrect) {
        setIsGameOver(true); // Sai thì kết thúc game
        alert("Thua game!");
      } else if (newSequence.length === sequence.length && isCorrect) {
        setIsGameOver(true); // Đúng và đủ thì thắng
        alert("Thắng game!");
      }

      return newSequence;
    });
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col bg-gray-900 text-white rounded-2xl overflow-hidden">
        <BreadCrumb />
        <div className="flex justify-center items-center py-4">
          {!isStarted && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleStart}
            >
              Get Started
            </button>
          )}
        </div>
        <div className="flex flex-grow justify-center items-center p-2">
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                onClick={() => handlePlayerClick(index + 1)}
                className={`aspect-square flex items-center justify-center rounded-lg p-10 
                  ${highlighted === index + 1 ? "bg-yellow-500" : "bg-pink-500"}
                  ${
                    playerSequence.includes(index + 1) ? "opacity-50" : ""
                  } cursor-pointer`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HumanBenchMark;
