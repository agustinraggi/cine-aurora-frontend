import React, { useState, useEffect } from "react";


function Sala({ movieFunctions, onDateSelect, onTimeSelect, onFormatSelect, onLanguageSelect }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedTypeOfFunction, setSelectedTypeOfFunction] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [formats, setFormats] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (selectedDate) {
            const times = movieFunctions.filter(func => func.date === selectedDate);
            setAvailableTimes(times);

            // Get unique formats and languages for the selected date
            const uniqueFormats = Array.from(new Set(times.map(func => func.typeOfFunction)));
            const uniqueLanguages = Array.from(new Set(times.map(func => func.language)));

            setFormats(uniqueFormats);
            setLanguages(uniqueLanguages);
        } else {
            setAvailableTimes([]);
            setFormats([]);
            setLanguages([]);
        }
    }, [selectedDate, movieFunctions]);

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        setSelectedTime("");
        setSelectedTypeOfFunction("");
        setSelectedLanguage("");
        onDateSelect(date);
        setError("");
    };

    const handleTimeSelection = (func) => {
        setSelectedTime(func.time);
        setSelectedTypeOfFunction(func.typeOfFunction);
        setSelectedLanguage(func.language);
        onTimeSelect(func);
        setError("");
    };

    const handleFormatChange = (event) => {
        const typeOfFunction = event.target.value;
        setSelectedTypeOfFunction(typeOfFunction);
        onFormatSelect(typeOfFunction);
        setError("");
    };

    const handleLanguageChange = (event) => {
        const language = event.target.value;
        setSelectedLanguage(language);
        onLanguageSelect(language);
        setError("");
    };

    return (
        <div className="sala-container">
            <div className="form-group">
                <label htmlFor="dateSelect">Selecciona una fecha:</label>
                <select id="dateSelect" value={selectedDate} onChange={handleDateChange}>
                    <option value="">Selecciona una fecha</option>
                    {Array.from(new Set(movieFunctions.map(func => func.date)))
                        .sort()
                        .map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                </select>
            </div>

            {selectedDate && (
                <>
                    <div className="form-group">
                        <label htmlFor="timeSelect">Selecciona una hora:</label>
                        <select id="timeSelect" value={selectedTime} onChange={(e) => handleTimeSelection(movieFunctions.find(func => func.time === e.target.value))}>
                            <option value="">Selecciona una hora</option>
                            {availableTimes.map(func => (
                                <option key={func.time} value={func.time}>{func.time}</option>
                            ))}
                        </select>
                    </div>

                    {selectedTime && (
                        <>
                            <div className="form-group">
                                <label htmlFor="formatSelect">Selecciona un formato:</label>
                                <select id="formatSelect" value={selectedTypeOfFunction} onChange={handleFormatChange}>
                                    <option value="">Selecciona un formato</option>
                                    {formats.map(typeOfFunction => (
                                        <option key={typeOfFunction} value={typeOfFunction}>{typeOfFunction}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="languageSelect">Selecciona un idioma:</label>
                                <select id="languageSelect" value={selectedLanguage} onChange={handleLanguageChange}>
                                    <option value="">Selecciona un idioma</option>
                                    {languages.map(language => (
                                        <option key={language} value={language}>{language}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                </>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Sala;
