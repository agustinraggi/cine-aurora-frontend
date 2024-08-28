import React, { useState } from "react";
import axios from "axios";
import "../loggedUser.css";

function VerifyVoucher() {
    const [voucher, setVoucher] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");

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
                    dia de la funcion: ${ticket.date}
                    hora de la funcion: ${ticket.time}
                    formato de la funcion: ${ticket.typeOfFunction}
                    lenguaje: ${ticket.language}
                `;
                setVerificationMessage(ticketDetails);
            } else {
                setVerificationMessage("El código no es válido.");
            }
        } catch (error) {
            console.error("Error al verificar el código:", error.response || error.message);
            setVerificationMessage("Hubo un error al verificar el código.");
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
            <div className="footerVerifyVoucher">

            </div>
        </div>
    );
}

export default VerifyVoucher;
