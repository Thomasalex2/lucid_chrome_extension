import { useState, useEffect } from "react"
import { saveAs } from 'file-saver'
import './stylesheets/styles.css';

import { MainSection } from "./components/main-section"
import { WeatherComponent } from "./components/weather-section";
import { VocabularyComponent } from "./components/vocabulary-section";
import { QuoteComponent } from "./components/quote-section";



function App() {

    const [bgImage, setBgImage] = useState("");


    return (
        <div className="App">
            <section className="center-page">
                <MainSection/>
            </section>

            <section className="weather-section">
                {<WeatherComponent />}
            </section>

            <section className="quote-section">
                <QuoteComponent />
            </section>
            
            <section className="vocab-section">
                <VocabularyComponent />
            </section>
        </div>
    );
}

export default App;
