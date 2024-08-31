import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";


function Login({ onLogin }) {
    const [mailOrDni, setMailOrDni] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ mailOrDni, password }); 
    }

    return (
        <div className="container">
            <div className="container mb-5">
                <div className="row">
                    <form onSubmit={handleSubmit} className="formLogin">
                        <h1>Iniciar Sesión</h1>
                        <div className="form-group">
                            <label className="form-label">Correo Electrónico o D.N.I</label>
                            <input
                                type="text"
                                className="form-control"
                                value={mailOrDni}
                                onChange={e => setMailOrDni(e.target.value)} 
                                placeholder="Ingre correo electrónico o DNI"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="Btn btn btn-primary"
                        >
                            Iniciar Sesión
                        </button>
                        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>.</p>
                    </form>
                </div>
            </div>
            <div className="footerRegister"></div>
        </div>
    );
}

export default Login;