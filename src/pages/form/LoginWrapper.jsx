import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";

const LoginWrapper = ({ setUser }) => {
    const navigate = useNavigate();

    const onLogin = async ({ email, password }) => {
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mail: email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                navigate('/');
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error al iniciar sesión");
        }
    };

    return <Login onLogin={onLogin} />;
};

export default LoginWrapper;
