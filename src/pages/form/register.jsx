import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./register.css";
import { Link } from "react-router-dom";
import axios from 'axios';

function User() {
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [password, setPassword] = useState("");

    const [listPeople, setListPeople] = useState([]);

    const add = () => {
        if (validateForm()) {
            const formattedDate = selectedDate.toISOString().split('T')[0];

            axios.post("http://localhost:3001/create", {
                correo: correo,
                nombre: nombre,
                dni: dni,
                fecha: formattedDate,
                password: password
            }).then(() => {
                alert("Usuario registrado!!!");
                getClientes();
                clearForm();
            }).catch((error) => {
                console.error("Hubo un error al registrar el usuario:", error);
            });
        }
    }

    const getClientes = () => {
        axios.get("http://localhost:3001/cliente").then((response) => {
            setListPeople(response.data);
            setFilteredPeople(response.data);
        }).catch((error) => {
            console.error("Error al obtener datos:", error);
        });
    }

    useEffect(() => {
        getClientes();
    }, []);

    useEffect(() => {
        filterPeople();
    }, [search, listPeople]);

    const validateForm = () => {
        if (!correo || !correo.includes('@')) {
            alert('Por favor complete un correo electrónico válido');
            return false;
        }
        if (!nombre) {
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
        setCorreo("");
        setNombre("");
        setDni("");
        setPassword("");
        setSelectedDate(new Date());
    }

    const filterPeople = () => {
        const filtered = listPeople.filter(person =>
            person.nombre.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPeople(filtered);
    }

    const editData = (index) => {
        const person = filteredPeople[index];
        setCorreo(person.correo);
        setNombre(person.nombre);
        setDni(person.dni);
        setSelectedDate(new Date(person.fecha));
        setPassword(person.password);
        setEditIndex(index);
    }

    const deleteData = (index) => {
        const person = filteredPeople[index];
    }

    return (
        <div className="container">
            <div className="container mb-5">
                <div className="row">
                    <form>
                        <h1>REGISTRAR USUARIO</h1>
                        <div className="login-form">
                            <label className="form-label" id="text">Correo Electrónico</label>
                            <input onChange={(event) => setCorreo(event.target.value)} value={correo} type="email" className="form-control" id="inputEmail" placeholder="Ingrese su correo electrónico" />
                        </div>
                        <div className="login-form">
                            <label className="form-label" id="text">Nombre Completo</label>
                            <input onChange={(event) => setNombre(event.target.value)} value={nombre} type="text" className="form-control" id="inputName" placeholder="Ingrese su nombre completo" />
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
                        <button type="button" className="Btn btn btn-primary" id="btnAdd" onClick={add}>Enviar</button>
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
                    {filteredPeople.map((person, index) => (
                        <tr key={person.id}>
                            <td>{person.correo}</td>
                            <td>{person.nombre}</td>
                            <td>{person.dni}</td>
                            <td>{new Date(person.fecha).toLocaleDateString()}</td>
                            <td>{person.edad}</td>
                            <td>{person.password}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => editData(index)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteData(index)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default User;
