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

// agregar funcion de la pelicula
export const createMovieTheater = async (detallesFuncion, peliculaSeleccionada) => {
    try {
        // Enviar datos al servidor
        await axiosInstance.post('/createMovieTheater', { 
            nameFilm: detallesFuncion.nombrePelicula,
            codeFilm: detallesFuncion.codigoPelicula,
            date: detallesFuncion.fecha,
            time: detallesFuncion.hora,
            typeOfFunction: detallesFuncion.tipo,
            language: detallesFuncion.subtitulada,
            price: detallesFuncion.precio
        });
        Swal.fire({
            title: "<strong>Función Registrada</strong>",
            html: `<i>La película <strong>${peliculaSeleccionada.nameFilm}</strong> fue registrada con éxito y ya está disponible para su venta!</i>`,
            icon: "success",
            timer: 6000
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡No se pudo registrar la función!",
            footer: error.message === "Network Error" ? "Intente más tarde" : error.message
        });
    }
};

// Obtener todas las funciones
export const getAllMovieTheater = async () => {
    try {
        const response = await axiosInstance.get('/allMovieTheater');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las funciones de películas:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener las funciones de las películas.',
            confirmButtonText: 'Aceptar',
        });
        throw error;  // Lanzamos el error para manejarlo en el componente si es necesario
    }
};


// Eliminar una función por su ID
export const deleteMovieTheater = async (idMovieTheater, nameFilm) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: `No podrás revertir esta acción. ¿Estás seguro de que deseas eliminar la función de ${nameFilm}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        });
        if (result.isConfirmed) {
            await axiosInstance.delete(`/deleteMovieTheater/${idMovieTheater}`);
            Swal.fire({
                title: "¡Eliminado!",
                text: `La función de ${nameFilm} ha sido eliminada.`,
                icon: "success",
                timer: 2000
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Tu archivo está a salvo :)",
                icon: "error",
                timer: 2000
            });
        }
    } catch (error) {
        handleApiError(error, `No se pudo eliminar la función de ${nameFilm}`);
    }
};

