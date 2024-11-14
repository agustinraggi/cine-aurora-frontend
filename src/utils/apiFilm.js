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

// Obtener todas las películas estrenadas
export const getAllFilms = async () => {
    try {
        const response = await axiosInstance.get('/allFilm');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener todas las películas.');
    }
};

// Obtener datos de una película específica por código
export const getMovieByCode = async (codeFilm) => {
    try {
        const response = await axiosInstance.get(`/movie/${codeFilm}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener los datos de la película.');
    }
};

// obtener detalles de las peliculas 
export const getMovieDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/movie/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener los datos de la película.');
    }
};

// obtener el trailer de la pelicula 
export const getMovieTrailer = async (id) => {
    try {
        const response = await axiosInstance.get(`/movie/videos/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener los datos de la película.');
    }
};

// Función para buscar películas
export const searchMovies = async () => {
    try {
        const response = await axiosInstance.get(`/search/movie`, {
            params: {
                query: title,
                language: "es-MX"
            }
        });
        return response.data.results;
    } catch (error) {
        handleApiError(error, 'Error al obtener los resultados de búsqueda.');
    }
};

// Función para registrar una nueva película
export const createFilm = async (codeFilm, nameFilm) => {
    try {
        await axiosInstance.post(`/createFilm`, {
            codeFilm,
            nameFilm
        });
    } catch (error) {
        handleApiError(error, 'Error al registrar la película.');
    }
};

// Eliminar película por ID
export const deleteMovie = async (idFilm, nameFilm) => {
    try {
        await axiosInstance.delete(`/deleteFilm/${idFilm}`);
        Swal.fire({
            title: "¡Eliminado!",
            text: `La película ${nameFilm} ha sido eliminada.`,
            icon: "success",
            timer: 2000
        });
    } catch (error) {
        handleApiError(error, `No se pudo eliminar la película ${nameFilm}.`);
    }
};

