import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ticket.css";
import Chair from "./chair/chair";
import MercadoPago from "./mercadoPago/mercadoPago";

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
                            <Chair />
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
                            <MercadoPago ticketData={{ title: currentMovieDetail.title, price: 5000 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
