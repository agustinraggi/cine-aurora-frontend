import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import "./addFilmAdmin.css";

const MovieForm = () => {
    const [title, setTitle] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const API_URL = "https://api.themoviedb.org/3";
    const API_KEY = "6a5fa2aa71d234b5f1b196ce04746bc5";

    useEffect(() => {
        const searchMovies = async () => {
            if (title.trim() !== "") {
                try {
                    const { data } = await axios.get(`${API_URL}/search/movie`, {
                        params: {
                            api_key: API_KEY,
                            query: title,
                        },
                    });
                    setSearchResults(data.results);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            } else {
                setSearchResults([]);
            }
        };

        searchMovies();
    }, [title, API_KEY]);

    const handleMovieSelect = (selectedMovie) => {
        setTitle(selectedMovie.title);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${API_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    query: title,
                },
            });
            const newMovie = data.results[0];

            addFilm(newMovie);

            setShowConfirmation(true);
            setTimeout(() => {
                setShowConfirmation(false);
            }, 3000);

            setTitle("");
        } catch (error) {
            console.error("Error al agregar la película:", error);
        }
    };

    const addFilm = (movie) => {
        axios.post("http://localhost:3001/createFilm", {
            codeFilm: movie.id,
            nameFilm: movie.title
        })
        .then(() => {
            clearForm();
            Swal.fire({
                title: "<strong>Película Registrada</strong>",
                html: `<i>La película <strong>${movie.title}</strong> fue registrada con éxito!</i>`,
                icon: "success",
                timer: 2000
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo registrar la película!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    const clearForm = () => {
        setTitle("");
    };

    return (
        <div className="add-film-container">
            <h2>Agregar Nueva Película</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {searchResults.length > 0 && (
                        <ul className="movie-list">
                            {searchResults.map((movie) => (
                                <li key={movie.id} onClick={() => handleMovieSelect(movie)}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    <span className="movie-title">{movie.title}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default MovieForm;
