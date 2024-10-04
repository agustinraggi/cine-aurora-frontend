import React, { useEffect, useState } from "react";
import disponible from "./assets/disponible.png";
import seleccionado from "./assets/seleccionado.png";
import ocupado from "./assets/ocupado.png"
import "../ticket.css";
import axios from "axios";

function Chair({ ticketQuantity, onSeatsSelected, idMovieTheater }) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

    const rows = [
        ['A1', 'A2', '',   '',   '', '', '', '', 'A5', 'A6', 'A7', 'A8', 'A9', '',    '',    '',    '',    '',    '',    '',    '',    'A18', 'A19', 'A20', 'A21', 'A22', '', '', '', '', '',    '',    'A25', 'A26', 'A27'],
        ['B1', 'B2', 'B3', 'B4', '', '', '', '', 'B5', 'B6', 'B7', 'B8', 'B9', '',    '',    '',    '',    '',    '',    '',    '',    'B18', 'B19', 'B20', 'B21', 'B22', '', '', '', '', 'B23', 'B24', 'B25', 'B26', 'B27'],
        ['C1', 'C2', 'C3', 'C4', '', '', '', '', 'C5', 'C6', 'C7', 'C8', 'C9', '',    '',    '',    '',    '',    '',    '',    '',    'C18', 'C19', 'C20', 'C21', 'C22', '', '', '', '', 'C23', 'C24', 'C25', 'C26', 'C27'],
        ['D1', 'D2', 'D3', 'D4', '', '', '', '', 'D5', 'D6', 'D7', 'D8', 'D9', '',    '',    '',    '',    '',    '',    '',    '',    'D18', 'D19', 'D20', 'D21', 'D22', '', '', '', '', 'D23', 'D24', 'D25', 'D26', 'D27'],
        ['E1', 'E2', 'E3', 'E4', '', '', '', '', 'E5', 'E6', 'E7', 'E8', 'E9', '',    '',    '',    '',    '',    '',    '',    '',    'E18', 'E19', 'E20', 'E21', 'E22', '', '', '', '', 'E23', 'E24', 'E25', 'E26', 'E27'],
        ['F1', 'F2', 'F3', 'F4', '', '', '', '', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', '', '', '', '', 'F23', 'F24', 'F25', 'F26', 'F27'],
        ['G1', 'G2', 'G3', 'G4', '', '', '', '', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13', 'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20', 'G21', 'G22', '', '', '', '', 'G23', 'G24', 'G25', 'G26', 'G27'],
        ['H1', 'H2', 'H3', 'H4', '', '', '', '', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H18', 'H19', 'H20', 'H21', 'H22', '', '', '', '', 'H23', 'H24', 'H25', 'H26', 'H27'],
        ['I1', 'I2', 'I3', 'I4', '', '', '', '', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12', 'I13', 'I14', 'I15', 'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', '', '', '', '', 'I23', 'I24', 'I25', 'I26', 'I27'],
        ['J1', 'J2', 'J3', 'J4', '', '', '', '', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'J12', 'J13', 'J14', 'J15', 'J16', 'J17', 'J18', 'J19', 'J20', 'J21', 'J22', '', '', '', '', 'J23', 'J24', 'J25', 'J26', 'J27'],
        ['K1', 'K2', 'K3', 'K4', '', '', '', '', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13', 'K14', 'K15', 'K16', 'K17', 'K18', 'K19', 'K20', 'K21', 'K22', '', '', '', '', 'K23', 'K24', 'K25', 'K26', 'K27']
    ];
    const updateSelectedSeats = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats((prev) => prev.filter((s) => s !== seat));
        } else {
            if (selectedSeats.length < ticketQuantity) {
                setSelectedSeats((prev) => [...prev, seat]);
            } else {
                alert(`Solo puedes seleccionar hasta ${ticketQuantity} asientos.`);
            }
        }
    };

    useEffect(() => {
        const fetchOccupiedSeats = async () => {
            try {
                const response = await axios.get(`${URL_BACK}/occupiedSeats/${idMovieTheater}`);
                setOccupiedSeats(response.data);
            } catch (error) {
                console.error("Error al obtener sillas ocupadas:", error);
            }
        };
        
        fetchOccupiedSeats();
    }, [idMovieTheater]);

    useEffect(() => {
        onSeatsSelected(selectedSeats);
    }, [selectedSeats, onSeatsSelected]);

    return (
        <div className="container-fluid seatStructure">
            <center>
                <h4 className="screenTitle">Pantalla de Cine</h4>
                <div className="screen"></div>
                <p>asientos seleccionados: {selectedSeats.join(' - ')}</p>
                <table className="seatsTable">
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((seat, seatIndex) => (
                                    <td key={seatIndex} style={{ padding: '5px' }}>
                                        <div
                                            className={`seat ${occupiedSeats.includes(seat) ? "occupied" : ""} ${selectedSeats.includes(seat) ? "selected" : ""}`}
                                            onClick={() => seat && !occupiedSeats.includes(seat) && updateSelectedSeats(seat)}
                                            data-seat={`Fila ${String.fromCharCode(65 + rowIndex)}`}
                                        >
                                            {seat ? (
                                                <img className="silla"
                                                    src={
                                                        occupiedSeats.includes(seat) ? ocupado : 
                                                        selectedSeats.includes(seat) ? seleccionado : 
                                                        disponible
                                                    }
                                                    width={35}
                                                    alt={seat}
                                                />
                                            ) : (
                                                <div className="empty-seat"></div>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Chair;