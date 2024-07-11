import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ticket.css";

function MercadoPago({ ticketData }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const initializeMercadoPago = async () => {
      try {
        const orderData = {
          title: ticketData.title,
          quantity: 1,
          price: ticketData.price,
        };

        // Lógica para cargar los scripts de Mercado Pago si no están cargados
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

  const handleCheckout = async () => {
    try {
      const mp = new window.MercadoPago("TEST-04c83bfa-d99c-4d89-883d-3caa1b545a1a", {
        locale: "es-AR",
      });

      const response = await axios.post("http://localhost:3001/create_preference", {
        title: ticketData.title,
        quantity: 1,
        price: ticketData.price,
      });

      const preference = response.data;
      const bricksBuilder = mp.bricks();

      bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preference.id,
        },
      });
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago.");
    }
  };

  return (
    <div className="checkout-btn-container">
      <h2 className="titleMP">{ticketData.title}</h2>
      <p className="priceMP">$ {ticketData.price}</p>
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
