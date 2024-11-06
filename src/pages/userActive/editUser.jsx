import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; 
import { es } from 'date-fns/locale'; 
import "react-datepicker/dist/react-datepicker.css";
import "./editUser.css"

function EditUser() {
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";
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
                .get(`${URL_BACK}/allCustomer/${idUser}`)
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
                        Swal.fire({
                            icon: "error",
                            title: "Fecha no válida",
                            text: "La fecha de nacimiento del usuario no es válida.",
                        });
                        setSelectedDate(new Date());
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error al obtener los datos del usuario",
                        text: "Hubo un problema al cargar los datos del usuario. Por favor, intente nuevamente más tarde.",
                        footer: error.message,
                    });
                });
        }
    }, [idUser]);

    const validateForm = () => {
        if (!mail || !mail.includes("@")) {
            Swal.fire("Por favor complete un correo electrónico válido", "", "warning");
            return false;
        }
        if (!name) {
            Swal.fire("Por favor complete el nombre", "", "warning");
            return false;
        }
        if (!surname) {
            Swal.fire("Por favor complete el apellido", "", "warning");
            return false;
        }
        if (!selectedDate) {
            Swal.fire("Por favor seleccione una fecha de nacimiento", "", "warning");
            return false;
        }
        return true;
    };

    const update = () => {
        if (validateForm()) {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            axios
                .put(`${URL_BACK}/update`, {
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
                        html: `<i>El usuario <strong>${name}</strong> fue ACTUALIZADO con éxito!</i>`,
                        icon: "success",
                        timer: 2000,
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se pudo actualizar el usuario!",
                        footer: error.message.includes("Network Error")
                            ? "Intente más tarde"
                            : error.message,
                    });
                });
        }
    };

    return (
        <div>
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
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
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
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                            <Link to = {`/changePassword/${idUser}`}>
                                <button type="button" className="Btn btn-warning" id="btnChangePassword">Actualizar Contraseña</button>
                            </Link>
                            <div className="btnEditUser">
                                <Link to = {`/userActive`}>
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
            <div className="footerEditUser"></div>
        </div>
    );
}

export default EditUser;
