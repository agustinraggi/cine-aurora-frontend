import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import YouTube from "react-youtube";
import "./movie.css";

function Movie() {
    const API_KEY = '6a5fa2aa71d234b5f1b196ce04746bc5';
    const API_URL = 'https://api.themoviedb.org/3';

    const [trailer, setTrailer] = useState(null);
    const [currentMovieDetail, setCurrentMovieDetail] = useState({ title: "Loading Movies" });
    const [playing, setPlaying] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchMovie = async () => {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos",
                language: "es-MX"
            }
        });

        if (data.videos && data.videos.results) {
            let selectedTrailer;
            selectedTrailer = data.videos.results.find(
                (vid) => vid.type === "Trailer" && vid.iso_639_1 === "es-MX" && vid.iso_3166_1 === "MX"
            );
            if (!selectedTrailer) {
                selectedTrailer = data.videos.results.find(
                    (vid) => vid.type === "Trailer" && vid.iso_639_1 === "es-MX" && vid.iso_3166_1 === "ES"
                );
            }
            if (!selectedTrailer) {
                selectedTrailer = data.videos.results.find(
                    (vid) => vid.type === "Trailer" && vid.iso_639_1 === "es-MX" && vid.name.toLowerCase().includes("subtitulado")
                );
            }
            if (!selectedTrailer) {
                selectedTrailer = data.videos.results.find(
                    (vid) => vid.type === "Trailer"
                );
            }

            setTrailer(selectedTrailer);
        }

        setCurrentMovieDetail(data);
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    useEffect(() => {
        if (trailer) {
            setPlaying(true);
        }
    }, [trailer]);

    const closeTrailer = () => {
        setPlaying(false);
    }

    const handleCartClick = () => {
        navigate(`/buyTicket/${id}`);
    }

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`} alt="Backdrop" />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`} alt="Poster" />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail.original_title}</div>
                        <div className="movie__tagline">{currentMovieDetail.tagline}</div>
                        <div className="movie__releaseDate">Proximamente: {currentMovieDetail.release_date}</div>
                        <div className="movie__genres">
                            {currentMovieDetail.genres && currentMovieDetail.genres.map(genre => (
                                <span key={genre.id} className="movie__genre">{genre.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail.overview}</div>
                    </div>
                    <div data-tooltip="Precio $5.000" className="button" onClick={handleCartClick}>
                        <div className="button-wrapper">
                            <div className="text"></div>
                                <span className="icon">
                                    <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                    </svg>
                                </span>
                        </div>
                    </div>
                    {/* ver el trailer */}
                    <div className="viewtrailer">
                        {playing && trailer ? (
                            <YouTube
                                videoId={trailer.key}
                                className="reproductor container"
                                containerClassName={"youtube-container amru"}
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 0,
                                        cc_load_policy: 0,
                                        fs: 0,
                                        iv_load_policy: 0,
                                        modestbranding: 0,
                                        rel: 0,
                                        showinfo: 0,
                                    },
                                }}
                            />
                        ) : (
                            <div className="no-trailer">Trailer no disponible :(</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="movieFooter">
            </div>
        </div>
    );
}

export default Movie;
