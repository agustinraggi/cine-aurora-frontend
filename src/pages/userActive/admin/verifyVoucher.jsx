import React, { useState } from "react";
import { verifyVoucher, useTicket } from "../../../utils/apiUser";
import Swal from "sweetalert2";
import "./verifyVoucher.css"

function VerifyVoucher() {
    const [voucher, setVoucher] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");
    const [ticketId, setTicketId] = useState(null);
    const [isPaid, setIsPaid] = useState(false);


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
    
    const handleVoucherChange = (event) => {
        setVoucher(event.target.value.toUpperCase());
    };

    const handleVerifyVoucher = async () => {
        try {
            const ticket = await verifyVoucher(voucher); 
            setTicketId(ticket.idTicket);
            const ticketDetails = `
                El código es válido.
                Estado: ${translateStatus(ticket.status)}
                Nombre de la película: ${ticket.nameFilm}
                Asientos: ${JSON.parse(ticket.chair).join(", ")}
                Precio final: ${ticket.finalPrice}
                Fecha de compra: ${new Date(ticket.purchaseDate).toLocaleString()}
                Día de la función: ${ticket.date}
                Hora de la función: ${ticket.time}
            `;
            setVerificationMessage(ticketDetails);
            if (ticket.status === "used") {
                Swal.fire({
                    icon: "warning",
                    title: 'Ticket ya utilizado',
                    text: 'Este ticket ya ha sido usado y no se puede volver a usar.',
                });
            } else if (ticket.status === "paid") {
                setIsPaid(true);
            }
        } catch (error) {
            setVerificationMessage("Hubo un error al verificar el código.");
        }
    };

    const handleUseTicket = async () => {
        if (!ticketId) return;
        try {
            await useTicket(ticketId);
            setIsPaid(false);
        } catch (error) {
            setVerificationMessage("Hubo un error al usar el ticket.");
        }
    };

    return (
        <div className="verifyVoucher">
            <h2>Verificar Código de Entrada</h2>
            <input
                type="text"
                value={voucher}
                onChange={handleVoucherChange}
                placeholder="Ingrese el código"
            />
            <button onClick={handleVerifyVoucher}>Verificar</button>
            <div className="verificationMessage">
                {verificationMessage && <pre>{verificationMessage}</pre>}
            </div>
            {isPaid && <button onClick={handleUseTicket}>Usar Ticket</button>}
        </div>
    );
}

export default VerifyVoucher;
