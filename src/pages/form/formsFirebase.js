// import React, { useState, useEffect } from "react";
// import "./form.css";
// import { useAuth } from "../../context/authContext";

// function FormsFirebase() {
//   const auth = useAuth();

//   const [isRegistering, setIsRegistering] = useState(false);
//   const [emailRegister, setEmailRegister] = useState("");
//   const [passwordRegister, setPasswordRegister] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (passwordRegister !== confirmPassword) {
//       alert("Las contraseñas no coinciden");
//       return;
//     }
//     try {
//       await auth.register(emailRegister, passwordRegister, firstName, lastName);
//       setRegistrationSuccess(true);
//     } catch (error) {
//       console.error("Error al registrar:", error);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await auth.login(email, password);
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//     }
//   };

//   const handleGoogle = async (e) => {
//     e.preventDefault();
//     try {
//       await auth.loginWithGoogle();
//     } catch (error) {
//       console.error("Error al iniciar sesión con Google:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth.logout();
//     } catch (error) {
//       console.error("Error al cerrar sesión:", error);
//     }
//   };

//   useEffect(() => {
//     if (registrationSuccess) {
//       const timer = setTimeout(() => {
//         setRegistrationSuccess(false);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [registrationSuccess]);

//   return (
//     <div className="App">
//       {registrationSuccess && (
//         <div className="success-message">¡Registro exitoso!</div>
//       )}
//       {auth.currentUser && <h5 className="userActive">Bienvenido: {auth.currentUser.displayName}</h5>}
//       {!isRegistering && (
//         <form className="form">
//           <h3 className="title">Ingresar</h3>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             className="input"
//             type="email"
//             placeholder="Email"
//           />
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             className="input"
//             type="password"
//             placeholder="******"
//           />
//           <button onClick={(e) => handleLogin(e)} className="button">
//             Ingresar
//           </button>
//           <button onClick={(e) => handleGoogle(e)} className="button">
//             Google
//           </button>
//           <button onClick={() => setIsRegistering(true)} className="button">
//             Registrase
//           </button>
//         </form>
//       )}
//       {isRegistering && (
//         <form className="form">
//           <h3 className="title">Registrarse</h3>
//           <input
//             onChange={(e) => setEmailRegister(e.target.value)}
//             className="input"
//             type="email"
//             placeholder="Email"
//           />
//           <input
//             onChange={(e) => setFirstName(e.target.value)}
//             className="input"
//             type="text"
//             placeholder="Nombre"
//           />
//           <input
//             onChange={(e) => setLastName(e.target.value)}
//             className="input"
//             type="text"
//             placeholder="Apellido"
//           />
//           <input
//             onChange={(e) => setPasswordRegister(e.target.value)}
//             className="input"
//             type="password"
//             placeholder="Contraseña"
//           />
//           <input
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="input"
//             type="password"
//             placeholder="Confirmar Contraseña"
//           />
//           <button onClick={(e) => handleRegister(e)} className="button">
//             Registrarse
//           </button>
//           <button onClick={() => setIsRegistering(false)} className="button">
//             Volver
//           </button>
//         </form>
//       )}
//       <button onClick={handleLogout} className="button">Salir</button>
//     </div>
//   );
// }

// export default FormsFirebase;