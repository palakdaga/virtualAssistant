import axios from "axios";
import React from "react";
export const UserDataContext= React.createContext();

function UserContext({children}) {
    const serverURL = "http://localhost:8000"
    const [userData, setUserData] = React.useState(null)
        const [frontendImage, setFrontendImage] = React.useState(null)
        const [backendImage, setBackendImage] = React.useState(null)
        const [selectedImage, setSelectedImage] = React.useState(null)

const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/user/current`, {withCredentials: true })
            setUserData(result.data);
            console.log("Current user data:", result.data);
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    }

    const getGeminiResponse = async (command) => {
    try {
        const result = await axios.post(`${serverURL}/api/user/asktoassistant`, { command }, 
            { withCredentials: true });
        return result.data;
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
    }
}

        React.useEffect(() => {
        handleCurrentUser()
    }, [])


    const value = {
            serverURL,userData, setUserData,frontendImage, setFrontendImage,
            backendImage, setBackendImage, selectedImage, setSelectedImage,getGeminiResponse
        }
    return(

        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;