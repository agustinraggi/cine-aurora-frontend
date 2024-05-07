import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/" style={{textDecoration: "none"}}><span>Cine Aurora</span></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Cartelera</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Proximamente</span></Link>
            </div>
        </div>
    )
}

export default Header