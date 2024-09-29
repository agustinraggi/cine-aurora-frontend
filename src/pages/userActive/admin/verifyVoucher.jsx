import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../loggedUser.css";

function VerifyVoucher() {
    const [voucher, setVoucher] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");
    const [ticketId, setTicketId] = useState(null); 
    const [isPaid, setIsPaid] = useState(false); 

    const handleVoucherChange = (event) => {
        setVoucher(event.target.value.toUpperCase());
    };

    const handleVerifyVoucher = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/allTicket`);
            const ticket = response.data.find(ticket => 
                ticket.voucher.replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase() === voucher.toUpperCase()
            );

            if (ticket) {
                const ticketDetails = `
                    El código es válido.
                    Estado: ${ticket.status}
                    Detalles de la entrada:
                    Nombre de la película: ${ticket.nameFilm}
                    Asientos: ${JSON.parse(ticket.chair).join(", ")}
                    Precio final: ${ticket.finalPrice}
                    Fecha de compra: ${new Date(ticket.purchaseDate).toLocaleString()}
                    Día de la función: ${ticket.date}
                    Hora de la función: ${ticket.time}
                    Formato de la función: ${ticket.typeOfFunction}
                    Lenguaje: ${ticket.language}
                `;
                setVerificationMessage(ticketDetails);
                setTicketId(ticket.idTicket); 
                
                if (ticket.status === "used") {
                    Swal.fire({
                        icon: "warning",
                        title: 'Ticket ya utilizado',
                        text: 'Este ticket ya ha sido usado y no se puede volver a usar.',
                        position: "center",
                        showConfirmButton: true,
                        confirmButtonColor: '#f39c12', 
                    });
                } else if (ticket.status === "paid") {
                    setIsPaid(true);  
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: 'Ticket inválido',
                    text: 'No se encontró un ticket con este código.',
                    position: "center",
                    showConfirmButton: true,
                    confirmButtonColor: '#d33',
                });
            }
        } catch (error) {
            console.error("Error al verificar el código:", error.response || error.message);
            setVerificationMessage("Hubo un error al verificar el código.");
        }
    };

    const handleUseTicket = async () => {
        if (!ticketId) return;

        try {
            await axios.post(`http://localhost:3001/useTicket`, { idTicket: ticketId });
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Ticket usado con éxito',
                text: 'El ticket ha sido marcado como usado.',
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
            });
            setIsPaid(false);
        } catch (error) {
            console.error("Error al usar el ticket:", error);
            setVerificationMessage("Hubo un error al usar el ticket.");
        }
    };

    return (
        <div className="verifyVoucher">
            <h2 className="veryTitle">Verificar Código de Entrada</h2>
            <input
                type="text"
                value={voucher}
                onChange={handleVoucherChange}
                placeholder="Ingrese el código"
            />
            <button className="buttonUser" onClick={handleVerifyVoucher}>Verificar</button>
            {verificationMessage && <pre className="verificationMessage">{verificationMessage}</pre>}
            {isPaid && (
                <button className="buttonUser" onClick={handleUseTicket}>Usar Ticket</button>
            )}
            <div className="footerVerifyVoucher"></div>
        </div>
    );
}

export default VerifyVoucher;
