import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import LoginWrapper from './pages/form/LoginWrapper';
import Register from './pages/form/register';
import User from './pages/form/register';
import Ticket from './pages/buyTicket/ticket';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Router>
        <Header user={user} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="buyTicket/:id" element={<Ticket />} />
          <Route path="login" element={<LoginWrapper setUser={setUser} />} />
          <Route path='register' element={<Register />} />
          <Route path='user' element={User}></Route>
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
