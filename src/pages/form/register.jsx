import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./register.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { DatePicker } from "@material-ui/pickers";

function User() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mail, setMail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dni, setDni] = useState("");
    const [password, setPassword] = useState("");
    const [tips, setTips] = useState("client");

    // VALIDACIONES DE FORMULARIO
    const validateForm = () => {
        if (!mail || !mail.includes('@')) {
            alert('Por favor complete un correo electrónico válido');
            return false;
        }
        if (!name) {
            alert('Por favor complete el nombre');
            return false;
        }
        if (!surname) {
            alert('Por favor complete el apellido');
            return false;
        }
        if (!dni || (dni.length !== 7 && dni.length !== 8)) {
            alert('Por favor escribe un DNI válido (de 7 u 8 caracteres)');
            return false;
        }
        if (!selectedDate) {
            alert('Por favor seleccione una fecha de nacimiento');
            return false;
        }
        if (!password) {
            alert('Por favor complete la contraseña');
            return false;
        }
        return true;
    };

    // REGISTRAR USUARIO
    const add = () => {
        if (validateForm()) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            axios.post("http://localhost:3001/create", {
                mail,
                name,
                surname,
                dni,
                date: formattedDate,
                password,
                tips
            })
            .then((response) => {
                if (response.status === 200) { 
                    Swal.fire({
                        title: "<strong>Usuario Registrado</strong>",
                        html: "<i>El usuario <strong>" + name + "</strong> fue REGISTRADO con éxito!</i>",
                        icon: "success",
                        timer: 2000
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo registrar el usuario!",
                    footer: error.response ? error.response.data.message : "Intente más tarde"
                });
            });
        }
    };

    return (
        <div className="container">
            <div className="container mb-5">
                <div className="row">
                    <form className="formUserRegister">
                        <h1>REGISTRAR USUARIO</h1>
                        <div className="registerForm">
                            <label className="form-label" id="text">Correo Electrónico</label>
                            <input onChange={(event) => setMail(event.target.value)} value={mail} type="email" className="form-control" id="inputEmail" placeholder="Ingrese su correo electrónico" />
                        </div>
                        <div className="registerForm">
                            <label className="form-label" id="text">Nombre</label>
                            <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" id="inputName" placeholder="Ingrese su nombre" />
                        </div>
                        <div className="registerForm">
                            <label className="form-label" id="text">Apellido</label>
                            <input onChange={(event) => setSurname(event.target.value)} value={surname} type="text" className="form-control" id="inputSurname" placeholder="Ingrese su apellido" />
                        </div>
                        <div className="registerForm">
                            <label className="form-label" id="text">DNI</label>
                            <input onChange={(event) => setDni(event.target.value)} value={dni} type="number" className="form-control" id="inputDni" placeholder="Ingrese su número D.N.I" />
                        </div>
                        <div className="registerFormFech">
                            <div className="grupRegister">
                                <label className="formLabelRegister" id="inputFecha">Fecha de Nacimiento</label>
                                <DatePicker
                                    value={selectedDate}
                                    selected={selectedDate}
                                    onChange={date => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date("1900-01-01")}
                                    maxDate={new Date()}
                                    className="custom-datepicker"
                                    showYearDropdown
                                    yearDropdownItemNumber={10}
                                    scrollableYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    dropdownMode="select"
                                />
                            </div>
                        </div>
                        <div className="registerForm">
                            <label className="form-label" id="text">Contraseña</label>
                            <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" id="inputPassword" placeholder="*****" />
                        </div>
                        <Link to="/login">
                            <button type="button" className="Btn btn btn-primary" id="btnAdd" onClick={add}>Enviar</button>
                        </Link>
                        <p>Ingresar aquí <Link to="/login">aquí</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default User;
