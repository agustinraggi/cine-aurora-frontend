import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
    const [isMenuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!isMenuActive);
    };

    return (
        <nav className="headerNav">
            <div className={`hamMenuIcon ${isMenuActive ? "active" : ""}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`menuLinks ${isMenuActive ? "active" : ""}`}>
                <Link to="/">
                    <span>Cine Aurora</span>
                </Link>
                <Link to="/upcoming">
                    <span>Próximamente</span>
                </Link>
                <Link to="/FQ">
                    <span>Preguntas Frecuentes</span>
                </Link>
                {user ? (
    <>
        {user.tips === 'admin' ? (
            <Link to="/adminActive">
                <span className="userActive">
                    {user.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="iconUser" viewBox="0 -960 960 960" fill="white">
                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                    </svg>
                </span>
            </Link>
        ) : user.tips === 'employee' ? (
            <Link to="/employee">
                <span className="userActive">
                    {user.name}
                </span>
            </Link>
        ) : (
            <Link to="/userActive">
                <span className="userActive">
                    {user.name}
                    <svg className="iconUser" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white">
                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                    </svg>
                </span>
            </Link>
        )}
    </>
) : (
    <Link to="/login">
        <span>Usuario</span>
    </Link>
)}
            </div>
        </nav>
    );
};

export default Header;
