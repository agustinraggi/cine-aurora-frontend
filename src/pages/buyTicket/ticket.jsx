import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ticket.css";
import Chair from "./chair/chair";
import MercadoPago from "./mercadoPago/mercadoPago";
import Sala from "./salas/salas";

function Ticket({ userId }) {
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

    const [currentMovieDetail, setCurrentMovieDetail] = useState({});
    const [ticketQuantity, setTicketQuantity] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [movieFunctions, setMovieFunctions] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedTypeOfFunction, setSelectedTypeOfFunction] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [price, setPrice] = useState(0);
    const [error, setError] = useState("");
    const { id } = useParams();
    const [idMovieTheater, setMovieTheaterId] = useState(null);

    // Función para obtener los detalles de la película
    const fetchMovie = async () => {
        try {
            const { data } = await axios.get(`${URL_BACK}/movie/${id}`);
            setCurrentMovieDetail(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    // Función para obtener las funciones de la película
    const fetchMovieFunctions = async (codeFilm) => {
        try {
            const { data } = await axios.get(`${URL_BACK}/movieFunctions/${codeFilm}`);
            setMovieFunctions(data);
        } catch (error) {
            console.error("Error fetching movie functions:", error);
        }
    };

    // Función para obtener el precio de la entrada
    const fetchPrice = async () => {
        try {
            const { data } = await axios.get(`${URL_BACK}/getPrice`, {
                params: {
                    codeFilm: id,
                    date: selectedDate,
                    time: selectedTime,
                    typeOfFunction: selectedTypeOfFunction,
                    language: selectedLanguage,
                },
            });
            setPrice(data.price);
            setMovieTheaterId(data.id); 
        } catch (error) {
            console.error("Error fetching price:", error);
        }
    };

    // UseEffect para obtener el precio cuando se seleccionan fecha, horario, tipo de función y idioma
    useEffect(() => {
        if (selectedDate && selectedTime && selectedTypeOfFunction && selectedLanguage) {
            fetchPrice();
        }
    }, [selectedDate, selectedTime, selectedTypeOfFunction, selectedLanguage]);

    // UseEffect para obtener los detalles de la película y sus funciones
    useEffect(() => {
        if (id) {
            fetchMovie();
            fetchMovieFunctions(id);
        }
    }, [id]);

    // Manejo de la cantidad de entradas
    const handleQuantityChange = (event) => {
        setTicketQuantity(parseInt(event.target.value));
    };

    // Manejo de la selección de asientos
    const handleSeatsSelected = (seats) => {
        setSelectedSeats(seats);
    };

    // Manejo de la selección de la fecha
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setError("");
    };

    // Manejo de la selección de horario
    const handleTimeSelect = (func) => {
        setSelectedTime(func.time);
        setSelectedRoom(func.room);
        setSelectedTypeOfFunction(func.typeOfFunction);
        setSelectedLanguage(func.language);
        setError("");    
    };

    // Validaciones antes de proceder a la compra
    const isValid = () => {
        if (!selectedDate || !selectedTime || !selectedTypeOfFunction || !selectedLanguage) {
            setError("Por favor, complete todos los campos de selección.");
            return false;
        }
        if (selectedSeats.length !== ticketQuantity) {
            setError("Debe seleccionar la misma cantidad de asientos que entradas.");
            return false;
        }
        return true;
    };

    // Datos del ticket a enviar a MercadoPago
    const ticketData = {
        title: currentMovieDetail.title,
        price: price * ticketQuantity, 
        quantity: ticketQuantity,
        seats: selectedSeats,
        date: selectedDate,
        time: selectedTime,
        room: selectedRoom,
        typeOfFunction: selectedTypeOfFunction,
        language: selectedLanguage,
        idMovieTheater: idMovieTheater,
    };

    return (
        <div className="ticket-container">
            <div className="ticket">
                <div className="ticketTitle">{currentMovieDetail.title}</div>
                <div className="ticketIntro">
                    <img className="ticketBackdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`} alt="Backdrop" />
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
                            <strong>Seleccion Fecha, Horario y Sala</strong>
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <Sala 
                                movieFunctions={movieFunctions} 
                                onDateSelect={handleDateSelect} 
                                onTimeSelect={handleTimeSelect} 
                            />  
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed"
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
                                        <td>${price}</td> 
                                        <td>
                                            <select id="standard-quantity" value={ticketQuantity} onChange={handleQuantityChange}>
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
                <div className="accordion-item" id="scroll-silla">
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
                        <div className="accordion-body scrollSeats">
                            {ticketQuantity > 0 ? (
                                <Chair ticketQuantity={ticketQuantity} onSeatsSelected={handleSeatsSelected} idMovieTheater={idMovieTheater} />
                            ) : (
                                <p>Seleccione la cantidad de entradas primero.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                        >
                            <strong>Resumen</strong>
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <div className="orderSummary">
                                <MercadoPago
                                    userId={userId}
                                    ticketData={ticketData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Ticket;
