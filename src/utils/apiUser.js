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


// Función para obtener los tickets del usuario
export const getTickets = async (userId, searchTerm = '') => {
    try {
        let url = `/ticketUser/${userId}`;
        if (searchTerm) {
            url = `/searchMovies?name=${searchTerm}`;
        }
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener los tickets.');
    }
};

// Función para actualizar el estado del ticket después de una compra exitosa
export const updateTicketStatus = async (preferenceId) => {
    try {
        await axiosInstance.post('/updateTicketStatus', {
            preference_id: preferenceId,
            status: 'paid',
        });
    } catch (error) {
        handleApiError(error, 'Error al actualizar el estado del ticket.');
    }
};

// Función para actualizar los asientos después de la compra
export const updateSeats = async (chairs, movieTheaterId) => {
    try {
        await axiosInstance.post('/updateSeats', {
            chair: chairs,
            idMovieTheater: movieTheaterId,
        });
    } catch (error) {
        handleApiError(error, 'Error al actualizar los asientos.');
    }
};

// Cambiar contraseña de un usuario
export const changeUserPassword = async (userId, newPassword) => {
    try {
        await axiosInstance.put(`/changePassword/${userId}`, { newPassword });
        Swal.fire({
            title: "<strong>Contraseña Actualizada</strong>",
            icon: "success",
            html: "<i>Su contraseña ha sido cambiada exitosamente.</i>",
            timer: 2000,
            confirmButtonText: 'Aceptar',
        });
    } catch (error) {
        handleApiError(error, 'Error al cambiar la contraseña.');
    }
};

// Actualizar la informacion del usuario
export const updateUser = async (userData) => {
    try {
        await axiosInstance.put('/update', userData);
    } catch (error) {
        handleApiError(error, 'Error al actualizar la informacion del usuario.');
    }
};

// Actualizar la informacion del usuario
export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/create', userData);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al actualizar la informacion del usuario.');
    }
};

// mostrar usuario por id
export const allCostumer = async (idUser) => {
    try {
        const response = await axiosInstance.get(`/allCustomer/${idUser}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al obtener los datos del usuario.');
    }
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

// Función para enviar solicitud de recuperación de contraseña
export const recoverPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/recover-password', { email });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al intentar recuperar la contraseña.');
    }
};
// Función para restablecer la contraseña
export const resetPassword = async (token, password) => {
    try {
        const response = await axiosInstance.post('/reset-password', { token, newPassword: password });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error al intentar recuperar la contraseña.');
    }
};

// Función para verificar el voucher de un ticket
export const verifyVoucher = async (voucher) => {
    try {
        const response = await axiosInstance.get('/allTicket');
        const ticket = response.data.find(ticket => 
            ticket.voucher.replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase() === voucher.toUpperCase()
        );

        if (ticket) {
            return ticket;
        } else {
            throw new Error('No se encontró un ticket con este código');
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: 'Ticket inválido',
            text: error.message || 'No se pudo verificar el código.',
            position: "center",
            showConfirmButton: true,
            confirmButtonColor: '#d33',
        });
        throw error;
    }
};

// Función para actualizar el estado de un ticket (usado)
export const useTicket = async (ticketId) => {
    try {
        await axiosInstance.post('/useTicket', { idTicket: ticketId });
        Swal.fire({
            position: "center",
            icon: "success",
            title: 'Ticket usado con éxito',
            text: 'El ticket ha sido marcado como usado.',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: 'Error al usar el ticket',
            text: 'Hubo un error al marcar el ticket como usado.',
            showConfirmButton: true,
            confirmButtonColor: '#d33',
        });
        throw error;
    }
};

// Obtener lista de clientes (usuarios)
export const fetchCustomers = async (page = 1, limit = 5) => {
    try {
        const response = await axiosInstance.get(`/allCustomer?page=${page}&limit=${limit}`);
        return {
            users: response.data.users,
            totalPages: response.data.totalPages,
        };
    } catch (error) {
        handleApiError(error, 'Error al obtener la lista de clientes.');
    }
};

// Eliminar usuario por ID
export const deleteUser = async (idUser, name, fetchCustomersCallback) => {
    const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: `No podrás revertir esta acción. ¿Estás seguro de que deseas eliminar a ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    });
    if (confirmResult.isConfirmed) {
        try {
            await axiosInstance.delete(`/delete/${idUser}`);
            Swal.fire({
                title: "¡Eliminado!",
                text: `El usuario ${name} ha sido eliminado.`,
                icon: "success",
                timer: 2000
            });
            fetchCustomersCallback();
        } catch (error) {
            const errorMessage = error.response?.data?.error || "No se pudo eliminar el usuario ya que tiene una entrada comprada.";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
                footer: errorMessage
            });
            handleApiError(error, 'Error al eliminar el usuario.');
        }
    } else if (confirmResult.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
            title: "Cancelado",
            text: "Tu archivo está a salvo :)",
            icon: "error",
            timer: 2000
        });
    }
};