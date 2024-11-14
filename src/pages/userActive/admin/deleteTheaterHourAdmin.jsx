import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "./deleteFilm.css";
import { getAllMovieTheater, deleteMovieTheater } from "../../../utils/apiMovieTheater";

function DeleteFilmAdmin() {
    const [listFilm, setListFilm] = useState([]);
    const [filteredFilm, setFilteredFilm] = useState([]);
    const [search, setSearch] = useState("");

   // Obtener todas las funciones de películas
    const getFilm = () => {
        getAllMovieTheater()
            .then((data) => {
                setListFilm(data);
                setFilteredFilm(data);
            })
            .catch((error) => {
                console.error("Error al obtener las funciones:", error);
            });
    };

    // Eliminar una función por su ID
        const deleteData = (idMovieTheater, nameFilm) => {
            deleteMovieTheater(idMovieTheater, nameFilm)
                .then(() => {
                    getFilm();
                })
                .catch((error) => {
                    console.error("Error al eliminar la función:", error);
                });
        };

    useEffect(() => {
        getFilm();
    }, []);

    useEffect(() => {
        filterFilm();
    }, [search, listFilm]);

    const filterFilm = () => {
        if (listFilm) {
            const filtered = listFilm.filter(film =>
                film.nameFilm.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredFilm(filtered);
        }
    };

    return (
        <div className="container">
            <h1>Funciones a eliminar</h1>
            <table className="table table-bordered" id="tableData">
                <thead>
                    <tr>
                        <th className="datesFilm" id="idDeleteTheaterDates">ID Función</th>
                        <th className="datesFilm">Nombre de la Película</th>
                        <th className="datesFilm">Fecha</th>
                        <th className="datesFilm">Hora</th>
                        <th className="datesFilm">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFilm.map((film) => (
                        <tr key={film.idMovieTheater}>
                            <td className="deleteTheaterDatesFilm" id="idDeleteTheaterDates">{film.idMovieTheater}</td>
                            <td className="deleteTheaterDatesFilm">{film.nameFilm}</td>
                            <td className="deleteTheaterDatesFilm">{film.date}</td>
                            <td className="deleteTheaterDatesFilm">{film.time}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteData(film.idMovieTheater, film.nameFilm)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="footerDeleteFilm"></div>
        </div>
    );
}

export default DeleteFilmAdmin;
