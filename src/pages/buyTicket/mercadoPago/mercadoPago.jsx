import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ticket.css";
import StatusPay from "../statusPay";

function MercadoPago({ ticketData, userId }) {
  const [showButton, setShowButton] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const initializeMercadoPago = async () => {
      try {
        if (!window.MercadoPago) {
          const script = document.createElement("script");
          script.src = "https://sdk.mercadopago.com/js/v2";
          script.async = true;
          script.onload = () => {
            setShowButton(true);
          };
          document.body.appendChild(script);
        } else {
          setShowButton(true);
        }
      } catch (error) {
        console.error("Error en la solicitud a Mercado Pago:", error);
        alert("Error al procesar la solicitud de Mercado Pago.");
      }
    };

    initializeMercadoPago();
  }, [ticketData]);

  const getSeatLabel = (index) => {
    const seatsPerRow = 21;
    const row = String.fromCharCode(65 + Math.floor(index / seatsPerRow));
    const seatNumber = (index % seatsPerRow) + 1;
    return `${row}${seatNumber}`;
  };

  const seatLabels = ticketData.seats ? ticketData.seats.map(getSeatLabel) : [];

  const handleCheckout = async () => {
    if (initialized) return;

    try {
      const mp = new window.MercadoPago("APP_USR-a6a60bed-1354-4351-8e53-c9b95c56e5d2", {
        locale: "es-AR",
      });

      const response = await axios.post("http://localhost:3001/create_preference", {
        title: ticketData.title,
        quantity: 1,
        price: ticketData.price,
        idUser: userId,
      });

      const preference = response.data;

      const bricksBuilder = mp.bricks();
      bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preference.id,
        },
      });

      setInitialized(true);
      setShowButton(false);

      setPaymentStatus("pending");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago.");
    }
  };

  return (
    <div className="checkout-btn-container">
      <h2 className="titleMP">Resumen de la compra</h2>
      <p className="titleFilmMP">Película: {ticketData.title}</p>
      <p className="priceMP">Cantidad de Entradas: {ticketData.quantity}</p>
      <p className="chairMP">Asientos: {seatLabels.join(", ")}</p>
      <p className="finalPriceMP">Total a pagar: ${ticketData.price}</p>
      <div className="checkout-btn">
        {showButton && <button id="checkout-btn" onClick={handleCheckout}>Comprar</button>}
      </div>
      <div className="btn-MP">
        <div id="wallet_container"></div>
      </div>
    </div>
  );
}

export default MercadoPago;
