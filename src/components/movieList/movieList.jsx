import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./movieList.css";

const MovieList = () => {
    const [dbMovies, setDbMovies] = useState([]);
    const [moviePosters, setMoviePosters] = useState([]);

    useEffect(() => {
        fetchDbMovies();
    }, []);

    useEffect(() => {
        const fetchMoviePosters = async () => {
            const posters = await Promise.all(
                dbMovies.map(async (dbMovie) => {
                    const movieData = await fetchMovieData(dbMovie.codeFilm);
                    if (movieData) {
                        return {
                            ...dbMovie,
                            posterPath: movieData.poster_path,
                            id: movieData.id,
                            nameFilm: movieData.title 
                        };
                    } else {
                        return {
                            ...dbMovie,
                            posterPath: null,
                            id: null,
                            nameFilm: dbMovie.nameFilm
                        };
                    }
                })
            );
            setMoviePosters(posters.filter(movie => movie.posterPath !== null));
        };

        fetchMoviePosters();
    }, [dbMovies]);

    const fetchDbMovies = async () => {
        try {
            const response = await axios.get("http://localhost:3001/allFilm");
            setDbMovies(response.data);
        } catch (error) {
            console.error("Error fetching database movies:", error);
        }
    };

    const fetchMovieData = async (codeFilm) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${codeFilm}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movie data:", error);
            return null;
        }
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">Películas</h2>
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
