import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loggedUser.css";

function Admin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <div>
            <div className="btnUser">
                <button className="buttonUser" onClick={handleLogout}>Salir</button>
            </div>
            <h1 className="titleLogged">ADMIN</h1>
            <div className="adminFeatures">
                <Link to="/editAdminData" className="adminLink">
                    <div className="featureCard">Administrar Usuarios</div>
                </Link>
                <Link to="/addFilmAdmin" className="adminLink">
                    <div className="featureCard">Agregar Películas</div>
                </Link>
                <Link to="/deleteFilmAdmin" className="adminLink">
                    <div className="featureCard">Eliminar Películas</div>
                </Link>
                <Link to="/addTheaterHourAdmin" className="adminLink">
                    <div className="featureCard">Agregar Función</div>
                </Link>
                <Link to="/deleteTheaterHourAdmin" className="adminLink">
                    <div className="featureCard">Eliminar Función</div>
                </Link>
                <Link to="/verifyVoucher" className="adminLink">
                    <div className="featureCard">Verificar Código de Entrada</div>
                </Link>
            </div>
            <div className="footerLoggedAdmin"></div>
        </div>
    );
}

export default Admin;
