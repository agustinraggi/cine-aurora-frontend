import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../components/loading/loading'; 
import MovieListSoon from "../../components/movieList/movieListSoon"; 

const UpcomingMovies = () => {
  const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al cargar las películas.");
        setLoading(false);
        Swal.fire({
          title: "Error al obtener detalles de la película próximamente",
          text: "No se pudo cargar la película. ¿Quieres intentar nuevamente?",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "Reintentar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            fetchUpcomingMovies(); 
          }
        });
      }
    };

    fetchUpcomingMovies();
  }, [API_KEY]);

  // Si aún está cargando, muestra la pantalla de carga real
  if (loading) {
    return <Loading />;
  }


  return (
    <div className="movie__list">
      <h2 className="list__title">Películas Próximas</h2>
      <MovieListSoon movies={movies} />
    </div>
  );
};

export default UpcomingMovies;
