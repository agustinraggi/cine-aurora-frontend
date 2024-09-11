import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./resetPassword.css";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Las contraseñas no coinciden",
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/reset-password", { token, newPassword: password });
            if (response.status === 200) {
                Swal.fire({
                    title: "<strong>Contraseña Restablecida</strong>",
                    html: "<i>Su contraseña ha sido actualizada con éxito!</i>",
                    icon: "success",
                    timer: 4000,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo restablecer la contraseña",
                footer: error.response ? error.response.data.message : "Intente más tarde",
            });
        }
    };

    return (
        <div className="reset-password-container">
            <h2 className="reset-password-title">Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="password-input"
                    />
                </div>
                <div className="input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirmar nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="password-input"
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password-btn"
                >
                    {showPassword ? "Ocultar" : "Mostrar"}
                </button>
                <button type="submit" className="submit-btn">Restablecer contraseña</button>
            </form>
            <div className="footerResetPassword">

            </div>
        </div>
    );
}

export default ResetPassword;
