import { useState, useEffect } from "react"
// import { imageUrl, imageAccessToken, weatherUrl, weatherAccessToken, weatherLinkUrl, userConfigs } from "./configs"
import { urls, apiKeys, userConfigs } from "./configs"
import { saveAs } from 'file-saver'
import './stylesheets/styles.css';



function App() {

    const [bgImage, setBgImage] = useState("");
    const [currentDate, setCurrentDate] = useState("")
    const [currentTime, setCurrentTime] = useState("");
    const [greeting, setGreeting] = useState("");
    const [coordinates, setCoordinates] = useState({ latitude: -1, longitude: -1 });
    const [weather, setWeather] = useState({});
    const [quote, setQuote] = useState({});
    const [vocab, setVocab] = useState({});

    const getCurrentTime = () => {
        setCurrentTime(() => new Date().toLocaleTimeString('en-US', {
            hour12: true,
            hour: "numeric",
            minute: "numeric"
        }));
    }

    const getCurrentDate = () => {
        setCurrentDate(() => new Date().toLocaleDateString("en-gb", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        }));
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 4) {
            setGreeting("Time to sleep");
        } else if (hour >= 4 && hour < 12) {
            setGreeting("Good Morning");
        } else if (hour >= 12 && hour < 15) {
            setGreeting("Good Afternoon");
        } else if (hour >= 15 && hour < 24) {
            setGreeting("Good Evening");
        }
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setCoordinates({ latitude: -1, longitude: -1 });
            console.log("Unable to determine location");
        }
    }


    const showPosition = (position) => {
        setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        console.log("Coordinates: ", position.coords.latitude, position.coords.longitude);
    }

    const getQuote = () => {
        const Quotes = require("randomquote-api");
        const randomQuote = Quotes.randomQuote();
        setQuote(randomQuote);
    }

    const getVocab = () => {
        const vocabList = require("./word_list/words.json");
        const randomVocab = vocabList[Math.floor(Math.random() * vocabList.length)];
        setVocab(randomVocab);
    }

    setInterval(getCurrentTime, 1000);
    setInterval(getCurrentDate, 1000);
    setInterval(getGreeting, 1000);

    useEffect(() => getLocation(), []);

    useEffect(() => {
        async function getWeather() {
            const res = await (await fetch(`${urls.weatherApiUrl}lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=${userConfigs.units}&${apiKeys.weatherAccessToken}`)).json();
            const location = res.name;
            const currentTemperature = res.main.temp;
            const currentHumidity = res.main.humidity;
            const description = res.weather[0].main;
            const icon = res.weather[0].icon;
            const id = res.id;
            setWeather({ location: location, temperature: currentTemperature, humidity: currentHumidity, description: description, icon: icon, id: id });
            console.log("Requesting Weather")
        }
        getWeather()
    }, [coordinates.latitude, coordinates.longitude, currentTime])

    useEffect(() => getQuote(), [])
    useEffect(() => getVocab(), [])

    // useEffect(() => {
    //   async function getBgImage() {
    //     const res = await (await fetch(`${urls.imageApiUrl}?${apiKeys.imageAccessToken}`)).json();
    //     const imgUrl = res.urls.raw + "&w=1920&h=1080&dpr=2";
    //     const description = res.description;
    //     console.log(res);
    //     console.log(imgUrl, description);
    //   }
    //   getBgImage()
    // }, [])

    return (
        <div className="App">
            <section className="center-page">
                <h3 className="date-string">{currentDate}</h3>
                <h1 className="time-string">{currentTime}</h1>
                <h2> {greeting}, {userConfigs.name} </h2>
                <h3> What is your focus today?</h3>
                <input className="focus-input" type="text" />
            </section>

            <section className="weather-section" tooltip={weather.description}>
                <a href={`${urls.weatherUserUrl}${weather.id}`} target="_blank" rel="noreferrer">
                    <div className="weather-stats">
                        <img className="weather-icon" src={`/icons/${weather.icon}.png`} alt="weather icon" />
                        <div className="weather-info">
                            <p className="weather-text">{weather.temperature}° {userConfigs.units === "metric" ? "C" : "F"} | {weather.humidity}%</p>
                            <p className="weather-text location">{weather.location}</p>
                            <span className="weather-text tooltip-text">{weather.description}</span>
                        </div>
                    </div>
                </a>
            </section>

            <section className="quote-section">
                <p className="quote-text"><i>{quote.quote}</i></p>
                <small className="quote-author">-{quote.author}</small><br />
            </section>

            <section className="vocab-section">
                <a className="vocab-text" href={`${urls.dictionaryUserUrl}${vocab.word}`} target="_blank" rel="noreferrer">
                    <small className="vocab-word">{vocab.word}:&nbsp;&nbsp;</small>
                    <small className="vocab-definition">{vocab.meaning}</small><br/>
                    <small className="vocab-example"><i><b>Usage:&nbsp;</b>{vocab.sentence}</i></small>
                </a>
            </section>
        </div>
    );
}

export default App;
