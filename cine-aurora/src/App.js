import React, { useEffect, useState } from 'react';
import './style.css'
import './slider.css'
import axios from 'axios';
import YouTube from 'react-youtube';



function App() {
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = '6a5fa2aa71d234b5f1b196ce04746bc5'
  // tamaño de la imagen de la cartelera
  const IMAGE_PATH =  'https://image.tmdb.org/t/p/original'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'


  // variables de estado
  const[movies, setMovies] = useState([])
  const[searchKey, setSearchKey] = useState("")
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async(searchKey) => {

    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);
  
  }

//  funcion buscar peliculas 
// const searchMovies = (e) => {
//   e.preventDefault();
//   fetchMovies(searchKey)
// }


  useEffect(() =>{
    fetchMovies();
},[])

  return (
    <div>
      <div class="logo">Cine Aurora</div>
            <ul class="menu">
                <li>home</li>
                <li>ofertas</li>
                <li>contacto</li>
                <a href="html/usuario.html" class="flex items-center">
                    <li>usuario</li>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                </a>
                
            </ul>
      <div className='container mt-3'>
        <div className='row'>
          {movies.map((movie) =>(
            <div key={movie.id} className='col-md-4 mb-3'>
              <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" />
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
