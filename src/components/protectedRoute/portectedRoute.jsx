import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
    if (!user) {
        alert("Para ingresar, el usuario tiene que estar logeado.");
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
