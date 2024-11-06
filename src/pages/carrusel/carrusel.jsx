import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "./carrusel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieList from "../../components/movieList/movieList";
import Loading from "../../components/loading/loading";

const Carrusel = () => {
    const [dbMovies, setDbMovies] = useState([]);
    const [moviePosters, setMoviePosters] = useState([]);
    const [loading, setLoading] = useState(true); // Mantener el estado de carga

    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

    // Cargar las películas desde la base de datos
    useEffect(() => {
        fetchDbMovies();
    }, []);

    // Cargar las imágenes de las películas después de que se obtienen las películas
    useEffect(() => {
        if (dbMovies.length > 0) {
            const fetchMoviePosters = async () => {
                const posters = await Promise.all(
                    dbMovies.map(async (dbMovie) => {
                        const movieData = await fetchMovieData(dbMovie.codeFilm);
                        if (movieData) {
                            return {
                                ...dbMovie,
                                backdropPath: movieData.backdrop_path,
                                posterPath: movieData.poster_path,
                                id: movieData.id
                            };
                        } else {
                            return {
                                ...dbMovie,
                                backdropPath: null,
                                posterPath: null,
                                id: null
                            };
                        }
                    })
                );
                setMoviePosters(posters.filter(movie => movie.backdropPath !== null || movie.posterPath !== null));
                setLoading(false); // Set loading to false after loading the posters
            };

            fetchMoviePosters();
        }
    }, [dbMovies]);

    // Obtener las películas de la base de datos
    const fetchDbMovies = async () => {
        try {
            const response = await axios.get(`${URL_BACK}/allFilm`);
            setDbMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Obtener los datos de cada película usando su código
    const fetchMovieData = async (codeFilm) => {
        try {
            const response = await axios.get(`${URL_BACK}/movie/${codeFilm}`);
            return response.data;
        } catch (error) {
            return null;
        }
    };

    // Si está cargando, mostrar el componente Loading
    if (loading) {
        return <Loading />;
    }

    // Configuración del slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
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
        ),
        pauseOnHover: false 
    };

    return (
        <div className="poster">
            <Slider {...settings}>
                {moviePosters.map((movie, index) => (
                    <div key={index} className="slider-item">
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="posterImage">
                                <img src={`https://image.tmdb.org/t/p/original${movie.backdropPath || movie.posterPath}`} alt={movie.nameFilm} className="posterImage__img" />
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
