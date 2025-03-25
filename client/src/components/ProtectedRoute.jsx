import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return <div>{currentUser ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
};

export default ProtectedRoute;
