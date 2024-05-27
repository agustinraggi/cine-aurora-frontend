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




    return (
        <div>
            <div className="ticket">
                <div className="ticket__intro">
                    <img className="ticket__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`} alt="Backdrop" />
                </div>
            </div>
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
    );
}

export default Ticket;
