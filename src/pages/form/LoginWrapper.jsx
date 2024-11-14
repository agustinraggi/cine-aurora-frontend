import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Login from "./login";
import { setToken } from '../../utils/axiosConfig';
import { tokenUser } from "../../utils/apiService";


const LoginWrapper = ({ setUser }) => {
    const navigate = useNavigate();
    
    const onLogin = async ({ mailOrDni, password }) => { 
        try {
            const data = await tokenUser({ mailOrDni, password });
            if (data) {
                setToken(data.token); 
                setUser(data.user);
                navigate('/');

                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al iniciar sesión.',
                confirmButtonText: 'OK'
            });
        }
    };

    return <Login onLogin={onLogin} />;
};

export default LoginWrapper;