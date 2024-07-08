import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loggedUser.css";

function Admin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        window.location.reload();
    };

    return (
        <div>
            <div className="btnUser">
                <button className="buttonUser" onClick={handleLogout}>Salir</button>
            </div>
            <h1>ADMIN</h1>
            <h5 className="title">Panel de Administrador</h5>
            <div className="adminFeatures">
                <Link to="/editAdminData" className="adminLink">
                    <span>Administrar Usuarios</span>
                </Link>
                <Link to="/addFilmAdmin" className="adminLink">
                    <span>Administrar Películas</span>
                </Link>
                <Link to="/deleteFilmAdmin" className="adminLink">
                    <span>Eliminar Películas</span>
                </Link>
            </div>
        </div>
    );
}

export default Admin;
