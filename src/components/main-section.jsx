import { useState } from "react"
import { useUserPreferences } from "../contexts/user-pref-context";

export const MainSection = () => {

    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString("en-gb", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    }));
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', {
        hour12: true,
        hour: "numeric",
        minute: "numeric"
    }));
    const [greeting, setGreeting] = useState("... ");
    const { userPreferences } = useUserPreferences()

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
            <h2> {greeting}, {userPreferences.name} </h2>
        </>
    )
}