import React from "react";
import { Route, Navigate} from "react-router-dom";
import { isAutheticated } from "./index";
import Login from "../../views/Auth/Login";

const PrivateRoute = ({ children }) => {
  let auth = true;
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
