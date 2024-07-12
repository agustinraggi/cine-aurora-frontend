import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
