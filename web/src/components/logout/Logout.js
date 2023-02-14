import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
        localStorage.removeItem("jwt");
        return <Navigate to={{pathname: "/recipes"}} />
};

export default Logout;