import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";

const NumberMemory = () => {
  const [number, setNumber] = useState([]);
  const [level, setLevel] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [numberInput, setNumberInput] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const generateNumber = (length) => {
      const newNumber = Array.from(
        { length },
        () => Math.floor(Math.random() * 9) + 1
      );
      setNumber(newNumber);
    };
    generateNumber(level);
  }, [level]);

  const handleLevel = () => {
    setLevel(level + 1);
    setShowNumber(true);
    setIsCorrect(null);
    setNumberInput([]);
    setHasChecked(false);
    setTimeout(() => {
      setShowNumber(false);
    }, 2000);
  };

  const handleInputNumber = (num) => {
    setNumberInput((prev) => [...prev, num]);
    console.log(number);
  };

  const handleChange = (e) => {
    setNumberInput(e.target.value.split("").map(Number));
  };

  const checkNumber = () => {
    setHasChecked(true);
    numberInput.join("") === number.join("")
      ? setIsCorrect(true)
      : setIsCorrect(false);
  };

  const resetGame = () => {
    setLevel(0);
    setNumber([]);
    setNumberInput([]);
    setIsCorrect(false);
    setHasChecked(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col bg-gray-900 text-white rounded-2xl overflow-hidden">
        <BreadCrumb />

        <div className="flex flex-col gap-4 justify-center items-center font-bold">
          <h1 className=" text-3xl">Level: {level}</h1>

          {showNumber && (
            <div
              className={` text-6xl ${
                number.length <= 9
                  ? "flex flex-wrap text-center"
                  : "grid grid-cols-9"
              } gap-1 mx-auto`}
            >
              {number.map((num, index) => (
                <div key={index} className="flex-shrink-0">
                  {num}
                </div>
              ))}
            </div>
          )}

          <div className=" w-52 h-3 border-2 border-solid border-[#fff] p-[0.1rem] overflow-hidden rounded-xl mx-8 my-auto"></div>

          <div className=" rounded-xl">
            <input
              type="text"
              className=" rounded-md text-black p-5 md:text-3xl text-center"
              value={numberInput.join("")}
              onChange={handleChange}
            />
          </div>

          <div className=" grid grid-cols-3 grid-rows-3 gap-4 text-5xl">
            {[...Array(9)].map((_, index) => (
              <div key={index}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    handleInputNumber(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {level === 0 ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLevel}
              >
                Bắt đầu
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={checkNumber}
              >
                Kiểm tra
              </button>
            )}
          </div>

          {level !== 0 && (
            <div className="flex gap-3">
              {isCorrect ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLevel}
                >
                  Đúng rồi! Tiếp tục thôi.
                </button>
              ) : (
                hasChecked && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={resetGame}
                  >
                    Sai rồi! Chơi lại.
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NumberMemory;
