import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ticket.css";

function Ticket() {
    const API_KEY = '6a5fa2aa71d234b5f1b196ce04746bc5';
    const API_URL = 'https://api.themoviedb.org/3';

    const [currentMovieDetail, setCurrentMovieDetail] = useState({});
    const { id } = useParams();

    const fetchMovie = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    language: "es-ES"
                }
            });
            setCurrentMovieDetail(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMovie();
        }
    }, [id]);

    // Seleccion de asientos
    const [selectedSeats, setSelectedSeats] = useState([]);
    const rows = 14;
    const seatsPerRow = 21;

    // Función para actualizar asientos seleccionados
    const updateSelectedSeats = (index) => {
        setSelectedSeats((prev) =>
            prev.includes(index) ? prev.filter((seat) => seat !== index) : [...prev, index]
        );
    };

    // Función para obtener la etiqueta del asiento
    const getSeatLabel = (index) => {
        const row = String.fromCharCode(65 + Math.floor(index / seatsPerRow));
        const seatNumber = (index % seatsPerRow) + 1;
        return `${row}${seatNumber}`;
    };

    // Función para cargar asientos seleccionados desde localStorage
    const populateUI = () => {
        const savedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
        setSelectedSeats(savedSeats);
    };

    // useEffect para cargar asientos seleccionados al montar el componente
    useEffect(() => {
        populateUI();
    }, []);

    // useEffect para guardar asientos seleccionados en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    }, [selectedSeats]);

    return (
        <div>
            <div className="ticket">
                <div className="ticket__intro">
                    <img className="ticket__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`} alt="Backdrop" />
                </div>
            </div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            <strong>Seleccion Fecha y Horario</strong>
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quia in minima repellendus porro repudiandae est ducimus, possimus eligendi ratione minus quae quod adipisci pariatur culpa nemo provident explicabo delectus?
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            <strong>Seleccion de Precio</strong>
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <div>
                                <h5>La cantidad máxima de entradas que se pueden comprar son 10</h5>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tipo de asiento</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="standard">
                                        <td>Standard</td>
                                        <td>$ 5.000</td>
                                        <td>
                                            <select id="standard-quantity">
                                                {[...Array(11).keys()].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <strong>Selecciona su Asiento</strong>
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <div className="chair">
                                <div className="allChair">
                                    <p className="chairText">Disponible</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#444451">
                                        <path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>
                                    </svg>
                                </div>
                                <div className="allChair">
                                    <p className="chairText">Ocupado</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red">
                                        <path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>
                                    </svg>
                                </div>
                                <div className="allChair">
                                    <p className="chairText">Seleccionado</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="green">
                                        <path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="container-fluid seatStructure">
                                <center>
                                <h4 className="screenTitle">Pantalla de Cine</h4>
                                    <div className="screen">
                                    </div>
                                    <div className="row" id="seatsBlock">
                                        {[...Array(rows)].map((_, rowIndex) => (
                                            <div className="row justify-content-center" key={rowIndex}>
                                                {[...Array(seatsPerRow)].map((_, seatIndex) => {
                                                    const index = rowIndex * seatsPerRow + seatIndex;
                                                    const seatLabel = getSeatLabel(index);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`seat ${
                                                                selectedSeats.includes(index) ? "selected" : ""
                                                            }`}
                                                            onClick={() => updateSelectedSeats(index)}
                                                        >
                                                            {seatLabel}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </center>
                            </div>
                            <p id="notification"></p>
                            <button onClick={() => alert('Asientos seleccionados: ' + selectedSeats.map(index => getSeatLabel(index)).join(', '))} className="btn btn-primary">Confirmar Selección</button>
                        </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                        >
                            <strong>Pagar Entrada</strong>
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eaque consequuntur ipsam incidunt laboriosam debitis velit dolorum beatae voluptas dolor placeat, iure maxime alias aliquam assumenda reiciendis quibusdam a! Natus.</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
