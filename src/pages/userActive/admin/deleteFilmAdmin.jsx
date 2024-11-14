import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "./deleteFilm.css";
import { getAllFilms, deleteMovie } from "../../../utils/apiFilm";

function DeleteFilmAdmin() {

    const [listFilm, setListFilm] = useState([]);
    const [filteredFilm, setFilteredFilm] = useState([]);
    const [search, setSearch] = useState("");

    // Obtener todas las películas
    const getFilm = () => {
        getAllFilms()
            .then((data) => {
                setListFilm(data);
                setFilteredFilm(data);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });
    };

    // Eliminar película con confirmación
    const deleteData = (idFilm, nameFilm) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: `No podrás revertir esta acción. ¿Estás seguro de que deseas eliminar ${nameFilm}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMovie(idFilm, nameFilm)
                    .then(() => {
                        getFilm();
                    })
                    .catch((error) => {
                        console.error("Error al eliminar la película:", error);
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelado",
                    text: "Tu archivo está a salvo :)",
                    icon: "error",
                    timer: 2000
                });
            }
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
            <h1>Películas a eliminar</h1>
            <table className="table table-bordered" id="tableData">
                <thead>
                    <tr>
                        <th className="datesFilm">ID</th>
                        <th className="datesFilm">Código</th>
                        <th className="datesFilm">Nombre de la Película</th>
                        <th className="datesFilm">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFilm.map((film) => (
                        <tr key={film.idFilm}>
                            <td>{film.idFilm}</td>
                            <td>{film.codeFilm}</td>
                            <td>{film.nameFilm}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteData(film.idFilm, film.nameFilm)}>Eliminar</button>
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