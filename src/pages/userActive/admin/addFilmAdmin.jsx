import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import "./addFilmAdmin.css";

const AddSoonFilmAdmin = () => {
    const [title, setTitle] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

    useEffect(() => {
        const searchMovies = async () => {
            if (title.trim().length >= 3) {
                try {
                    const { data } = await axios.get(`${URL_BACK}/search/movie`, {
                        params: {
                            query: title,
                            language: "es-MX"
                        },
                    });
                    setSearchResults(data);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            } else {
                setSearchResults([]);
            }
        };
        searchMovies();
    }, [title]);
    const handleMovieSelect = (selectedMovie) => {
        setTitle(selectedMovie.nameFilm);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedMovie = searchResults[0];
            addFilm(selectedMovie);
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
        axios.post(`${URL_BACK}/createFilm`, {
            codeFilm: movie.id,
            nameFilm: movie.nameFilm
        })
        .then(() => {
            clearForm();
            Swal.fire({
                title: "<strong>Película Registrada</strong>",
                html: `<i>La película <strong>${movie.nameFilm}</strong> fue registrada con éxito!</i>`,
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
            <h2>Agregar Película</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <button type="submit">Agregar</button>
                    {searchResults.length > 0 && (
                        <ul className="movie-list">
                            {searchResults.map((movie) => (
                                <li key={movie.id} onClick={() => handleMovieSelect(movie)}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
                                        alt={movie.nameFilm}
                                        className="movie-poster"
                                    />
                                    <span className="movie-title">{movie.nameFilm}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="footerAddFilm">
                </div>
            </form>
        </div>
    );
};

export default AddSoonFilmAdmin;
