import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./loggedUser.css";

function User({ userId }) {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/ticketUser/${userId}`);
                const sortedTickets = response.data.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
                setTickets(sortedTickets);
            } catch (error) {
                console.error("Error al obtener los tickets:", error);
            }
        };

        fetchTickets();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload(); 
    };

    // reformatemos la fecha
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

    // generamos un codigo unico para ese usario 
    const generateCode = (codeString) => {
        return codeString.replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase();
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

export default User;
