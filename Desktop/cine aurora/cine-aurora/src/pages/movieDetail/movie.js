import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    const fetchMovie = async () => {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        });
        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(
                (vid) => vid.type === "Trailer"
            );
            setTrailer(trailer ? trailer : data.videos.results[0]);
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
                        <div className="movie__releaseDate">Release date: {currentMovieDetail.release_date}</div>
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
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;
