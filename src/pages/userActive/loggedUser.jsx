import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./loggedUser.css";

function User(){

    return(
        <div>
            <div className="btnUser">
            <button className="buttonUser">Editar</button>
            <button className="buttonUser">Salir</button>
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