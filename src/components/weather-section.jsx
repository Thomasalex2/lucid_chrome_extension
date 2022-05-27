import { useState, useEffect } from "react";
import { urls } from "../data_sources"

export const WeatherComponent = () => {

    const [coordinates, setCoordinates] = useState({ latitude: -10, longitude: -10 });
    const [weather, setWeather] = useState({});
    const [showWeather, setShowWeather] = useState(true);

    const showPosition = (position) => {
        setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        console.log("Coordinates: ", position.coords.latitude, position.coords.longitude);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setCoordinates({ latitude: -1, longitude: -1 });
            console.log("Unable to determine location");
        }
    }, []);

    useEffect(() => {
        async function getWeather() {
            console.log("Requesting Weather")
            try {
                const res = await (await fetch(`${urls.weatherApiUrl}lat=${coordinates.latitude}&lon=${coordinates.longitude}`)).json();
                // console.log(`${ urls.weatherApiUrl }lat = ${ coordinates.latitude } & lon=${ coordinates.longitude }`)
                // console.log(res);
                const location = res.name;
                const currentTemperature = res.main.temp;
                const currentHumidity = res.main.humidity;
                const description = res.weather[0].main;
                const icon = res.weather[0].icon;
                const id = res.id;
                setWeather({ location: location, temperature: currentTemperature, humidity: currentHumidity, description: description, icon: icon, id: id });
                setShowWeather(true);
            } catch (error) {
                console.log("Error: ", error);
                setShowWeather(false);
            }

        }
        getWeather()
        const weatherInterval = setInterval(() => getWeather(), 10000);
        return () => clearInterval(weatherInterval);
    }, [coordinates.latitude, coordinates.longitude]);

    return (
        <>
            {showWeather &&
                <a href={`${urls.weatherUserUrl}${weather.id}`} target="_blank" rel="noreferrer">
                    <div className="weather-stats">
                        <img className="weather-icon" src={`./icons/${weather.icon}.png`} alt="weather icon" />
                        <div className="weather-info">
                            <p className="weather-text">{parseInt(weather.temperature)}°C | {weather.humidity}%</p>
                            <p className="weather-text location">{weather.location}</p>
                            <span className="weather-text tooltip-text">{weather.description}</span>
                        </div>
                    </div>
                </a>
            }
        </>
    )
}