import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { BallTriangle } from "react-loader-spinner";
import "./App.css";
import SpeechRecognitionComponent from "./speech";

function App() {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recognizedText, setRecognizedText] = useState("");
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [isRecognized, setIsRecognized] = useState(false);
    const [previousImageUrl, setPreviousImageUrl] = useState("");
    const [previousRecognizedText, setPreviousRecognizedText] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setRecognizedText("");
        setIsRecognized(false);
    };

    const handleRecognition = async () => {
        setIsRecognizing(true);
        setIsLoading(true);
        const { data: { text } } = await Tesseract.recognize(imageUrl, 'rus');
        setRecognizedText(text);
        setIsLoading(false);
        setIsRecognizing(false);
        setIsRecognized(true);
    };

    const handleReset = () => {
        setPreviousImageUrl(imageUrl);
        setPreviousRecognizedText(recognizedText);
        setImageUrl("");
        setRecognizedText("");
        setIsLoading(false);
        setIsRecognized(false);
    };

    const handleBack = () => {
        setImageUrl(previousImageUrl);
        setRecognizedText(previousRecognizedText);
        setPreviousImageUrl("");
        setPreviousRecognizedText("");
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="App">
            <header className="App-header">
                <SpeechRecognitionComponent />
                <h1 className={isRecognizing ? "image hidden" : "image"}>
                    Распознавание текста на фото
                </h1>
                <div className="container">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className={isRecognizing ? "image hidden" : "image"}
                        />
                    ) : (
                        <div className="uploadText">
                            <p>Загрузите фото, я распознаю и верну текст</p>
                            <button onClick={handleFileInputClick}>Выбрать файл</button>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>
                    )}
                    {isLoading && (
                        <div className="loader">
                            <BallTriangle color="#00BFFF" height={100} width={100} />
                        </div>
                    )}
                    {recognizedText && (
                        <div
                            className={isRecognizing ? "recognizedText hidden" : "recognizedText"}
                        >
                            <p>{recognizedText}</p>
                            <button onClick={handleReset}>Загрузить новый файл</button>
                        </div>
                    )}
                    {imageUrl && !recognizedText && !isLoading && (
                        <button onClick={handleRecognition}>
                            Распознать текст
                        </button>
                    )}
                    {previousImageUrl &&
                        previousRecognizedText &&
                        !isRecognizing && (
                            <button onClick={handleBack}>Назад</button>
                        )}
                </div>
            </header>

        </div>


    );
}

export default App;
