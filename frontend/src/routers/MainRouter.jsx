import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideComponent from "../components/SideComponent";
import MainDashboard from "../screens/SideScreens/dashboard/MainDashBoard";
import Games from "../screens/SideScreens/Game/Games";
import Snake from "../screens/SideScreens/Game/Snake";
import Sudoku from "../screens/SideScreens/Game/Sudoku";
import HumanBenchMark from "../screens/SideScreens/Game/HumanBenchMark";
import NumberMemory from "../screens/SideScreens/Game/NumberMemory";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700">
        {/* Sidebar */}
        <div className="w-full sm:w-1/4 md:w-1/6 lg:w-1/6 border-r">
          <SideComponent />
        </div>
        {/* Main Content */}
        <div className="flex-1 flex justify-center items-center p-4 overflow-y-auto ">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/snake" element={<Snake />} />
            <Route path="/games/sudoku" element={<Sudoku />} />
            <Route path="/games/HumanBenchMark" element={<HumanBenchMark />} />
            <Route path="/games/number-memory" element={<NumberMemory />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainRouter;
