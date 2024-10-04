import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ticket.css";

function MercadoPago({ ticketData, userId }) {
  const [showButton, setShowButton] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

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

  const seatLabels = ticketData.seats ? ticketData.seats : [];

  const handleCheckout = async () => {
    if (initialized) return;

    try {
      const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_KEY, {
        locale: "es-AR",
      });

      const response = await axios.post(`${URL_BACK}/create_preference`, {
        title: ticketData.title,
        quantity: ticketData.quantity || 1,
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

      const ticketInfo = {
        nameFilm: ticketData.title,
        chair: seatLabels,
        finalPrice: ticketData.price,
        voucher: preference.id,
        idUser: userId,
        date: ticketData.date,
        time: ticketData.time,
        typeOfFunction: ticketData.typeOfFunction,
        language: ticketData.language,
        idMovieTheater: ticketData.idMovieTheater,
      };

      await axios.post(`${URL_BACK}/createTicket`, ticketInfo);

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
      <p className="dateMP">Fecha: {ticketData.date}</p>
      <p className="timeMP">Hora: {ticketData.time}</p>
      <p className="formatMP">Formato: {ticketData.typeOfFunction}</p>
      <p className="languageMP">Idioma: {ticketData.language}</p>
      {/* esto despues no va */}
      <p className="languageMP">id: {ticketData.idMovieTheater}</p>
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
