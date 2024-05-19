import React, { useEffect, useState } from "react";
import "./form.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function User() {
    const [listPeople, setListPeople] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [todayDate] = useState(new Date());

    useEffect(() => {
        ReadData();
    }, []);

    function calculateAge(birthday) {
        const ageDate = new Date(Date.now() - birthday.getTime());
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function validateForm() {
        let email = document.getElementById('inputEmail').value;
        let name = document.getElementById('inputName').value;
        let dni = document.getElementById('inputDni').value;

        if (email === "") {
            alert('Por favor complete el correo electrónico');
            return false;
        } else if (!email.includes('@')) {
            alert('Correo electrónico inválido');
            return false;
        }
        if (name === "") {
            alert('Por favor complete el nombre');
            return false;
        }
        if (dni === "" || (dni.length !== 7 && dni.length !== 8)) {
            alert('Por favor escribe un DNI válido (de 7 u 8 caracteres)');
            return false;
        }
        if (!selectedDate) {
            alert('Por favor seleccione una fecha de nacimiento');
            return false;
        }
        return true;
    }

    function AddData() {
        if (validateForm()) {
            let email = document.getElementById('inputEmail').value;
            let name = document.getElementById('inputName').value;
            let dni = document.getElementById('inputDni').value;
            let fecha = selectedDate.toISOString();
            let age = calculateAge(selectedDate);

            let newListPeople;

            if (localStorage.getItem("listPeople") === null) {
                newListPeople = [];
            } else {
                newListPeople = JSON.parse(localStorage.getItem('listPeople'));
            }

            newListPeople.push({
                email: email,
                name: name,
                dni: dni,
                fecha: fecha,
                age: age
            });

            localStorage.setItem("listPeople", JSON.stringify(newListPeople));

            ReadData();

            document.getElementById('inputEmail').value = "";
            document.getElementById('inputName').value = "";
            document.getElementById('inputDni').value = "";
            setSelectedDate(null);
        }
    }

    function ReadData() {
        let newListPeople;

        if (localStorage.getItem('listPeople') === null) {
            newListPeople = [];
        } else {
            newListPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        setListPeople(newListPeople);
    }

    function editData(index) {
        document.getElementById('btnAdd').style.display = 'none';
        document.getElementById('btnUpdate').style.display = 'block';
        let newListPeople;

        if (localStorage.getItem('listPeople') === null) {
            newListPeople = [];
        } else {
            newListPeople = JSON.parse(localStorage.getItem('listPeople'));
        }
        document.getElementById('inputEmail').value = newListPeople[index].email;
        document.getElementById('inputName').value = newListPeople[index].name;
        document.getElementById('inputDni').value = newListPeople[index].dni;
        setSelectedDate(new Date(newListPeople[index].fecha));

        document.querySelector('#btnUpdate').onclick = function () {
            if (validateForm()) {
                newListPeople[index].email = document.getElementById('inputEmail').value;
                newListPeople[index].name = document.getElementById('inputName').value;
                newListPeople[index].dni = document.getElementById('inputDni').value;
                newListPeople[index].fecha = selectedDate.toISOString();
                newListPeople[index].age = calculateAge(selectedDate);

                localStorage.setItem("listPeople", JSON.stringify(newListPeople));
                ReadData();
                document.getElementById('inputEmail').value = "";
                document.getElementById('inputName').value = "";
                document.getElementById('inputDni').value = "";
                setSelectedDate(null);

                document.getElementById('btnAdd').style.display = 'block';
                document.getElementById('btnUpdate').style.display = 'none';
            }
        }
    }

    function deleteData(index) {
        let newListPeople;

        if (localStorage.getItem('listPeople') === null) {
            newListPeople = [];
        } else {
            newListPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        newListPeople.splice(index, 1);
        localStorage.setItem("listPeople", JSON.stringify(newListPeople));

        ReadData();
    }
    return (
        <div className="container">
            <div className="container mb-5">
                <div className="row">
                    <form>
                        <div className="login-form">
                            <label className="form-label" id="text">Correo Electrónico</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Ingrese su correo electrónico" />
                        </div>
                        <div className="login-form">
                            <label className="form-label" id="text">Nombre Completo</label>
                            <input type="text" className="form-control" id="inputName" placeholder="Ingrese su nombre completo" />
                        </div>
                        <div className="login-form">
                            <label className="form-label" id="text">DNI</label>
                            <input type="number" className="form-control" id="inputDni" placeholder="Ingrese su número D.N.I" />
                        </div>
                        <div className="login-form">
                            <label className="form-label" id="text">Fecha de Nacimiento</label>
                            <div>
                                <DatePicker 
                                    selected={selectedDate} 
                                    onChange={date => setSelectedDate(date)} 
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={50}
                                />
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" id="btnAdd" onClick={AddData}>Enviar</button>
                        <button type="button" className="btn btn-primary" id="btnUpdate" style={{ display: 'none' }}>Actualizar</button>
                    </form>
                </div>
            </div>
            <hr />
            <table className="table table-bordered" id="tableData">
                <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Nombre Completo</th>
                        <th>DNI</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listPeople.map((element, index) => (
                        <tr key={index}>
                            <td>{element.email}</td>
                            <td>{element.name}</td>
                            <td>{element.dni}</td>
                            <td>{element.fecha}</td>
                            <td>{element.age}</td>
                            <td>
                                <button
                                    onClick={() => deleteData(index)}
                                    className="btnDelete"
                                >
                                    Eliminar datos
                                </button>{" "}
                                <button
                                    onClick={() => editData(index)}
                                    className="btnEdit"
                                >
                                    Editar datos
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default User;
