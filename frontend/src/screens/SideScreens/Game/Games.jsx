import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div className="md:h-screen w-full bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950 text-white rounded-2xl grid grid-cols-1 md:grid-cols-7 md:grid-rows-4 text-center md:text-left font-poppins font-extrabold uppercase p-2 gap-2">
      {/* Intro Section */}
      <div className="bg-transparent border-2 border-white rounded-lg relative grid items-center justify-center md:col-span-3 md:overflow-hidden">
        <Link to="/games/sudoku">
          <img
            src="https://st.gamevui.vn/images/image/2024/01/20/noob-nha-tu-zombies-1.jpg"
            alt="Game 1"
            className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform"
          />
          <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-md text-white">
            Game 1
          </p>
        </Link>
      </div>

      {/* About Section */}
      <div className="bg-transparent border-2 border-white rounded-lg relative grid items-center justify-center md:row-span-2 md:col-span-3 md:overflow-hidden">
        <Link to="/games/snake">
          <img
            src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg"
            alt="Game 2"
            className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform"
          />
          <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-md text-white">
            UNO
          </p>
        </Link>
      </div>

      {/* Social Section */}
      <Link
        className="bg-transparent border-2 border-white rounded-lg relative grid items-center justify-center md:row-span-4 md:col-span-1 md:overflow-hidden"
        to="/games/HumanBenchMark"
      >
        <img
          src="https://st.gamevui.vn/images/image/2023/04/24/xep-khoi-go-hd03.jpg"
          alt="Game 3"
          className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform"
        />
        <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-md text-white">
          Game 3
        </p>
      </Link>

      {/* Portfolio Section */}
      <div className="bg-transparent border-2 border-white rounded-lg relative grid items-center justify-center md:row-span-3 md:col-span-3 md:overflow-hidden">
        <Link to="/games/number-memory">
          <img
            src="https://st.gamevui.vn/images/image/2024/02/22/sau-an-tao-4-hd01.jpg"
            alt="Game 4"
            className="w-full h-full object-cover rounded-lg scale-150 shadow-md hover:shadow-lg hover:scale-[1.7] transition-transform"
          />
          <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-md text-white">
            Game 4
          </p>
        </Link>
      </div>

      {/* Contact Section */}
      <div className="bg-transparent border-2 border-white rounded-lg relative grid items-center justify-center md:col-span-3 md:row-span-2 md:overflow-hidden">
        <Link to="/games/snake">
          <img
            src="https://st.gamevui.vn/images/image/2024/04/08/noi-tu-tieng-viet-335.jpg"
            alt="Game 5"
            className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg scale-105 hover:scale-110 transition-transform"
          />
          <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-md text-white">
            Game 5
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Games;
