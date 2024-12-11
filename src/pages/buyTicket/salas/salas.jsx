import React, { useState, useEffect } from "react";
import "./sala.css";

function Sala({ movieFunctions, onDateSelect, onTimeSelect }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedTypeOfFunction, setSelectedTypeOfFunction] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);

    const today = new Date();
    const todayString = today.getDate().toString().padStart(2, '0') + "-" + 
                        (today.getMonth() + 1).toString().padStart(2, '0') + "-" + 
                        today.getFullYear();
    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        if (selectedDate) {
            const times = movieFunctions.filter(func => func.date >= todayString && func.date === selectedDate);
            setAvailableTimes(times);
        } else {
            const futureFunctions = movieFunctions.filter(func => func.date >= todayString);
            setAvailableTimes(futureFunctions);
        }
    }, [selectedDate, movieFunctions]);

    useEffect(() => {
        if (selectedDate && selectedTime) {
            const selectedFunc = movieFunctions.find(func => func.date === selectedDate && func.time === selectedTime);
            if (selectedFunc) {
                setSelectedTypeOfFunction(selectedFunc.typeOfFunction);
                setSelectedLanguage(selectedFunc.language);
            }
        } else {
            setSelectedTypeOfFunction("");
            setSelectedLanguage("");
        }
    }, [selectedTime, selectedDate, movieFunctions]);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        setSelectedTime("");
        setSelectedTypeOfFunction("");
        setSelectedLanguage("");
        onDateSelect(date);
    };

    const handleTimeSelection = (func) => {
        setSelectedTime(func.time);
        setSelectedTypeOfFunction(func.typeOfFunction);
        setSelectedLanguage(func.language);
        onTimeSelect(func);
    };

    return (
        <div className="salaContainer">
            <div className="formSala">
                <h4 className="titleDataSala">Selecciona una fecha:</h4>
                <div className="btnSala">
                    {Array.from(new Set(movieFunctions.map(func => func.date)))
                        .sort()
                        .filter(date => date >= todayString)
                        .map(date => (
                            <button
                                key={date}
                                className={`dateBtn btnDataSala ${selectedDate === date ? "selectedFech" : ""}`}
                                onClick={() => handleDateSelection(date)}
                            >
                                {formatDate(date)}
                            </button>
                        ))}
                </div>
            </div>
            {selectedDate && (
                <div className="formSala">
                    <h4 className="titleDataSala">Selecciona una hora:</h4>
                    <div className="btnSala">
                        {availableTimes.map(func => (
                            <button
                                key={func.time}
                                className={`timeBtn btnDataSala  ${selectedTime === func.time ? "selectedTime" : ""}`}
                                onClick={() => handleTimeSelection(func)}
                            >
                                {func.time}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {selectedTime && (
                <>
                    <div className="formSala">
                        <h4 className="titleDataSala">Formato:</h4>
                        <div className="btnSala">
                            <button className="formatBtn">{selectedTypeOfFunction}</button>
                        </div>
                        <h4 className="titleDataSala">Idioma:</h4>
                        <div className="btnSala">
                            <button className="languageBtn">{selectedLanguage}</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Sala;
