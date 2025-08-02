// // src/components/PrivateRoute.jsx
// import { Navigate } from "react-router-dom";
// import { isTokenValid } from "../api";

// const PrivateRoute = ({ children }) => {
//   return isTokenValid() ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

// src/components/PrivateRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { isTokenValid } from "../api";

// const PrivateRoute = ({ children }) => {
//   return isTokenValid() ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../api";

const PrivateRoute = ({ children }) => isTokenValid() ? children : <Navigate to="/login" replace />;

export default PrivateRoute;