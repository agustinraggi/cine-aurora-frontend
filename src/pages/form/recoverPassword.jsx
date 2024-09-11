import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./recoverPassword.css"; 

function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/recover-password", { email });
            setMessage(response.data.message);

            Swal.fire({
                title: "Correo enviado",
                text: "Se ha enviado un enlace de recuperación a tu correo.",
                icon: "success",
                timer: 4000,
                showConfirmButton: false,
            });
        } catch (error) {
            setMessage("Error al enviar el correo de recuperación.");
            Swal.fire({
                title: "Error",
                text: "No se pudo enviar el correo de recuperación.",
                icon: "error",
                footer: "Intenta nuevamente más tarde",
            });
        }
    };

    return (
        <div className="recover-password-container">
            <h2 className="recover-password-title">Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit} className="recover-password-form">
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="email-input"
                />
                <button type="submit" className="submit-btn">Enviar enlace de recuperación</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default RecoverPassword;
