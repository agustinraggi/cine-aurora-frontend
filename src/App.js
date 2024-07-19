import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Carrusel from './pages/carrusel/carrusel';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Upcoming from './pages/upcoming/upcoming';
import LoginWrapper from './pages/form/LoginWrapper';
import Register from './pages/form/register';
import UserActive from './pages/userActive/loggedUser';
import EditUser from './pages/userActive/editUser';
import AdminActive from './pages/userActive/loggedAdmin';
import AddFilmAdmin from './pages/userActive/admin/addFilmAdmin';
import DeleteFilmAdmin from "./pages/userActive/admin/deleteFilmAdmin";
import VerifyVoucher from "./pages/userActive/admin/verifyVoucher";
import EditAdminData from "./pages/userActive/admin/editAdminData";
import Ticket from './pages/buyTicket/ticket';
import MercadoPago from "./pages/buyTicket/mercadoPago/mercadoPago";
import ProtectedRoute from './components/protectedRoute/portectedRoute';

function App() {
    const [user, setUser] = useState(null);
    return (
        <div className="App">
            <Router>
                <Header user={user} />
                <Routes>
                    <Route path="/" element={<Carrusel />} />
                    <Route path="movie/:id" element={<Movie />} />
                    <Route path="movies/:type" element={<MovieList />} />
                    <Route path="upcoming" element={<Upcoming />} />
                    <Route path="login" element={<LoginWrapper setUser={setUser} />} />
                    <Route path="register" element={<Register />} />
                    
                    <Route 
                        path="userActive" 
                        element={
                            <ProtectedRoute user={user}>
                                <UserActive userId={user ? user.id : null} />
                            </ProtectedRoute>
                        } 
                    />
                    <Route
                        path="editUser/:idUser"
                        element={
                            <ProtectedRoute user={user}>
                                <EditUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="adminActive" 
                        element={
                            <ProtectedRoute user={user}>
                                <AdminActive />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="addFilmAdmin" 
                        element={
                            <ProtectedRoute user={user}>
                                <AddFilmAdmin />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="deleteFilmAdmin" 
                        element={
                            <ProtectedRoute user={user}>
                                <DeleteFilmAdmin />
                            </ProtectedRoute>
                        } 
                    />
                    <Route
                        path="verifyVoucher" 
                        element={
                            <ProtectedRoute user={user}>
                                <VerifyVoucher />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="editAdminData" 
                        element={
                            <ProtectedRoute user={user}>
                                <EditAdminData />
                            </ProtectedRoute>
                        } 
                    />
                    <Route
                        path="buyTicket/:id"
                        element={
                            <ProtectedRoute user={user}>
                                <Ticket userId={user ? user.id : null} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="mercadoPago"
                        element={
                            <ProtectedRoute user={user}>
                                <MercadoPago user={user} />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="*" element={<h1>Error Page</h1>} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
