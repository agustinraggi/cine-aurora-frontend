import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Login from "./login";
import { setToken } from '../../Helpers/auth-helpers';

const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

const LoginWrapper = ({ setUser }) => {
    const navigate = useNavigate();
    
    const onLogin = async ({ mailOrDni, password }) => { 
        try {
            const response = await fetch(`${URL_BACK}/login`, {
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorText,
                    confirmButtonText: 'OK'
                });
            }
        } catch{
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