import axiosInstance from './axiosConfig';
import Swal from 'sweetalert2';

const handleApiError = (error, message) => {
    console.error(message, error);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'Aceptar',
    });
    throw error; 
};

// Obtener el token del usuario que se loguea
export const tokenUser = async ({ mailOrDni, password }) => {
    try {
        const response = await axiosInstance.post('/login', { mailOrDni, password });
        return response.data; 
    } catch (error) {
        handleApiError(error, 'Error al iniciar sesión.');
    }
};

// Función para crear la preferencia de pago en el backend
export const createPreference = async ({ title, quantity = 1, price, userId }) => {
    try {
        const response = await axiosInstance.post(`/create_preference`, {
            title,
            quantity,
            price,
            idUser: userId,
        });
        return response;
    } catch (error) {
        handleApiError(error, "Error al crear la preferencia de pago.");
    }
};

// Función para crear un ticket en el backend
export const createTicket = async (ticketInfo) => {
    try {
        const response = await axiosInstance.post(`/createTicket`, ticketInfo);
        return response.data;
    } catch (error) {
        handleApiError(error, "Error al registrar el ticket en el sistema.");
    }
};

