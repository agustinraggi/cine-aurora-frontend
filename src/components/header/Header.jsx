import React, { useState } from "react";
import "./Header.css";
import ImgUser from '../../assets/user.png'
import { Link } from "react-router-dom";

const Header = ({ user, userId }) => {
    const [isMenuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!isMenuActive);
    };
    return (
        <nav className="headerNav">
            <div className={`hamMenuIcon ${isMenuActive ? "active" : ""}`} onClick={toggleMenu}>
                <span className="spanBurger"></span>
                <span className="spanBurger"></span>
                <span className="spanBurger"></span>
            </div>
            <div className={`menuLinks ${isMenuActive ? "active" : ""}`}>
                <Link className="linkHeader" to="/">
                    <span className="textHeader">Cine Aurora</span>
                </Link>
                <Link className="linkHeader" to="/upcoming">
                    <span className="textHeader">Próximamente</span>
                </Link>
                <Link className="linkHeader" to="/FQ">
                    <span className="textHeader">Preguntas Frecuentes</span>
                </Link>
                {user ? (
    <>
        {user.tips === 'admin' ? (
            <Link className="linkHeader" to="/adminActive">
                <span className="userActive textHeader">
                    {user.name}
                    <img className="iconUser" src = {ImgUser} alt="imagen de usario logeado" />
                </span>
            </Link>
        ) : user.tips === 'employee' ? (
            <Link className="linkHeader" to="/employee">
                <span className="userActive textHeader">
                    {user.name}
                </span>
            </Link>
        ) : (
            <Link className="linkHeader" to={`/userActive/${userId}`}>
                <span className="userActive textHeader">
                    {user.name}
                    <img className="iconUser" src={ImgUser} alt="imagen de usuario logeado" />
                </span>
            </Link>
        )}
    </>
) : (
    <Link className="linkHeader" to="/login">
        <span className="textHeader">Usuario</span>
    </Link>
)}
            </div>
        </nav>
    );
};

export default Header;
