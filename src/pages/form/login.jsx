import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";


function Login({ onLogin }) {
    const [mailOrDni, setMailOrDni] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                                className="formControl"
                                value={mailOrDni}
                                onChange={e => setMailOrDni(e.target.value)} 
                                placeholder="Ingre correo electrónico o DNI"
                                required
                                autoComplete="on"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"} 
                                className="formControl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                required
                                autoComplete="current-password"
                            />
                            <span 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="passwordToggleLogin"
                                role="button"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? "👁️" : "🔒"}
                            </span>
                        </div>
                        <p>¿Olvidaste tu contraseña? <Link to="/recoverPassword">Ingresa aquí</Link>.</p>
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