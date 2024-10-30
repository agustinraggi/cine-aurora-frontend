import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Login from "./login";
import { setToken } from '../../Helpers/auth-helpers';

const LoginWrapper = ({ setUser }) => {
    const navigate = useNavigate();
    
    const onLogin = async ({ mailOrDni, password }) => { 
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mailOrDni, password })
            });
    
            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setUser(data.user);
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                const errorText = await response.text();
                console.error("Error en la solicitud:", errorText);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorText,
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar al servidor. Por favor, intenta de nuevo más tarde.',
                confirmButtonText: 'OK'
            });
        }
    };

    return <Login onLogin={onLogin} />;
};

export default LoginWrapper;
