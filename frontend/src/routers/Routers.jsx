import React from "react";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { useSelector } from "react-redux";

const Routers = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return <>{!userInfo ? <AuthRouter /> : <MainRouter />}</>;
};

export default Routers;
