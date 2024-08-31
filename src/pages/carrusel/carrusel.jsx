import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "./carrusel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieList from "../../components/movieList/movieList";

const Carrusel = () => {
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
                            id: movieData.id
                        };
                    } else {
                        return {
                            ...dbMovie,
                            posterPath: null,
                            id: null
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        arrows: false,
        appendDots: dots => (
            <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <ul style={{ margin: 0 }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'gray',
                    borderRadius: '50%',
                    margin: '0 8px'
                }}
            />
        )
    };

    return (
        <div className="poster">
            <Slider {...settings}>
                {moviePosters.map((movie, index) => (
                    <div key={index} className="slider-item">
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="posterImage">
                                {movie.posterPath ? (
                                    <img src={`https://image.tmdb.org/t/p/original${movie.posterPath}`} alt={movie.nameFilm} className="CarruselImg" />
                                ) : (
                                    <div>No se encontró el póster para {movie.nameFilm}</div>
                                )}
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie.nameFilm}</div>
                                </div>
                            </div>
                            <div className="scrolldown" style={{ "--color": "skyblue" }}>
                                <div className="chevrons">
                                    <div className="chevrondown"></div>
                                    <div className="chevrondown"></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
            <MovieList />
        </div>
    );
};

export default Carrusel;
