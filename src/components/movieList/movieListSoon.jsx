import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./movieList.css";

const MovieList = () => {
    const [moviePosters, setMoviePosters] = useState([]);
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${URL_BACK}/allFilmSoon`);
            setMoviePosters(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div className="movie__list">
            <div className="list__cards">
                {moviePosters.map((movie, index) => (
                    <div key={index}>
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="cards">
                                {movie.posterPath ? (
                                    <img src={`https://image.tmdb.org/t/p/original${movie.posterPath}`} alt={movie.nameFilm} className="cards__img" />
                                ) : (
                                    <div>No se encontró el póster para {movie.nameFilm}</div>
                                )}
                                <div className="cards__overlay">
                                    <div className="card__title">{movie.nameFilm}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
