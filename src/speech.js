import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./SpeechToText.css";

const SpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [language, setLanguage] = useState('ru-RU');

    const handleStart = () => {
        setIsListening(true);
        SpeechRecognition.startListening({ continuous: true, language });
    };

    const handleStop = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    const handleClear = () => {
        resetTranscript();
    };

    return (
        <div className="speech-to-text-container">
            <h2>Распознавание речи в текст</h2>
            <div className="language-container">
                <label htmlFor="language">Язык: </label>
                <select id="language" onChange={(e) => setLanguage(e.target.value)}>
                    <option value="ru-RU">Русский</option>
                    <option value="en-US">Английский (США)</option>
                    <option value="es-ES">Испанский (Испания)</option>
                    <option value="fr-FR">Французский (Франция)</option>
                </select>
            </div>
            <div className="buttons-container">
                <button className="btn" onClick={handleStart} disabled={isListening}>
                    Начать
                </button>
                <button className="btn" onClick={handleStop} disabled={!isListening}>
                    Остановить
                </button>
                <button className="btn" onClick={handleClear} disabled={!transcript}>
                    Очистить
                </button>
            </div>
            <p>{transcript}</p>
        </div>
    );
};

export default SpeechToText;
