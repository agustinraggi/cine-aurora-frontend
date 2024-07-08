import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loggedUser.css";

function User(){

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        window.location.reload();
    };

    return(
        <div>
            <div className="btnUser">
            <Link to = "/editUser">
            <button className="buttonUser">Editar</button>
            </Link>
            <div className="btnUser">
                <button className="buttonUser" onClick={handleLogout}>Salir</button>
            </div>
            </div>
            <h5 className="title">Historial de Compras</h5>
            <tr className="userHistory">
                <th>Fecha de Compra</th>
                <th>Codigo</th>
                <th>Pelicula</th>
            </tr>
        </div>
        
    );
}
export default User;