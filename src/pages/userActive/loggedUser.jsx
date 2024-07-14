import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loggedUser.css";

function User({ userId }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        window.location.reload(); 
    };

    return (
        <div>
            <div className="btnUser">
                <Link to={`/editUser/${userId}`}>
                    <button className="buttonUser">Editar</button>
                </Link>
                <button className="buttonUser" onClick={handleLogout}>Salir</button>
            </div>
            <h5 className="titleLogged">Historial de Compras</h5>
            <tr className="userHistory">
                <th>Fecha de Compra</th>
                <th>Codigo</th>
                <th>Pelicula</th>
            </tr>
            <div className="footerLoggedUser">
            </div>
        </div>
    );
}

export default User;
