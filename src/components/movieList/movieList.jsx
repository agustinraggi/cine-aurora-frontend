import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        let url;
        switch (type) {
            case "upcoming":
                url = `https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES`;
                break;
            case "now_playing":
                url = `https://api.themoviedb.org/3/movie/now_playing?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES`;
                break;
            default:
                url = `https://api.themoviedb.org/3/movie/now_playing?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => setMovieList(data.results))
            .catch(error => console.error("Error fetching data:", error));
    };

    const getTitle = () => {
        switch (type) {
            case "upcoming":
                return "Próximamente";
            case "now_playing":
                return "En cartelera";
            default:
                return "En cartelera"; 
        }
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{getTitle()}</h2>
            <div className="list__cards">
                {movieList.map(movie => (
                    <Cards key={movie.id} movie={movie} className="card" />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
