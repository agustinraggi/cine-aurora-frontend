import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { DatePicker } from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";
import "./editUser.css"

function EditUser() {
    const { idUser } = useParams();
    const [mail, setMail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dni, setDni] = useState("");
    const [password, setPassword] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (idUser) {
            axios
                .get(`http://localhost:3001/customer/${idUser}`)
                .then((response) => {
                    const user = response.data;
                    setMail(user.mail || "");
                    setName(user.name || "");
                    setSurname(user.surname || "");
                    setDni(user.dni || "");
                    setPassword("");
                    const userDate = new Date(user.date);
                    if (!isNaN(userDate)) {
                        setSelectedDate(userDate);
                    } else {
                        console.error("Invalid date value:", user.date);
                        setSelectedDate(new Date());
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [idUser]);

    const validateForm = () => {
        if (!mail || !mail.includes("@")) {
            alert("Por favor complete un correo electrónico válido");
            return false;
        }
        if (!name) {
            alert("Por favor complete el nombre");
            return false;
        }
        if (!surname) {
            alert("Por favor complete el apellido");
            return false;
        }
        if (!selectedDate) {
            alert("Por favor seleccione una fecha de nacimiento");
            return false;
        }
        if (!password) {
            alert("Por favor complete la contraseña");
            return false;
        }
        return true;
    };

    const update = () => {
        if (validateForm()) {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            axios
                .put("http://localhost:3001/update", {
                    idUser,
                    mail,
                    name,
                    surname,
                    dni,
                    date: formattedDate,
                    password,
                })
                .then(() => {
                    Swal.fire({
                        title: "<strong>Usuario Actualizado</strong>",
                        html:
                            "<i>El usuario <strong>" +
                            name +
                            "</strong> fue ACTUALIZADO con éxito!</i>",
                        icon: "success",
                        timer: 2000,
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se pudo actualizar el usuario!",
                        footer:
                            JSON.parse(JSON.stringify(error)).message === "Network Error"
                                ? "Intente más tarde"
                                : JSON.parse(JSON.stringify(error)).message,
                    });
                });
        }
    };

    return (
        <div className="container">
            <div className="container mb-5">
                <div className="row">
                    <form className="formUserRegister">
                        <h1>Editar Usuario</h1>
                        <div className="registerForm">
                            <label className="form-label" id="text">
                                Correo Electrónico
                            </label>
                            <input
                                onChange={(event) => setMail(event.target.value)}
                                value={mail}
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Ingrese su correo electrónico"
                            />
                        </div>
                        <div className="registerForm">
                            <label className="form-label" id="text">
                                Nombre
                            </label>
                            <input
                                onChange={(event) => setName(event.target.value)}
                                value={name}
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="Ingrese su nombre"
                            />
                        </div>
                        <div className="registerForm">
                            <label className="form-label" id="text">
                                Apellido
                            </label>
                            <input
                                onChange={(event) => setSurname(event.target.value)}
                                value={surname}
                                type="text"
                                className="form-control"
                                id="inputSurname"
                                placeholder="Ingrese su apellido"
                            />
                        </div>
                        <div className="registerForm">
                            <label className="form-label" id="text">
                                DNI
                            </label>
                            <input
                                onChange={(event) => setDni(event.target.value)}
                                value={dni}
                                type="number"
                                className="form-control"
                                id="inputDni"
                                placeholder="Ingrese su número D.N.I"
                            />
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
                        {/* <div className="registerForm">
                            <label className="form-label" id="text">
                                Contraseña
                            </label>
                            <input
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Ingrese su contraseña"
                            />
                        </div> */}
                        <div className="btnEditUser">
                            <Link to = "/userActive">
                                <button type="button" className="Btn btn-primary" id="btnUpdate" onClick={update}>Actualizar</button>
                            </Link>
                            <Link to = "/userActive">
                                <button type="button" className="Btn btn-primary btnCancel" id="btnCancel">Cancelar</button>
                            </Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
