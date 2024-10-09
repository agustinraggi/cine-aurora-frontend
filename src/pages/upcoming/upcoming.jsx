import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './upcoming.css'; 
import MovieListSoon from "../../components/movieList/movieListSoon";

const UpcomingMovies = () => {
  const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY
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
        <MovieListSoon />
    </div>
  );
};

export default UpcomingMovies;