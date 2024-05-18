import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"

const Header = () => {
    const auth = useAuth();
    const displayName = auth.user?.displayName;

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/" style={{textDecoration: "none"}}><span>Cine Aurora</span></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Cartelera</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Proximamente</span></Link>
                <Link to="/formsFirebase" style={{textDecoration: "none"}}><span>Usuario</span></Link>
                <span id="userActive">{displayName}</span>
            </div>
        </div>
    )
}

export default Header
