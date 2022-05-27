import { useState, useEffect } from "react"
import { urls } from "../data_sources"

export const BackgroundImageLoader = () => {

    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        async function getBgImage() {
            const response = await fetch(`${urls.imageApiUrl}`);
            const imageBlob = await response.blob()
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
                const base64data = reader.result;
                setBackgroundImage(base64data);
                console.log("Retrieved Background Image");
            }
        }
        getBgImage()
    }, [])
    return backgroundImage;
}