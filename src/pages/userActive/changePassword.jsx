import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./changePassword.css";

function ChangePassword() {
    const { idUser } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                .put(`http://localhost:3001/changePassword/${idUser}`, {
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
                                type={showNewPassword ? "text" : "password"}
                                className="formControlChangePassword"
                                placeholder="Ingrese su nueva contraseña"
                            />
                            <button
                                type="button"
                                className="togglePassword"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? "👁️" : "🔒"}
                            </button>
                        </div>
                    </div>
                    <div className="changePasswordForm">
                        <label className="formLabelChangePassword">Confirmar Nueva Contraseña</label>
                        <div className="inputContainer">
                            <input
                                onChange={(event) => setConfirmNewPassword(event.target.value)}
                                value={confirmNewPassword}
                                type={showConfirmPassword ? "text" : "password"}
                                className="formControlChangePassword"
                                placeholder="Confirme su nueva contraseña"
                            />
                            <button
                                type="button"
                                className="togglePassword"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "👁️" : "🔒"}
                            </button>
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
    );
}

export default ChangePassword;
