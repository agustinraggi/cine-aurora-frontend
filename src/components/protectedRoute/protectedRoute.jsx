import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken } from "../../utils/axiosConfig";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            // Mostrar el mensaje y redirigir inmediatamente
            Swal.fire({
                title: "Acceso Restringido",
                text: "Para ingresar, el usuario tiene que estar logeado.",
                icon: "warning",
            }).then(() => {
                setIsAuthenticated(false);
            });
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    if (isAuthenticated === null) return null; 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
