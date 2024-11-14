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

// Obtener todas las películas próximas a estrenarse
export const getAllFilmSoon = async () => {
    try {
        const response = await axiosInstance.get('/allFilmSoon');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener las películas próximas a estrenarse.');
    }
};

// // Función para obtener los detalles de una película por su id
// export const getMovieDetailSoon = async (id) => {
//     try {
//         const response = await axiosInstance.get(`/movieSoon/${id}`);
//         return response.data;
//     } catch (error) {
//         handleApiError(error, 'Error al obtener las películas próximas a estrenarse.');
//     }
// };

// // Función para obtener los trailers de una película por su id
// export const getMovieTrailersSoon = async (id) => {
//     try {
//         const response = await axiosInstance.get(`/movie/videos/${id}`);
//         return response.data.results;
//     } catch (error) {
//         handleApiError(error, 'Error al obtener las películas próximas a estrenarse.');
//     }
// };

// Función para registrar una nueva película proximamente
export const createFilmSoon = async (codeFilm, nameFilm) => {
    try {
        await axiosInstance.post(`/createSoonFilm`, {
            codeFilm,
            nameFilm
        });
    } catch (error) {
        handleApiError(error, 'Error al registrar la película.');
    }
};

// Eliminar película proximamente por ID 
export const deleteMovieSoon = async (idSoonFilm, nameFilm) => {
    try {
        await axiosInstance.delete(`/deleteSoonFilm/${idSoonFilm}`);
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
