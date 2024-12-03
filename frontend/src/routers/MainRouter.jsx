import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideComponent from "../components/SideComponent";
import MainDashboard from "../screens/SideScreens/dashboard/MainDashBoard";

const MainRouter = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <div className=" w-1/6">
            <SideComponent />
          </div>
          <div className=" flex justify-center items-center  h-full w-5/6">
            <Routes>
              <Route path="/" element={<MainDashboard />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default MainRouter;
