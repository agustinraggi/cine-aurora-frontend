import React, { useEffect, useState } from "react";
import "./carrusel.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carrusel = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
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
                {
                    popularMovies.map(movie => (
                        <div key={movie.id}>
                            <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.title} />
                                </div>
                                <div className="scrolldown" style={{ "--color": "skyblue" }}>
                                    <div className="chevrons">
                                        <div className="chevrondown"></div>
                                        <div className="chevrondown"></div>
                                    </div>
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.title : ""}</div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </Slider>
            <MovieList />
        </div>
    );
}

export default Carrusel;
