import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ticket.css";

function Ticket() {
    const API_KEY = '6a5fa2aa71d234b5f1b196ce04746bc5';
    const API_URL = 'https://api.themoviedb.org/3';

    const [currentMovieDetail, setCurrentMovieDetail] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
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

    const handleSeatClick = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };


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
                                <h5>la cantidad maxima de entrdas que se pueden comprar son 10</h5>
                            </div>
                            <tbody>
                                <tr>
                                    <th>Tipo de asiento</th>
                                    <th>Precio</th>
                                    <th>cantidad</th>
                                </tr>
                                <tr className="standart">
                                    <th>standart</th>
                                    <th>$ 5.000</th>
                                    <td>
                                        <select  id="ctl00_Contenido_gridPrices_ctl02_cboTickQuantity">
			    	    	                <option value="0">0</option>
			    	    	                <option value="1">1</option>
			    	    	                <option value="2">2</option>
			    	    	                <option value="3">3</option>
			    	    	                <option value="4">4</option>
			    	    	                <option value="5">5</option>
			    	    	                <option value="6">6</option>
			    	    	                <option value="7">7</option>
			    	    	                <option value="8">8</option>
			    	    	                <option value="9">9</option>
			    	    	                <option value="10">10</option>
			    	                    </select>
                                    </td>
                                </tr>
                                <tr className="premium">
                                    <th>premiums</th>
                                    <th>$ 7.500</th>
                                    <td>
                                        <select  id="ctl00_Contenido_gridPrices_ctl02_cboTickQuantity">
			    	    	                <option value="0">0</option>
			    	    	                <option value="1">1</option>
			    	    	                <option value="2">2</option>
			    	    	                <option value="3">3</option>
			    	    	                <option value="4">4</option>
			    	    	                <option value="5">5</option>
			    	    	                <option value="6">6</option>
			    	    	                <option value="7">7</option>
			    	    	                <option value="8">8</option>
			    	    	                <option value="9">9</option>
			    	    	                <option value="10">10</option>
			    	                    </select>
                                    </td>
                                </tr>
                            </tbody>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4c4cf3d5"><path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>disponible</svg>
                                </div>
                                <div className="allChair">
                                    <p className="chairText">No Disponible</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/></svg>
                                </div>
                                <div className="allChair">
                                    <p className="chairText">Seleccionado</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="purple"><path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/></svg>
                                </div>
                                <div className="allChair">
                                    <p className="chairText">Ocupado</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="grey"><path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/></svg>
                                </div>
                            </div>
                            <h3 className="screen">PANTALLA</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <button className={`svgButton ${selectedSeats.includes(1) ? "selected" : ""}`} aria-label="Asiento Disponible" onClick={() => handleSeatClick(1)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={selectedSeats.includes(1) ? "purple" : "#4c4cf3d5"}>
                                                    <path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingfour">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsefour"
                            aria-expanded="false"
                            aria-controls="#collapsefour"
                        >
                            <strong>Seleccion Metodo Pago</strong>
                        </button>
                    </h2>
                    <div
                            id="collapsefour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingfour"
                            data-bs-parent="#accordionExample"
                        >
                        <div className="accordion-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quia in minima repellendus porro repudiandae est ducimus, possimus eligendi ratione minus quae quod adipisci pariatur culpa nemo provident explicabo delectus?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
