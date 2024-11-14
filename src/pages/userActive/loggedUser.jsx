import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaSearch } from 'react-icons/fa';
import { getTickets, updateTicketStatus, updateSeats } from '../../utils/apiUser';
import "./loggedUser.css";

function LoggedUser({ userId }) {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const preference_id = queryParams.get('preference_id');
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); 

    // Función para generar el código de la película
    const generateCode = (codeString) => {
        if (!codeString) return 'N/A';
        return codeString.replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase();
    };

    // Función para traducir el estado del ticket
    const translateStatus = (status) => {
        switch (status) {
        case 'paid':
            return 'Pago';
        case 'used':
            return 'Usado';
        case 'pending':
            return 'Pendiente';
        default:
            return 'Desconocido';
        }
    };

    // Formato de la fecha de compra
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    // Mostrar detalles del ticket en un modal
    const showTicketDetails = (ticket) => {
        Swal.fire({
            title: <strong>Detalles del Ticket</strong>,
            html: 
                `<p><strong>Película:</strong> ${ticket.nameFilm}</p>
                <p><strong>Fecha de Compra:</strong> ${formatDate(ticket.purchaseDate)}</p>
                <p><strong>Código:</strong> ${generateCode(ticket.voucher)}</p>
                <p><strong>Precio Final:</strong> $${ticket.finalPrice}</p>
                <p><strong>Fecha:</strong> ${ticket.date}</p>
                <p><strong>Hora:</strong> ${ticket.time}</p>
                <p><strong>Tipo de Función:</strong> ${ticket.typeOfFunction}</p>
                <p><strong>Idioma:</strong> ${ticket.language}</p>
                <p><strong>Asientos:</strong> ${JSON.parse(ticket.chair).join(', ')}</p>
                <p><strong>Estado del Ticket:</strong> ${translateStatus(ticket.status)}</p>`,
            icon: 'info',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Cerrar',
            customClass: {
                popup: 'my-custom-popup'
            }
        });
    };

    // Manejo del cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Obtener los tickets cuando cambia el término de búsqueda o el ID de usuario
    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const ticketsData = await getTickets(userId, searchTerm);
                if (ticketsData && ticketsData.length > 0) {
                    const sortedTickets = ticketsData.filter(ticket => ticket.status === 'paid' || ticket.status === 'used')
                        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
                    setTickets(sortedTickets);
                } else {
                    console.log("No se encontraron tickets para este usuario.");
                    setTickets([]);
                }
            } catch (error) {
                console.error("Error al obtener los tickets:", error);
                setTickets([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [searchTerm, userId]);

    // Manejo del estado de la compra (aprobado)
    useEffect(() => {
        const handlePaymentStatus = async () => {
            if (status === 'approved' && preference_id) {
                await updateTicketStatus(preference_id);
                const ticketsData = await getTickets(userId);
                const sortedTickets = ticketsData.filter(ticket => ticket.status === 'paid')
                    .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
                setTickets(sortedTickets);
                const mostRecentTicket = sortedTickets[0];
                const { chair, idMovieTheater } = mostRecentTicket;
                await updateSeats(JSON.parse(chair), idMovieTheater);
                Swal.fire({
                    title: "<strong>Compra Exitosa</strong>",
                    html: 
                        `<i>¡La compra de tu ticket fue exitosa!</i><br>
                        <strong>Código de la película:</strong> ${generateCode(preference_id)}<br>
                        <p>Para más información presiona el código de la película</p>`,
                    icon: "success",
                    timer: 25000,
                    timerProgressBar: true
                });
            }
        };

        handlePaymentStatus();
    }, [status, preference_id, userId]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <div>
            <div className="btnUser">
                <Link to={`/editUser/${userId}`}>
                    <button className="buttonUser">Editar</button>
                </Link>
                <button className="buttonUser" onClick={handleLogout}>Salir</button>
            </div>
            <h5 className="titleLogged">Historial de Compras</h5>
            <div className="searchContainer">
                <input
                    type="text"
                    placeholder="Buscar por película"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FaSearch className="searchIcon" />
            </div>
            {loading ? (
                <p>Cargando tus tickets...</p> 
            ) : (
                <table className="userHistory">
                    <thead>
                        <tr>
                            <th>Fecha de Compra</th>
                            <th>Código</th>
                            <th>Película</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan="3">No se encontraron tickets para este usuario.</td>
                            </tr>
                        ) : (
                            tickets.map((ticket, index) => (
                                <tr key={index} onClick={() => showTicketDetails(ticket)}>
                                    <td>{formatDate(ticket.purchaseDate)}</td>
                                    <td className="codeCell">{generateCode(ticket.voucher)}</td>
                                    <td>{ticket.nameFilm}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
            <div className="footerLoggedUser"></div>
        </div>
    );
}

export default LoggedUser;
