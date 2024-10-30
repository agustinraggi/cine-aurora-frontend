import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./movieList.css";
import { getAllFilmSoon } from "../../utils/apiService"; 

const MovieList = () => {
    const [moviePosters, setMoviePosters] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const movies = await getAllFilmSoon();
            setMoviePosters(movies);
        } catch (error) {
            console.error("Error fetching movies:", error);
            Swal.fire({
                title: "Error al cargar las películas",
                text: "No se pudo cargar la lista de películas. ¿Quieres intentar nuevamente?",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "Reintentar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetchMovies();
                }
            });
        }
    };

    return (
        <div className="movie__list">
            <div className="list__cards">
                {moviePosters.map((movie, index) => (
                    <div key={index}>
                        <Link className="titleImgPoster" to={`/movieSoon/${movie.id}`}>
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
