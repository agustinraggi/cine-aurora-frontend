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

    // Generamos un código único para ese usuario
    const generateCode = (codeString) => {
        if (!codeString) return 'N/A';
        return codeString.replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase();
    };

    // Reformatemos la fecha
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

    useEffect(() => {
        const handlePaymentStatus = async () => {
            if (status === 'approved' && preference_id) {
                try {
                    // Actualizar el estado del ticket a "paid"
                    await axios.post("http://localhost:3001/updateTicketStatus", {
                        preference_id,
                        status: 'paid',
                    });

                    // Obtener los tickets actualizados del backend
                    const ticketResponse = await axios.get(`http://localhost:3001/ticketUser/${userId}`);
                    const ticketsData = ticketResponse.data;

                    if (ticketsData.length > 0) {
                        // Ordenar los tickets por fecha de compra en orden descendente
                        const sortedTickets = ticketsData.filter(ticket => ticket.status === 'paid')
                            .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

                        setTickets(sortedTickets);

                        // Obtener el código del voucher del ticket más reciente
                        const mostRecentTicket = sortedTickets[0];
                        const voucherCode = mostRecentTicket.voucher;

                        if (voucherCode) {
                            // Mostrar el mensaje de éxito
                            Swal.fire({
                                title: "<strong>Compra Exitosa</strong>",
                                html: `
                                    <i>¡La compra de tu ticket fue exitosa!</i><br>
                                    <strong>Código de la película:</strong> ${generateCode(voucherCode)}<br>`,
                                icon: "success",
                                timer: 25000,
                                timerProgressBar: true
                            });
                        } else {
                            console.error("El código del voucher no está disponible.");
                        }
                    } else {
                        console.error("No se encontraron tickets pagados para el usuario.");
                    }

                } catch (error) {
                    console.error("Error al actualizar el ticket:", error);
                }
            } else {
                console.log("Pago no aprobado o falta el ID de preferencia.");
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
                        <tr key={index}>
                            <td>{formatDate(ticket.purchaseDate)}</td>
                            <td>{generateCode(ticket.voucher)}</td>
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
