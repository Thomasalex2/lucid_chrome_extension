import { useState, useEffect } from "react";
import { urls, apiKeys, userConfigs } from "../configs"

export const WeatherComponent = () => {
    
    const [coordinates, setCoordinates] = useState({ latitude: -1, longitude: -1 });
    const [weather, setWeather] = useState({});

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
                const res = await (await fetch(`${urls.weatherApiUrl}lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=${userConfigs.units}&${apiKeys.weatherAccessToken}`)).json();
                console.log(res);
                const location = res.name;
                const currentTemperature = res.main.temp;
                const currentHumidity = res.main.humidity;
                const description = res.weather[0].main;
                const icon = res.weather[0].icon;
                const id = res.id;
                setWeather({ location: location, temperature: currentTemperature, humidity: currentHumidity, description: description, icon: icon, id: id });
            } catch (error) {
                console.log("Error: ", error);
            }

        }
        getWeather()
    }, [coordinates.latitude, coordinates.longitude])

    return (
        <a href={`${urls.weatherUserUrl}${weather.id}`} target="_blank" rel="noreferrer">
            <div className="weather-stats">
                <img className="weather-icon" src={`./icons/${weather.icon}.png`} alt="weather icon" />
                <div className="weather-info">
                    <p className="weather-text">{weather.temperature}° {userConfigs.units === "metric" ? "C" : "F"} | {weather.humidity}%</p>
                    <p className="weather-text location">{weather.location}</p>
                    <span className="weather-text tooltip-text">{weather.description}</span>
                </div>
            </div>
        </a>
    )
}