import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./addTheaterHourAdmin.css"
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; 
import { es } from 'date-fns/locale'; 

function AgregarFuncionCine() {
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";
    const [listaPeliculas, setListaPeliculas] = useState([]);
    const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [horaSeleccionada, setHoraSeleccionada] = useState(new Date());
    const [es3D, setEs3D] = useState(false);
    const [esSubtitulada, setEsSubtitulada] = useState(false);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [precio, setPrecio] = useState([])

    // Obtener todas las películas
    const obtenerPeliculas = () => {
        axios.get(`${URL_BACK}/allFilm`)
            .then((response) => {
                setListaPeliculas(response.data);
                setPeliculasFiltradas(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });
    };

    useEffect(() => {
        obtenerPeliculas();
    }, []);

    useEffect(() => {
        filtrarPeliculas();
    }, [busqueda, listaPeliculas]);

    const filtrarPeliculas = () => {
        if (listaPeliculas) {
            const filtradas = listaPeliculas.filter(pelicula =>
                pelicula.nameFilm.toLowerCase().includes(busqueda.toLowerCase())
            );
            setPeliculasFiltradas(filtradas);
        }
    };

    const manejarEnvio = () => {
        if (!peliculaSeleccionada) {
            alert("Por favor, selecciona una película.");
            return;
        }

        const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];
        const horaFormateada = horaSeleccionada.toTimeString().split(' ')[0].substring(0, 5);
        const detallesFuncion = {
            sala: 1,
            nombrePelicula: peliculaSeleccionada.nameFilm,
            codigoPelicula: peliculaSeleccionada.codeFilm,
            fecha: fechaFormateada,
            hora: horaFormateada,
            tipo: es3D ? "3D" : "2D",
            subtitulada: esSubtitulada ? "Subtitulada" : "Doblada",
            precio: precio
        };

        console.log("Detalles de la función:", detallesFuncion);

        axios.post(`${URL_BACK}/createMovieTheater`, { 
            nameFilm: detallesFuncion.nombrePelicula,
            codeFilm: detallesFuncion.codigoPelicula,
            date: detallesFuncion.fecha,
            time: detallesFuncion.hora,
            typeOfFunction: detallesFuncion.tipo,
            language: detallesFuncion.subtitulada,
            price: detallesFuncion.precio
        })
        .then(() => {
            Swal.fire({
                title: "<strong>Función Registrada</strong>",
                html: `<i>La película <strong>${peliculaSeleccionada.nameFilm}</strong> fue registrada con éxito y ya está disponible para su venta!</i>`,
                icon: "success",
                timer: 6000
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡No se pudo registrar la función!",
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
                    {peliculasFiltradas.map((pelicula) => (
                        <tr key={pelicula.idFilm}>
                            <td>{pelicula.idFilm}</td>
                            <td>{pelicula.codeFilm}</td>
                            <td className="nameFilmTheaterAdd">{pelicula.nameFilm}</td>
                            <td>
                                <button
                                className="btn btn-success"
                                onClick={() => setPeliculaSeleccionada(pelicula)}
                                >
                                Seleccionar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {peliculaSeleccionada && (
                <div className="filmTheater">
                    <p>Película seleccionada: <strong>{peliculaSeleccionada.nameFilm}</strong></p> 
                </div>
            )}
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                <div className="grupFech">
                    <div className="dateTheater">
                        <label className="textTheater fechTheater" >Fecha</label>
                        <DatePicker
                            value ={fechaSeleccionada}
                            onChange={(date) => setFechaSeleccionada(date)}
                            format="dd/MM/yyyy"
                            className="custom-datepicker"
                        />
                    </div>
                    <div className="timeTheater">
                        <label className="textTheater">Hora</label>
                        <TimePicker
                            value={horaSeleccionada}
                            onChange={(date) => setHoraSeleccionada(date)}
                            ampm={false}
                            minutesStep={15}
                            format="HH:mm"
                            className="custom-timepicker"
                        />
                    </div>
                </div>
            </MuiPickersUtilsProvider>
            <div className="grupFech2">
                <div className="typeFuncionTheater">
                    <label className="textTheater">Tipo de función</label>
                    <select 
                        value={es3D} 
                        onChange={(e) => setEs3D(e.target.value === "true")}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    >
                        <option value="false">2D</option>
                        <option value="true">3D</option>
                    </select>
                </div>
                <div className="priceFuncionTheater">
                    <label className="textTheater">Precio de la función</label>
                    <input onChange={(event) => setPrecio(event.target.value)} value={precio} type="number" className="form-control" id="inputPrice" placeholder="Ingrese el precio de la entrada" />
                </div>
                <div className="languageTheater" style={{ marginBottom: '20px' }}>
                    <label className="textTheater">Idioma</label>
                    <select 
                        value={esSubtitulada} 
                        onChange={(e) => setEsSubtitulada(e.target.value === "true")}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    >
                        <option value="false">Doblada</option>
                        <option value="true">Subtitulada</option>
                    </select>
                </div>
            </div>
            <div className="buttonContainer">
                <button 
                    onClick={manejarEnvio} 
                    className="btn btn-success"
                    id="btnTheaters"
                    disabled={!peliculaSeleccionada}
                >
                    Agregar Función
                </button>
            </div>
        </div>
    );
}

export default AgregarFuncionCine;
