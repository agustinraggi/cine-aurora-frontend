import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
return useContext(AuthContext);
};

// Componente proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Efecto para escuchar los cambios en la autenticación
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); 
    });
    return () => unsubscribe(); 
}, []);

  // Función para registrar un nuevo usuario
const register = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
        setUser(response.user); 
        setRegistrationSuccess(true); 
    return response.user; 
    } catch (error) {
        console.error("Error al registrar:", error.message);
        throw error;
    }
};

  // Función para iniciar sesión
const login = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        setUser(response.user);
        return response.user; 
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        throw error;
    }
};

  // Función para iniciar sesión con Google
const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth, provider);
        setUser(response.user);
        return response.user; 
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error.message);
        throw error;
    }
};

  // Función para cerrar sesión
const logout = async () => {
    try {
        await signOut(auth);
        setUser(null);
    } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
        throw error;
    }
};

  // Proporcionar el contexto de autenticación y las funciones a los componentes hijos
return (
    <AuthContext.Provider
        value={{
        user,
        registrationSuccess,
        setRegistrationSuccess,
        register,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}