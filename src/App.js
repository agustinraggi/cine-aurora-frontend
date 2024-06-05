import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Login from './pages/form/login';
import Register from './pages/form/register';
import Ticket from './pages/buyTicket/ticket';


function App() {
  return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="movie/:id" element={<Movie />}></Route>
            <Route path="movies/:type" element={<MovieList />}></Route>
            <Route path="buyTicket/:id" element={<Ticket />} />
            <Route path="login" element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path="/*" element={<h1>Error Page</h1>}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
