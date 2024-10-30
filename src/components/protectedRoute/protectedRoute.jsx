import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute({ user, children }) {
    useEffect(() => {
        if (!user) {
            Swal.fire({
                title: "Acceso Restringido",
                text: "Para ingresar, el usuario tiene que estar logeado.",
                icon: "warning",
                confirmButtonText: "Ir a Login",
            });
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
