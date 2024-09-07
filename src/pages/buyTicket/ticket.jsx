import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ticket.css";
import Chair from "./chair/chair";
import MercadoPago from "./mercadoPago/mercadoPago";
import Sala from "./salas/salas";

function Ticket({ userId }) {
    const API_URL = 'http://localhost:3001';

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

    const fetchMovie = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/movie/${id}`);
            setCurrentMovieDetail(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const fetchMovieFunctions = async (codeFilm) => {
        try {
            const { data } = await axios.get(`${API_URL}/movieFunctions/${codeFilm}`);
            setMovieFunctions(data);
        } catch (error) {
            console.error("Error fetching movie functions:", error);
        }
    };

    const fetchPrice = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/getPrice', {
                params: {
                    codeFilm: id,
                    date: selectedDate,
                    time: selectedTime,
                    typeOfFunction: selectedTypeOfFunction,
                    language: selectedLanguage,
                },
            });
            setPrice(data.price);
        } catch (error) {
            console.error("Error fetching price:", error);
        }
    };

    useEffect(() => {
        if (selectedDate && selectedTime && selectedTypeOfFunction && selectedLanguage) {
            fetchPrice();
        }
    }, [selectedDate, selectedTime, selectedTypeOfFunction, selectedLanguage]);


    useEffect(() => {
        if (id) {
            fetchMovie();
            fetchMovieFunctions(id);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchMovie();
            fetchMovieFunctions(id);
        }
    }, [id]);

    const handleQuantityChange = (event) => {
        setTicketQuantity(parseInt(event.target.value));
    };

    const handleSeatsSelected = (seats) => {
        setSelectedSeats(seats);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setError("");
    };

    const handleTimeSelect = (func) => {
        setSelectedTime(func.time);
        setSelectedRoom(func.room);
        setSelectedTypeOfFunction(func.typeOfFunction);
        setSelectedLanguage(func.language);
        setError("");
    };

    const handleFormatSelect = (format) => {
        setSelectedTypeOfFunction(format);
        setError("");
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setError("");
    };

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
                                onFormatSelect={handleFormatSelect} 
                                onLanguageSelect={handleLanguageSelect} 
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
                            {ticketQuantity > 0 ? (
                                <Chair ticketQuantity={ticketQuantity} onSeatsSelected={handleSeatsSelected} />
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
        </div>
    );
}

export default Ticket;