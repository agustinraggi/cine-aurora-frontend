import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./register.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'


function User() {
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [id, setId] = useState(null);

    const [mail, setMail] = useState("");
    const [name, setName] = useState("");
    const [dni, setDni] = useState("");
    const [password, setPassword] = useState("");

    const [listPeople, setListPeople] = useState([]);

    // REGISTRAR USUARIO
    const add = () => {
    if (validateForm()) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        axios.post("http://localhost:3001/create", {
            mail,
            name,
            dni,
            date: formattedDate,
            password
        })
        .then(() => {
            getCustomer();
            clearForm();
            Swal.fire({
                title: "<strong>Usuario Registrado</strong>",
                html: "<i>El usuario <strong>" + name + "</strong> fue REGISTRADO con éxito!</i>",
                icon: "success",
                timer: 2000
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo registrar el usuario!",
                footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
            });
        });
    }
}


// UPDATE
const update = () => {
    if (validateForm()) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        axios.put("http://localhost:3001/update", {
            id,
            mail,
            name,
            dni,
            date: formattedDate,
            password
        })
        .then(() => {
            Swal.fire({
                title: "<strong>Usuario Actualizado</strong>",
                html: "<i>El usuario <strong>" + name + "</strong> fue ACTUALIZADO con éxito!</i>",
                icon: "success",
                timer: 2000
            });
            getCustomer();
            clearForm();
            setEditIndex(null);
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo registrar el usuario!",
                footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
            });
        });
    }
}


// DELETE
const deleteData = (id, name) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: `No podrás revertir esta acción. ¿Estás seguro de que deseas eliminar a ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                Swal.fire({
                    title: "¡Eliminado!",
                    text: `El usuario ${name} ha sido eliminado.`,
                    icon: "success",
                    timer: 2000
                });
                getCustomer();
                clearForm();
                setEditIndex(null);
            })
            .catch((error) => {
                console.error("Hubo un error al eliminar el usuario:", error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "Tu archivo está a salvo :)",
                icon: "error",
                timer: 2000
            });
        }
    })
    .catch((error) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo Eliminar Usuario!",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error)).message
        });
    });
}




    // MOSTRAR DATOS
    const getCustomer = () => {
        axios.get("http://localhost:3001/customer").then((response) => {
            setListPeople(response.data);
            setFilteredPeople(response.data);
        }).catch((error) => {
            console.error("Error al obtener datos:", error);
        });
    }

    useEffect(() => {
        getCustomer();
    }, []);

    useEffect(() => {
        filterPeople();
    }, [search, listPeople]);

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
    }

    const clearForm = () => {
        setId(null);
        setMail("");
        setName("");
        setDni("");
        setPassword("");
        setSelectedDate(new Date());
        setEditIndex(null);
    }

    const filterPeople = () => {
        if (listPeople) {
            const filtered = listPeople.filter(client =>
                client.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPeople(filtered);
        }
    }

    // EDIT
    const editData = (val) => {
        setEditIndex(true);
        setId(val.id);
        setMail(val.mail);
        setName(val.name);
        setDni(val.dni);
        setSelectedDate(new Date(val.date));
        setPassword(val.password);
    }


    return (
        <div className="container">
            <div className="container mb-5">
                <div className="row">
                    <form>
                        <h1>REGISTRAR USUARIO</h1>
                        <div className="login-form">
                            <label className="form-label" id="text">Correo Electrónico</label>
                            <input onChange={(event) => setMail(event.target.value)} value={mail} type="email" className="form-control" id="inputEmail" placeholder="Ingrese su correo electrónico" />
                        </div>
                        <div className="login-form">
                            <label className="form-label" id="text">Nombre Completo</label>
                            <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" id="inputName" placeholder="Ingrese su nombre completo" />
                        </div>
                        <div className="login-form">
                            <label className="form-label" id="text">DNI</label>
                            <input onChange={(event) => setDni(event.target.value)} value={dni} type="number" className="form-control" id="inputDni" placeholder="Ingrese su número D.N.I" />
                        </div>
                        <div className="login-form">
                            <div className="grupo">
                                <label className="form-label" id="inputFecha">Fecha de Nacimiento</label>
                                <DatePicker
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
                        <div className="login-form">
                            <label className="form-label" id="text">Contraseña</label>
                            <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" id="inputPassword" placeholder="*****" />
                        </div>
                        {
                            editIndex !== null ?
                                <div>
                                    <button type="button" className="Btn btn-primary" id="btnUpdate" onClick={update}>Actualizar</button>
                                    <button type="button" className="Btn btn-primary" id="btnCancel" onClick={clearForm}>Cancelar</button>
                                </div>
                                :
                                <button type="button" className="Btn btn btn-primary" id="btnAdd" onClick={add}>Enviar</button>
                        }
                        <p>Ingresar aquí <Link to="/login">aquí</Link></p>
                    </form>
                </div>
            </div>
            <div className="btnSearch">
                <input
                    type="text"
                    className="form-control-search"
                    placeholder="Buscar por nombre"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <hr />
            <table className="table table-bordered" id="tableData">
                <thead>
                    <tr>
                        <th className="datesPeople">Correo</th>
                        <th className="datesPeople">Nombre Completo</th>
                        <th className="datesPeople">DNI</th>
                        <th className="datesPeople">Fecha de Nacimiento</th>
                        <th className="datesPeople">Edad</th>
                        <th className="datesPeople">Contraseña</th>
                        <th className="datesPeople">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPeople.map((client, index) => (
                        <tr key={client.id}>
                            <td>{client.mail}</td>
                            <td>{client.name}</td>
                            <td>{client.dni}</td>
                            <td>{new Date(client.date).toLocaleDateString()}</td>
                            <td>{client.age}</td>
                            <td>{client.password}</td>
                            <td>
                                <button className="btn btn-warning"
                                    onClick={() => {
                                        editData(client);
                                    }}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteData(client.id, client.name)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default User;
