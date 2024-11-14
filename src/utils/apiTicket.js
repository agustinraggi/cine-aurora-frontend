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


// Obtener sillas ocupadas por ID de sala
export const getOccupiedSeats = async (idMovieTheater) => {
    try {
        const response = await axiosInstance.get(`/occupiedSeats/${idMovieTheater}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener sillas ocupadas.');
    }
};

// Obtener detalles de la película por ID
export const fetchMovieDetail = async (id) => {
    try {
        const response = await axiosInstance.get(`/movie/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener los detalles de la película.');
    }
};

// Obtener funciones de una película
export const MovieFunctions = async (codeFilm) => {
    try {
        const response = await axiosInstance.get(`/movieFunctions/${codeFilm}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener funciones de la película.');
    }
};

// Obtener precio de la entrada
export const getPrice = async (params) => {
    try {
        const response = await axiosInstance.get('/getPrice', { params });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener el precio de la entrada.');
    }
};