import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function StatusPay({ ticketData, seatLabels, userId }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const preference_id = queryParams.get('preference_id');

    useEffect(() => {
        const createTicket = async () => {
            console.log("Status:", status);
            console.log("Ticket Data:", ticketData);
            console.log("Seat Labels:", seatLabels);
            console.log("User ID:", userId);
            console.log("Preference ID:", preference_id);
            if (status === 'approved' && ticketData && seatLabels && userId) {
                const ticketInfo = {
                    nameFilm: ticketData.title,
                    chair: seatLabels,
                    finalPrice: ticketData.price,
                    voucher: preference_id,
                    idUser: userId,
                };

                try {
                    const response = await axios.post("http://localhost:3001/createTicket", ticketInfo);
                    console.log("Ticket created successfully:", response.data);
                } catch (error) {
                    console.error("Error creating ticket:", error);
                }
            } else {
                console.log("Datos incompletos para crear el ticket.");
            }
        };

        createTicket();
    }, [status, preference_id, ticketData, seatLabels, userId]);

    return (
        <div>
            <h1>Pago</h1>
            <p>Status: {status}</p>
            <p>Preference ID: {preference_id}</p>
        </div>
    );
}

export default StatusPay;
