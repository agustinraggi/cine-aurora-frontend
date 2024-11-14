import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import Swal from 'sweetalert2'; 
import { getMovieDetails, getMovieTrailer } from '../../utils/apiFilm'; 

import "./movie.css";

function Movie() {
    const [trailer, setTrailer] = useState(null);
    const [currentMovieDetail, setCurrentMovieDetail] = useState({ title: "Loading Movies" });
    const [playing, setPlaying] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Función para obtener los detalles de la película
    const fetchMovie = async () => {
        try {
        const movieData = await getMovieDetails(id);
        setCurrentMovieDetail(movieData);
        const trailerResponse = await getMovieTrailer(id);
        if (trailerResponse.results) {
            let selectedTrailer;
            selectedTrailer = trailerResponse.results.find(
            (vid) => vid.type === "Trailer" && vid.iso_639_1 === "es-MX" && vid.iso_3166_1 === "MX"
            );
            if (!selectedTrailer) {
            selectedTrailer = trailerResponse.results.find(
                (vid) => vid.type === "Trailer" && vid.iso_639_1 === "es-MX" && vid.iso_3166_1 === "ES"
            );
            }
            if (!selectedTrailer) {
            selectedTrailer = trailerResponse.results.find(
                (vid) => vid.type === "Trailer" && vid.iso_639_1 === "es-MX" && vid.name.toLowerCase().includes("subtitulado")
            );
            }
            if (!selectedTrailer) {
                selectedTrailer = trailerResponse.results.find(
                (vid) => vid.type === "Trailer"
            );
            }
            setTrailer(selectedTrailer);
        }
        } catch {
        Swal.fire({
            title: "Error al obtener detalles de la pelicula",
            text: "No se pudo cargar la película. ¿Quieres intentar nuevamente?",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Reintentar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
            fetchMovie();
            }
        });
        }
    };
    
    useEffect(() => {
        fetchMovie();
    }, [id]);

    useEffect(() => {
        if (trailer) {
        setPlaying(true);
    }
    }, [trailer]);

    const closeTrailer = () => {
        setPlaying(false);
    };

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
                    <div className="viewtrailer">
                        {playing && trailer ? (
                            <YouTube
                                videoId={trailer.key}
                                className="youtube-container"
                                containerClassName="viewtrailer"
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 1,
                                        cc_load_policy: 0,
                                        fs: 1,
                                        iv_load_policy: 0,
                                        modestbranding: 1,
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
            <div className="movieFooter"></div>
        </div>
    );
}

export default Movie;
