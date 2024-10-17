import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./changePassword.css";

function ChangePassword() {
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";
    const { idUser } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword1, setShowNewPassword1] = useState(false);
    const [showConfirmPassword2, setShowConfirmPassword2] = useState(false);

    // Validar solo la nueva contraseña y su confirmación
    const validatePasswordForm = () => {
        if (!newPassword || newPassword.length < 8) {
            alert("La nueva contraseña debe tener al menos 8 caracteres");
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            alert("Las contraseñas no coinciden");
            return false;
        }
        return true;
    };

    const updatePassword = () => {
        if (validatePasswordForm()) {
            axios
                .put(`${URL_BACK}/changePassword/${idUser}`, {
                    newPassword,
                })
                .then(() => {
                    Swal.fire({
                        title: "<strong>Contraseña Actualizada</strong>",
                        icon: "success",
                        html: "<i>Su contraseña ha sido cambiada exitosamente.</i>",
                        timer: 2000,
                    }).then(() => {
                        navigate(`/userActive`);
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo actualizar la contraseña.",
                    });
                });
        }
    };

    return (
        <div>
            <div className="containerChangePassword">
                <div className="containerChangePassword mb-5">
                    <div className="row">
                        <form className="formChangePassword">
                            <h1 className="titleChangePassword">Cambiar Contraseña</h1>
                            <div className="changePasswordForm">
                                <label className="formLabelChangePassword">Nueva Contraseña</label>
                                <div className="inputContainer">
                                    <input
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    value={newPassword}
                                    type={showNewPassword1 ? "text" : "password"}
                                    className="formControlChangePassword"
                                    placeholder="Ingrese su nueva contraseña"
                                    />
                                    <span 
                                        onClick={() => setShowNewPassword1(!showNewPassword1)} 
                                        className="passwordToggleChange"
                                        role="button"
                                        aria-label={showNewPassword1 ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showNewPassword1 ? "👁️" : "🔒"}
                                    </span>
                                </div>
                            </div>
                            <div className="changePasswordForm">
                                <label className="formLabelChangePassword">Confirmar Nueva Contraseña</label>
                                <div className="inputContainer">
                                    <input
                                        onChange={(event) => setConfirmNewPassword(event.target.value)}
                                        value={confirmNewPassword}
                                        type={showConfirmPassword2 ? "text" : "password"}
                                        className="formControlChangePassword"
                                        placeholder="Confirme su nueva contraseña"
                                    />
                                    <span 
                                        onClick={() => setShowConfirmPassword2(!showConfirmPassword2)} 
                                        className="passwordToggleChange"
                                        role="button"
                                        aria-label={showConfirmPassword2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showConfirmPassword2 ? "👁️" : "🔒"}
                                    </span>
                                </div>
                            </div>
                            <div className="btnChangePassword btnEditUser">
                                <button type="button" className="Btn btn-primary" id = "btnChangePasswordUpdate" onClick={updatePassword}>
                                    Cambiar Contraseña
                                </button>
                                <button type="button" className="Btn btn-secondary" id="btnChangePasswordCancel" onClick={() => navigate(-1)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footerChangePasseword"></div>
        </div>
    );
}

export default ChangePassword;
