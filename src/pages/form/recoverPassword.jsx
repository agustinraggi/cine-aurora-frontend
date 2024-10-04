import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./recoverPassword.css"; 

function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL_BACK}/recover-password`, { email });
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
        <div className="containerRecoverPassword"> 
            <form onSubmit={handleSubmit} className="formRecoverPassWord"> 
                <h2 className="titleRecoverPassWord">Recuperar Contraseña</h2> 
                <div className="inputContainer">
                    <label className="formLabelRecoverPassWord">Correo Electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="formControlRecoverPassWord"
                    />
                </div>
                <button type="submit" className="submit-btn">Enviar enlace de recuperación</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default RecoverPassword;
