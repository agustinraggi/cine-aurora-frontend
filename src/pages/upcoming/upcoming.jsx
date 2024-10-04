import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './upcoming.css'; 

const UpcomingMovies = () => {
  const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";
  const [movies, setMovies] = useState([]);
  const API_KEY = '6a5fa2aa71d234b5f1b196ce04746bc5';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching the upcoming movies:', error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1500);

    return () => clearTimeout(timer); 
}, []);

// Si está cargando, muestra la pantalla de carga
      if (loading) {
        return (
            <div className="loadingScreen">
                <div className="loadingFilm">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }

  return (
    <div className="movie__list">
      <h2 className="list__title">Películas Próximas</h2>
      <div className="list__cards">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="cards">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="cards__img" />
              <div className="cards__overlay">
                <h3 className="card__title">{movie.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
