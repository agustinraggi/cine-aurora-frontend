import React, { useEffect, useState } from "react";
import "../ticket.css"

function Chair () {

     // Seleccion de asientos
     const [selectedSeats, setSelectedSeats] = useState([]);
     const rows = 14;
     const seatsPerRow = 21;
 
     // Función para actualizar asientos seleccionados
     const updateSelectedSeats = (index) => {
         setSelectedSeats((prev) =>
             prev.includes(index) ? prev.filter((seat) => seat !== index) : [...prev, index]
         );
     };
 
     // Función para obtener la etiqueta del asiento
     const getSeatLabel = (index) => {
         const row = String.fromCharCode(65 + Math.floor(index / seatsPerRow));
         const seatNumber = (index % seatsPerRow) + 1;
         return `${row}${seatNumber}`;
     };
 
     // Función para cargar asientos seleccionados desde localStorage
     const populateUI = () => {
         const savedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
         setSelectedSeats(savedSeats);
     };
 
     // useEffect para cargar asientos seleccionados al montar el componente
     useEffect(() => {
         populateUI();
     }, []);
 
     // useEffect para guardar asientos seleccionados en localStorage cuando cambian
     useEffect(() => {
         localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
     }, [selectedSeats]);

    return(
        <div>
            <div className="chair">
                                <div className="allChair">
                                    <p className="chairText">Disponible</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#444451">
                                        <path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>
                                    </svg>
                                </div>
                                <div className="allChair">
                                    <p className="chairText">Ocupado</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red">
                                        <path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>
                                    </svg>
                                </div>
                                <div className="allChair">
                                    <p className="chairText">Seleccionado</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="green">
                                        <path d="M200-120q-17 0-28.5-11.5T160-160v-40q-50 0-85-35t-35-85v-200q0-50 35-85t85-35v-80q0-50 35-85t85-35h400q50 0 85 35t35 85v80q50 0 85 35t35 85v200q0 50-35 85t-85 35v40q0 17-11.5 28.5T760-120q-17 0-28.5-11.5T720-160v-40H240v40q0 17-11.5 28.5T200-120Zm-40-160h640q17 0 28.5-11.5T840-320v-200q0-17-11.5-28.5T800-560q-17 0-28.5 11.5T760-520v160H200v-160q0-17-11.5-28.5T160-560q-17 0-28.5 11.5T120-520v200q0 17 11.5 28.5T160-280Zm120-160h400v-80q0-27 11-49t29-39v-112q0-17-11.5-28.5T680-760H280q-17 0-28.5 11.5T240-720v112q18 17 29 39t11 49v80Zm200 0Zm0 160Zm0-80Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="container-fluid seatStructure">
                                <center>
                                <h4 className="screenTitle">Pantalla de Cine</h4>
                                    <div className="screen">
                                    </div>
                                    <div className="row" id="seatsBlock">
                                        {[...Array(rows)].map((_, rowIndex) => (
                                            <div className="row justify-content-center" key={rowIndex}>
                                                {[...Array(seatsPerRow)].map((_, seatIndex) => {
                                                    const index = rowIndex * seatsPerRow + seatIndex;
                                                    const seatLabel = getSeatLabel(index);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`seat ${
                                                                selectedSeats.includes(index) ? "selected" : ""
                                                            }`}
                                                            onClick={() => updateSelectedSeats(index)}
                                                        >
                                                            {seatLabel}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </center>
                            </div>
                            <p id="notification"></p>
                            <button onClick={() => alert('Asientos seleccionados: ' + selectedSeats.map(index => getSeatLabel(index)).join(', '))} className="btn btn-primary">Confirmar Selección</button>
        </div>
    )
}

export default Chair;