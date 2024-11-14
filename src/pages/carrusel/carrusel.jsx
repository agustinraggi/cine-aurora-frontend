import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./carrusel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieList from "../../components/movieList/movieList";
import Loading from "../../components/loading/loading";
import { getAllFilms, getMovieByCode } from "../../utils/apiFilm";

const Carrusel = () => {
    const [dbMovies, setDbMovies] = useState([]);
    const [moviePosters, setMoviePosters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar las películas desde la base de datos
    useEffect(() => {
        fetchDbMovies();
    }, []);

    // Cargar las imágenes de las películas después de obtenerlas
    useEffect(() => {
        if (dbMovies.length > 0) {
            const fetchMoviePosters = async () => {
                const posters = await Promise.all(
                    dbMovies.map(async (dbMovie) => {
                        const movieData = await getMovieByCode(dbMovie.codeFilm);
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
                setLoading(false);
            };

            fetchMoviePosters();
        }
    }, [dbMovies]);

    // Obtener todas las películas desde la base de datos
    const fetchDbMovies = async () => {
        try {
            const movies = await getAllFilms();
            setDbMovies(movies);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

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
