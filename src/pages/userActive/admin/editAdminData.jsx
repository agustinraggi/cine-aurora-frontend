import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./editData.css";

function EditAdminData() {
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [mail, setMail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dni, setDni] = useState("");
    const [tips, setTips] = useState("cliente");
    const [listPeople, setListPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
        if (!selectedDate) {
            alert('Por favor seleccione una fecha de nacimiento');
            return false;
        }
        return true;
    }

    // UPDATE
    const update = () => {
        if (validateForm()) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            axios.put("http://localhost:3001/update", {
                idUser,
                mail,
                name,
                surname,
                dni,
                date: formattedDate,
                tips
            })
            .then(() => {
                Swal.fire({
                    title: "<strong>Usuario Actualizado</strong>",
                    html: "<i>El usuario <strong>" + name + "</strong> fue ACTUALIZADO con éxito!</i>",
                    icon: "success",
                    timer: 2000
                });
                fetchCustomers();
                clearForm();
                setEditIndex(null);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo registrar el usuario!",
                    footer: error.response?.data?.error || "Intente más tarde"
                });
            });
        }
    }

    // DELETE
    const deleteData = (idUser, name) => {
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
                axios.delete(`http://localhost:3001/delete/${idUser}`)
                    .then(() => {
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: `El usuario ${name} ha sido eliminado.`,
                            icon: "success",
                            timer: 2000
                        });
                        fetchCustomers();
                        clearForm();
                        setEditIndex(null);
                    })
                    .catch((error) => {
                        const errorMessage = error.response?.data?.error || "No se pudo eliminar el usuario ya que tiene una entrada comprada.";
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: errorMessage,
                            footer: errorMessage
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelado",
                    text: "Tu archivo está a salvo :)",
                    icon: "error",
                    timer: 2000
                });
            }
        });
    }

    // FETCH CUSTOMERS
    const fetchCustomers = () => {
        axios.get(`http://localhost:3001/allCustomer?page=${page}&limit=5`)
        .then(response => {
            setListPeople(response.data.users);
            setFilteredPeople(response.data.users);
            setTotalPages(response.data.totalPages);
        })
        .catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        fetchCustomers();
    }, [page]);

    useEffect(() => {
        filterPeople();
    }, [search, listPeople]);

    const clearForm = () => {
        setIdUser(null);
        setMail("");
        setName("");
        setSurname("");
        setDni("");
        setTips("cliente");
        setSelectedDate(new Date());
        setEditIndex(null);
    }

    const filterPeople = () => {
        if (listPeople) {
            const filtered = listPeople.filter(client =>
                client.surname.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPeople(filtered);
        }
    }

    // EDIT
    const editData = (val) => {
        setEditIndex(true);
        setIdUser(val.idUser);
        setMail(val.mail);
        setName(val.name);
        setSurname(val.surname);
        setDni(val.dni);
        setSelectedDate(new Date(val.date));
        setTips(val.tips);
    }

    return (
        <div className="container">
            <div className="container mb-5">
                <div className="row">
                    <form className="formUserRegister">
                        <h1>PANEL DE ADMIN</h1>
                        <div className="registerForm">
                            <label className="form-label" id="text">Correo Electrónico</label>
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
                            <label className="form-label" id="text">Nombre</label>
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
                            <label className="form-label" id="text">Apellido</label>
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
                            <label className="form-label" id="text">DNI</label>
                            <input 
                                onChange={(event) => setDni(event.target.value)} 
                                value={dni} 
                                type="number" 
                                className="form-control" 
                                id="inputDni" 
                                placeholder="Ingrese su número D.N.I" 
                            />
                        </div>
                        <div className="registerForm">
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
                        <div className="registerForm">
                            <label className="form-label" id="text">Tipo de usuario</label>
                            <select 
                                onChange={(event) => setTips(event.target.value)} 
                                value={tips} 
                                className="form-control" 
                                id="inputTips"
                            >
                                <option value="client">Cliente</option>
                                <option value="employee">Empleado</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <div>
                            <button 
                                type="button" 
                                className="Btn btn-primary" 
                                id="btnUpdate" 
                                onClick={update}
                            >
                                Actualizar
                            </button>
                            <button 
                                type="button" 
                                className="Btn btn-primary" 
                                id="btnCancel" 
                                onClick={clearForm}
                            >
                                Cancelar
                            </button>
                        </div> 
                    </form>
                </div>
            </div>
            <div className="btnSearch">
                <input
                    type="text"
                    className="form-control-search"
                    placeholder="Buscar por apellido"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <table className="table table-bordered" id="tableData">
                <thead>
                    <tr>
                        <th className="datesPeople"  id="datesPeoplePhone">Correo</th>
                        <th className="datesPeople" id="datesPeoplePhone">Nombre</th>
                        <th className="datesPeople">Apellido</th>
                        <th className="datesPeople">DNI</th>
                        <th className="datesPeople"  id="datesPeoplePhone">Fecha de Nacimiento</th>
                        <th className="datesPeople"  id="datesPeoplePhone">Tipo</th>
                        <th className="datesPeople">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPeople.length > 0 ? (
                        filteredPeople.map((person, index) => (
                            <tr key={index}>
                                <td  id="datesPeoplePhone">{person.mail}</td>
                                <td  id="datesPeoplePhone">{person.name}</td>
                                <td>{person.surname}</td>
                                <td>{person.dni}</td>
                                <td  id="datesPeoplePhone">{new Date(person.date).toLocaleDateString()}</td>
                                <td  id="datesPeoplePhone">{person.tips}</td>
                                <td>
                                <button className="btn btn-warning"
                                    onClick={() => {
                                        editData(person);
                                    }}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteData(person.idUser, person.name)}>Eliminar</button>
                            </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay datos para mostrar</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button 
                    className="btn btn-primary" 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button 
                    className="btn btn-primary" 
                    onClick={() => setPage(page + 1)} 
                    disabled={page === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default EditAdminData;
