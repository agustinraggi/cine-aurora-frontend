import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"


const Header = () => {
    // const auth = useAuth();
    // const displayName = auth.user?.displayName;

    return (
            <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
        <Link to="/" style={{textDecoration: "none"}} className="navbar-brand"><span>Cine Aurora</span></Link>
          <button
            class="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul id="barra__tareas" class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <Link to="/movies/popular" style={{textDecoration: "none"}} className="navbar-brand"><span>Cartelera</span></Link>
              </li>
              <li class="nav-item">
              <Link to="/movies/upcoming" style={{textDecoration: "none"}} className="navbar-brand"><span>Proximamente</span></Link>
              </li>
              <li class="nav-item">
              <Link to="/crudUser" style={{textDecoration: "none"}} className="navbar-brand"><span>Usuario</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Header
