import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "../../utils/apiUser";  
import "./resetPassword.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate(); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

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
            const data = await resetPassword(token, password);
            if (data) {
                Swal.fire({
                    title: "<strong>Contraseña Restablecida</strong>",
                    html: "<i>Su contraseña ha sido actualizada con éxito!</i>",
                    icon: "success",
                    timer: 4000,
                });
                navigate("/login"); 
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo restablecer la contraseña",
                footer: error.message || "Intente más tarde",
            });
        }
    };

    return (
        <div>
            <div className="containerResetPassword">
                <div className="containerResetPassword mb-5">
                    <div className="row">
                        <form onSubmit={handleSubmit} className="formResetPassword">
                            <h1 className="titleResetPassword">Restablecer Contraseña</h1>
                            <div className="resetPasswordForm">
                                <label className="formLabelResetPassword">Nueva Contraseña</label>
                                <div className="inputContainer">
                                    <input
                                        type={showPassword1 ? "text" : "password"}
                                        placeholder="Ingrese su nueva contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="formControlResetPassword"
                                    />
                                    <span 
                                        onClick={() => setShowPassword1(!showPassword1)} 
                                        className="passwordToggleReset"
                                        role="button"
                                        aria-label={showPassword1 ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword1 ? "👁️" : "🔒"}
                                    </span>
                                </div>
                            </div>
                            <div className="resetPasswordForm">
                                <label className="formLabelResetPassword">Confirmar Nueva Contraseña</label>
                                <div className="inputContainer">
                                    <input
                                        type={showPassword2 ? "text" : "password"}
                                        placeholder="Confirme su nueva contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="formControlResetPassword"
                                    />
                                    <span 
                                        onClick={() => setShowPassword2(!showPassword2)} 
                                        className="passwordToggleReset"
                                        role="button"
                                        aria-label={showPassword2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword2 ? "👁️" : "🔒"}
                                    </span>
                                </div>
                            </div>
                            <div className="btnChangePassword">
                                <button type="submit" className="Btn btn-primary" id="btnChangePasswordUpdate">
                                    Restablecer contraseña
                                </button>
                                <button type="button" className="Btn btn-secondary" id="btnChangePasswordCancel" onClick={() => navigate(-1)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footerResetPassword"></div>
        </div>
    );
}

export default ResetPassword;
