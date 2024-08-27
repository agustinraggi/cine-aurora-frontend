import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./addTheaterHourAdmin.css"

function AddTheaterHourAdmin() {
    const [listFilm, setListFilm] = useState([]);
    const [filteredFilm, setFilteredFilm] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [is3D, setIs3D] = useState(false);
    const [isSubtitled, setIsSubtitled] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

    // Obtener todas las películas
    const getFilm = () => {
        axios.get("http://localhost:3001/allFilm")
            .then((response) => {
                setListFilm(response.data);
                setFilteredFilm(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });
    };

    useEffect(() => {
        getFilm();
    }, []);

    useEffect(() => {
        filterFilm();
    }, [search, listFilm]);

    const filterFilm = () => {
        if (listFilm) {
            const filtered = listFilm.filter(film =>
                film.nameFilm.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredFilm(filtered);
        }
    };

    const handleSubmit = () => {
        if (!selectedFilm) {
            alert("Por favor, selecciona una película.");
            return;
        }

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const formattedTime = selectedTime.toTimeString().split(' ')[0].substring(0, 5);
        const theaterDetails = {
            theater: 1,
            nameFilm: selectedFilm.nameFilm,
            codeFilm: selectedFilm.codeFilm,
            date: formattedDate,
            time: formattedTime,
            type: is3D ? "3D" : "2D",
            subtitled: isSubtitled ? "Subtitulada" : "Doblada"
        };

        console.log("Detalles de la función:", theaterDetails);

        axios.post("http://localhost:3001/createMovieTheater", { 
            nameFilm: theaterDetails.nameFilm,
            codeFilm: theaterDetails.codeFilm,
            date: theaterDetails.date,
            time: theaterDetails.time,
            typeOfFunction: theaterDetails.type,
            language: theaterDetails.subtitled
        })
        .then(() =>{
            Swal.fire({
                title: "<strong>Funcion Registrada</strong>",
                html: `<i>La película <strong>${selectedFilm.nameFilm}</strong> fue registrada con éxito y ya esta disponible para su venta !</i>`,
                icon: "success",
                timer: 6000
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo registrar la funcion!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    return (
        <div className="container">
            <h1>Agregar Fecha y Hora</h1>
            <table className="table table-bordered" id="tableData">
                <thead>
                    <tr>
                        <th className="datesFilm">ID</th>
                        <th className="datesFilm">Código</th>
                        <th className="datesFilm">Nombre de la Película</th>
                        <th className="datesFilm">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFilm.map((film) => (
                        <tr key={film.idFilm}>
                            <td>{film.idFilm}</td>
                            <td>{film.codeFilm}</td>
                            <td>{film.nameFilm}</td>
                            <td>
                                <button
                                className="btn btn-success"
                                onClick={() => setSelectedFilm(film)}
                                >
                                Seleccionar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedFilm && (
                <div className="filmTheater">
                    <p>Película seleccionada: <strong>{selectedFilm.nameFilm}</strong></p> 
                </div>
            )}

            <div className="dateTheater">
                <label className="textTheater">Fecha:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="custom-datepicker"
                />
            </div>
            <div className="timeTheater">
                <label className="textTheater">Hora:</label>
                <DatePicker
                    selected={selectedTime}
                    onChange={(date) => setSelectedTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    className="custom-timepicker"
                />
            </div>

            <div className="typeFuncionTheater">
                <label className="textTheater">Tipo de función:</label>
                <select 
                    value={is3D} 
                    onChange={(e) => setIs3D(e.target.value === "true")}
                    style={{ marginLeft: '10px', padding: '5px' }}
                >
                    <option value="false">2D</option>
                    <option value="true">3D</option>
                </select>
            </div>
            <div className="languageTheater" style={{ marginBottom: '20px' }}>
                <label className="textTheater">Idioma:</label>
                <select 
                    value={isSubtitled} 
                    onChange={(e) => setIsSubtitled(e.target.value === "true")}
                    style={{ marginLeft: '10px', padding: '5px' }}
                >
                    <option value="false">Doblada</option>
                    <option value="true">Subtitulada</option>
                </select>
            </div>
            <div className="buttonContainer">
                <button 
                    onClick={handleSubmit} 
                    className="btn btn-success"
                    id="btnTheaters"
                    disabled={!selectedFilm}
                >
                    Agregar Función
                </button>
            </div>
        </div>
    );
}

export default AddTheaterHourAdmin;
