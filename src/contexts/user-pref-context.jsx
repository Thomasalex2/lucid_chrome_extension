import { useState, useEffect, createContext, useContext } from "react";
import * as yup from 'yup';

const UserPreferencesContext = createContext();

const userSchema = yup.object().shape({
    "name": yup.string().required(),
    "showQuote": yup.bool().required(),
    "showVocab": yup.bool().required(),
    "showWeather": yup.bool().required(),
});

const UserPreferencesProvider = ({ children }) => {
    const initialSettingsState = { "name": "", "showQuote": false, "showVocab": false, "showWeather": false };
    const [userPreferences, setUserPreferences] = useState({});
    const [showSettingsPage, setShowSettingsPage] = useState(false);
    const [inputPref, setInputPref] = useState(initialSettingsState);

    const userSettingsPage = () => {
        return (
            <>
                <div className="settings-page">
                    <h3>User Preferences</h3>
                    <div className="settings-option">
                        <div className="name-container">
                            <h4 className="user-pref-name">Name to be displayed:</h4>
                            <input type="text" placeholder="Enter name" defaultValue={inputPref.name} autoFocus onChange={e => setInputPref({...inputPref, "name": e.target.value}) }/>
                        </div><br />
                        <h4>Select the following preferences:</h4>
                        <div>
                            <input type="checkbox" label="Display Random Quotes" defaultChecked={inputPref.showQuote} onChange={e => setInputPref({ ...inputPref, "showQuote": e.target.checked })} /><span>Display Inspirational Quotes</span>
                        </div><br />
                        <div>
                            <input type="checkbox" label="Display new Vocabulary" defaultChecked={inputPref.showVocab} onChange={e => setInputPref({ ...inputPref, "showVocab": e.target.checked })} /><span>Display new Vocabulary</span>
                        </div><br />
                        <div>
                            <input type="checkbox" label="Display Local Weather" defaultChecked={inputPref.showWeather} onChange={e => setInputPref({ ...inputPref, "showWeather": e.target.checked })}  /><span>Display Local Weather</span>
                        </div><br />
                        <button className="save-btn" onClick={saveNewUserPreferences}>Save Preferences</button>
                    </div>
                </div>
                <footer className="ext-footer">
                    <div className="footer-contents">
                        <p><i>Developed by <b>Thomas Alex</b></i></p>
                        <a href="https://thomasalex.netlify.app/" target="_blank" rel="noreferrer">About</a> &nbsp; | &nbsp;
                        <a href="https://github.com/Thomasalex2/new_tab_chrome_extension" target="_blank" rel="noreferrer">Github</a>
                    </div>
                </footer>
            </>
        )
    }

    useEffect(() => {
        const userPref = JSON.parse(localStorage.getItem("UserPref"));
        console.log("Fetching User settings", userPref)
        userSchema.isValid(userPref)
            .then(valid => {
                const res = valid
                if (res) {
                    setUserPreferences(userPref);
                    setShowSettingsPage(false);
                }
                else {
                    setShowSettingsPage(true);
                }
            })
    },
        [])

    useEffect(() => {
        localStorage.setItem("UserPref", JSON.stringify(userPreferences))
    }, [userPreferences])

    const saveNewUserPreferences = () => {
        const newUserSettings = {
            "name": inputPref.name,
            "showQuote": inputPref.showQuote,
            "showVocab": inputPref.showVocab,
            "showWeather": inputPref.showWeather
        }
        setUserPreferences(() => newUserSettings)
        console.log("Saved new user preferences", newUserSettings);
        setShowSettingsPage(false);
    }

    return (
        <UserPreferencesContext.Provider value={{ userPreferences, showSettingsPage, userSettingsPage, setShowSettingsPage }}>
            {children}
        </UserPreferencesContext.Provider>
    )
}

const useUserPreferences = () => useContext(UserPreferencesContext)

export { UserPreferencesProvider, useUserPreferences };