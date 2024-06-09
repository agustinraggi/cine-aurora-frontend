import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ email, password });
    }

    return (
        <div className="login-form">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Ingrese su correo electrónico"
                        required
                        autoComplete="current-email"
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
    );
}

export default Login;
