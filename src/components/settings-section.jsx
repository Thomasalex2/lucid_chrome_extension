import { useUserPreferences } from "../contexts/user-pref-context";

export const SettingsComponent = () => {

    const { setShowSettingsPage } = useUserPreferences();
    
    return (
        <>
            <div className="settings-icon-container">
                <span onClick={() => setShowSettingsPage(true)} className="material-icons settings-icon">settings</span>
            </div>
        </>
    )
}