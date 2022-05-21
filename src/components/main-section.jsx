import { userConfigs } from "../configs"
import { useState } from "react"

export const MainSection = () => {

    const [currentDate, setCurrentDate] = useState("")
    const [currentTime, setCurrentTime] = useState("");
    const [greeting, setGreeting] = useState("");

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
        } else if (hour >= 12 && hour < 16) {
            setGreeting("Good Afternoon");
        } else if (hour >= 16 && hour < 24) {
            setGreeting("Good Evening");
        }
    }

    setInterval(getCurrentTime, 1000);
    setInterval(getCurrentDate, 1000);
    setInterval(getGreeting, 1000);

    return (
        <>
            <h3 className="date-string">{currentDate}</h3>
            <h1 className="time-string">{currentTime}</h1>
            <h2> {greeting}, {userConfigs.name} </h2>
        </>
    )
}