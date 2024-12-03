import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, SignUp } from "../screens";

const AuthRouter = () => {
  return (
    <>
      <div className="flex min-h-screen dark:bg-slate-900">
        {/* <div className="w-1/2 bg-gray-100 max-lg:hidden flex justify-center items-center flex-col">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/manage-storage.appspot.com/o/Group%201122.png?alt=media&token=71368463-dae5-4088-bf2e-6e260103e7ca"
            }
            alt="logo"
            className="w-[250px] h-[273px]"
          />
          <h1 className=" text-[#009ED8] mt-[33px] font-inter text-[47px] font-semibold leading-[56.88px]">
            KANBAN
          </h1>
        </div> */}
        <div className="w-full flex items-center justify-center">
          {/* <div className="w-full lg:w-1/2 flex items-center justify-center"> */}
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default AuthRouter;
