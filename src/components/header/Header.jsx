import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <Link to="/" style={{ textDecoration: "none" }} className="navbar-brand">
                    <span>Cine Aurora</span>
                </Link>
                <button
                    className="navbar-toggler ms-auto"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul id="barra__tareas" className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/movies/popular" style={{ textDecoration: "none" }} className="navbar-brand">
                                <span>Cartelera</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/movies/upcoming" style={{ textDecoration: "none" }} className="navbar-brand">
                                <span>Proximamente</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            {user ? (
                            <Link to="/userActive" style={{ textDecoration: "none" }} className="navbar-brand">
                                <span className="userActive">{user.name}</span>
                            </Link>
                            ) : (
                                <Link to="/login" style={{ textDecoration: "none" }} className="navbar-brand">
                                    <span>Usuario</span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
