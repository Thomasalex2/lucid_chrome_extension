import './stylesheets/styles.css';

import { MainSection } from "./components/main-section";
import { TaskComponent } from "./components/task-section";
import { WeatherComponent } from "./components/weather-section";
import { VocabularyComponent } from "./components/vocabulary-section";
import { QuoteComponent } from "./components/quote-section";
import { SettingsComponent } from "./components/settings-section";

import { useUserPreferences } from "./contexts/user-pref-context";



function App() {

    const { showSettingsPage, userSettingsPage, userPreferences } = useUserPreferences();

    if (showSettingsPage === true) {
        return (
            userSettingsPage()
        );
    } else {
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
