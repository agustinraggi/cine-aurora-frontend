import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./loggedUser.css";

function LoggedUser({ userId }) {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const preference_id = queryParams.get('preference_id');
    const [tickets, setTickets] = useState([]);

    // Generar un código único para el usuario
    const generateCode = (codeString) => {
        if (!codeString) return 'N/A';
        return codeString.replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase();
    };

    // Reformatar la fecha
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

    // Mostrar detalles del ticket
    const showTicketDetails = (ticket) => {
        Swal.fire({
            title: `<strong>Detalles del Ticket</strong>`,
            html: `
                <p><strong>Película:</strong> ${ticket.nameFilm}</p>
                <p><strong>Fecha de Compra:</strong> ${formatDate(ticket.purchaseDate)}</p>
                <p><strong>Código:</strong> ${generateCode(ticket.voucher)}</p>
                <p><strong>Precio Final:</strong> $${ticket.finalPrice}</p>
                <p><strong>Fecha:</strong> ${ticket.date}</p>
                <p><strong>Hora:</strong> ${ticket.time}</p>
                <p><strong>Tipo de Función:</strong> ${ticket.typeOfFunction}</p>
                <p><strong>Idioma:</strong> ${ticket.language}</p>
                <p><strong>Asientos:</strong> ${JSON.parse(ticket.chair).join(', ')}</p>
            `,
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

    useEffect(() => {
        const handlePaymentStatus = async () => {
            try {
                // Obtener los tickets del usuario
                const ticketResponse = await axios.get(`http://localhost:3001/ticketUser/${userId}`);
                const ticketsData = ticketResponse.data;

                if (status === 'approved' && preference_id) {
                    // Actualizar el estado del ticket a "paid"
                    await axios.post("http://localhost:3001/updateTicketStatus", {
                        preference_id,
                        status: 'paid',
                    });

                    Swal.fire({
                        title: "<strong>Compra Exitosa</strong>",
                        html: `
                            <i>¡La compra de tu ticket fue exitosa!</i><br>
                            <strong>Código de la película:</strong> ${generateCode(preference_id)}<br>
                            <p>Para más información presiona el código de la película</p>`,
                        icon: "success",
                        timer: 25000,
                        timerProgressBar: true
                    });
                }

                if (ticketsData.length > 0) {
                    // Filtrar y ordenar los tickets por fecha de compra en orden descendente
                    const sortedTickets = ticketsData
                        .filter(ticket => ticket.status === 'paid')
                        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

                    setTickets(sortedTickets);
                } else {
                    console.error("No se encontraron tickets pagados para el usuario.");
                }
            } catch (error) {
                console.error("Error al actualizar o obtener los tickets:", error);
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
            <table className="userHistory">
                <thead>
                    <tr>
                        <th>Fecha de Compra</th>
                        <th>Código</th>
                        <th>Película</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index} onClick={() => showTicketDetails(ticket)}>
                            <td>{formatDate(ticket.purchaseDate)}</td>
                            <td className="codeCell">{generateCode(ticket.voucher)}</td>
                            <td>{ticket.nameFilm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="footerLoggedUser"></div>
        </div>
    );
}

export default LoggedUser;
