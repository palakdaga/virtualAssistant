import React, { useEffect } from 'react';
import { UserDataContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import whileGif from '../assets/while.gif';
import userGif from '../assets/user.gif';
export default function Home() {
    const { userData, setUserData, serverURL,getGeminiResponse } = React.useContext(UserDataContext);
    const navigate = useNavigate();
    const [listening, setListening] = React.useState(false);
    const [userText, setUserText] = React.useState("");
    const [aiText, setAiText] = React.useState("");
    const isSpeakingRef = React.useRef(false);
    const recognitionRef = React.useRef(null);
    const synth = window.speechSynthesis;
    const handleLogout = async ()=>{
        try{
            const result = await axios.get(`${serverURL}/api/auth/logout`, { withCredentials: true });
            navigate("/signin");
            setUserData(null);
            console.log("Logout successful:", result.data);
        }catch(error){
            console.error("Error during logout:", error);
            setUserData(null);
        }
    }
const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.pitch = 1;
    speech.rate = 1;
    isSpeakingRef.current = true;
    const startRecognition = () => {
        try {
            recognitionRef.current?.start();
            setListening(true);
            console.log("Voice recognition started");
        } catch (error) {
            if(!error.message.includes('start')) {
                console.error("Error starting voice recognition:", error);
            }
        }
    };

    speech.onend = () => {
        isSpeakingRef.current = false;
        startRecognition(); // Restart recognition after speaking
    };
    synth.cancel(); // Stop any ongoing speech before starting new one
    synth.speak(speech);
}

const handleCommand = async (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if(type === "google-search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "youtube-search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');// open in new tab
    }
    if(type === "get-time") {
        const now = new Date();
        speak(`The current time is ${now.toLocaleTimeString()}`);
    }
    if(type === "get-date") {
        const now = new Date();
        speak(`Today's date is ${now.toLocaleDateString()}`);
    }
    if(type === "get-day") {
        const now = new Date();
        speak(`Today is ${now.toLocaleDateString('en-US', { weekday: 'long' })}`);
    }
    if(type === "get-month") {
        const now = new Date();
        speak(`This month is ${now.toLocaleDateString('en-US', { month: 'long' })}`);
    }

    if(type === "quote") {
        speak(`Here is a quote for you: ${response}`);
    }
    // if(type === "weather") {
    //     const query = encodeURIComponent(userInput);
    //     window.open(`https://www.weather.com/weather/today/l/${query}`, '_blank');// open in new tab
    // }
    if(type === "wikipedia-search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://en.wikipedia.org/wiki/${query}`, '_blank');// open in new tab
    }
    if(type === "calculator-open") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "instagram-search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.instagram.com/explore/tags/${query}/`, '_blank');// open in new tab
    }
    if(type === "twitter-search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://twitter.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "facebook-search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.facebook.com/search/top?q=${query}`, '_blank');// open in new tab
    }
    if(type === "linkedin-search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.linkedin.com/search/results/people/?keywords=${query}`, '_blank');// open in new tab
    }
    if(type === "get-translation") {
        const query = encodeURIComponent(userInput);
        window.open(`https://translate.google.com/?sl=auto&tl=en&text=${query}`, '_blank');// open in new tab
    }
    if(type === "get-definition") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.dictionary.com/browse/${query}`, '_blank');// open in new tab
    }
    if(type === "get-conversion") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-calculation") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-sports-score") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.espn.com/search/results?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-movie-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.imdb.com/find?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-book-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.goodreads.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-music-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://music.apple.com/search?term=${query}`, '_blank');// open in new tab
    }
    if(type === "get-food-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.yelp.com/search?find_desc=${query}`, '_blank');// open in new tab
    }
    if(type === "get-travel-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.tripadvisor.com/Search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-health-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.webmd.com/search/search_results/default.aspx?query=${query}`, '_blank');// open in new tab
    }
    if(type === "get-education-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.khanacademy.org/search?query=${query}`, '_blank');// open in new tab
    }
    if(type === "get-technology-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.techopedia.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-science-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.sciencedirect.com/search?qs=${query}`, '_blank');// open in new tab
    }
    if(type === "get-history-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.history.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-geography-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.nationalgeographic.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-art-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.artsy.net/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-culture-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.culturalheritage.org/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-language-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.linguee.com/english-${query}/search?source=auto&query=${query}`, '_blank');// open in new tab
    }
    if(type === "get-philosophy-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://plato.stanford.edu/search/search.cgi?query=${query}`, '_blank');// open in new tab
    }
    if(type === "get-religion-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.britannica.com/search?query=${query}`, '_blank');// open in new tab
    }
    if(type === "get-politics-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.politico.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-economics-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.economist.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-environment-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.nature.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-society-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.sociology.org/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-law-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.law.cornell.edu/wex/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-psychology-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.apa.org/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-sociology-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.sociology.org/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-anthropology-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.anthrobase.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-archaeology-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.archaeology.org/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-linguistics-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.linguisticsociety.org/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-mathematics-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.mathsisfun.com/search.html?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-statistics-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.statisticshowto.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-computer-science-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.computerscience.org/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-engineering-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.engineering.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-business-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.businessnewsdaily.com/search?q=${query}`, '_blank');// open in new tab
    }
    if(type === "get-management-info") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.managementstudyguide.com/search?q=${query}`, '_blank');// open in new tab
    }

}

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true,
        recognition.lang = 'en-US';

        recognitionRef.current = recognition;
        const isRecongnizingRef = {current:false};

        const safeRecognition = () => {
            if(!isSpeakingRef.current && !isRecongnizingRef.current) {
                try{
                    recognition.start();
                    console.log("Voice recognition started");
                }
                catch(error) {
                    console.error("Error starting voice recognition:", error);
                }
            }
        }

        recognition.onstart = () => {
            isRecongnizingRef.current = true;
            setListening(true);
            console.log("Voice recognition started");
        }

        recognition.onend = () => {
            isRecongnizingRef.current = false;
            setListening(false);
            console.log("Voice recognition ended");

            if(!isSpeakingRef.current) {
                setTimeout(() => {
                    safeRecognition();
                }, 1000);
            }

        }

        recognition.onerror = (event) => {
            console.error("Voice recognition error:", event.error);
            if(event.error !== 'aborted' && !isRecongnizingRef.current) {
                setTimeout(() => {
                    safeRecognition();
                }, 1000);
            }
        }

        recognition.onresult=async (e)=>{
            const transcript = e.results[e.results.length-1][0].transcript.trim();
            if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
                setAiText("");
                setUserText(transcript);
                recognition.stop();
                isRecongnizingRef.current = false;
                setListening(false);
                console.log("Voice recognition stopped");
               const data = await getGeminiResponse(transcript);
               console.log("Gemini response:", data);
               handleCommand(data);
               setAiText(data.response);
               setUserText("");
                
            }
        }
        
        const fallBack= setInterval(() => {
            if(!isSpeakingRef.current && !isRecongnizingRef.current) {
                safeRecognition();
            }
        }, 5000);
        safeRecognition();
        return () => {
            recognition.stop();
            setListening(false);
            isRecongnizingRef.current = false;
            clearInterval(fallBack);
            console.log("Voice recognition stopped and interval cleared");
        }

    }, [])

    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020253] flex justify-center 
        items-center flex-col gap-[20px]'>
                <button type="submit" className="bg-white text-black hover:scale-105 px-4 py-2 absolute cursor-pointer rounded-[50px] top-5 right-5"
                onClick={handleLogout}>
                log out</button>
                <button type="submit" className="bg-white text-black hover:scale-105 px-4 py-2 cursor-pointer absolute rounded-[50px] top-[80px] right-5 px-4 py-2"
                onClick={() => navigate("/customize")}>
                Customize your assistant</button>
               
            <div className='w-[200px] h-[300px] bg-[#030326] rounded-[20px] flex items-center justify-center overflow-hidden shadow-lg shadow-black'>
                <img src={userData?.assistantImage} alt={userData?.assistantName} className='h-full object-cover' />
            </div>
            <h1 className='text-white text-2xl font-semibold'>I'm {userData?.assistantName}!</h1>
            {!whileGif && <img src={userGif} alt="User" className='w-[200px] ' />}
            {whileGif && <img src={whileGif} alt="While" className='w-[200px]' />}

        </div>
    );
}
