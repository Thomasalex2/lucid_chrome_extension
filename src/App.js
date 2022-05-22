import './stylesheets/styles.css';

import { MainSection } from "./components/main-section";
import { TaskComponent } from "./components/task-section";
import { WeatherComponent } from "./components/weather-section";
import { VocabularyComponent } from "./components/vocabulary-section";
import { QuoteComponent } from "./components/quote-section";
import { SettingsComponent } from "./components/settings-section";
import { BackgroundImageLoader } from "./components/background-image";

import { useUserPreferences } from "./contexts/user-pref-context";



function App() {

    const { showSettingsPage, userSettingsPage, userPreferences } = useUserPreferences();

    if (showSettingsPage === true) {
        return (
            userSettingsPage()
        );
    } else {
        if (userPreferences.showImage) {
            const bgImage = BackgroundImageLoader();
            console.log("Changing to Random Image");
            document.body.style.cssText = `
                background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;`;
        } else {
            console.log("Changing to Gradient")
            document.body.style.cssText = `
                background: linear-gradient(-45deg, #e859da, #ee7752, #e73c7e, #23a6d5, #23d5ab, #23d56d);
                background-size: 400% 400%;
                animation: gradient 15s ease infinite;`;
        }

        return (
            <div className="App">
                <section className="center-page">
                    <MainSection />
                    <TaskComponent />
                </section>
                
                <section className="weather-section">
                    {userPreferences.showWeather && <WeatherComponent />}
                </section>

                <section className="quote-section">
                    {userPreferences.showQuote && <QuoteComponent />}
                </section>

                <section className="vocab-section">
                    {userPreferences.showVocab && <VocabularyComponent />}
                </section>

                <section className="settings-section">
                    <SettingsComponent />
                </section>
            </div>
        );
    }

}

export default App;
