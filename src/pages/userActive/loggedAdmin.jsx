import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./loggedUser.css";

function Admin() {
    return (
        <div>
            <div className="btnUser">
                <button className="buttonUser">Editar</button>
                <button className="buttonUser">Salir</button>
            </div>
            <h1>ADMIN</h1>
            <h5 className="title">Panel de Administrador</h5>
            <div className="adminFeatures">
                <Link to="/admin/..." className="adminLink">
                    <span>Administrar Usuarios</span>
                </Link>
                <Link to="/admin/..." className="adminLink">
                    <span>Administrar Películas</span>
                </Link>
            </div>
        </div>
    );
}

export default Admin;
