import React from "react";
import Card from "../components/cards.jsx";
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import image3 from "../assets/image3.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.png"
import image7 from "../assets/image7.png"
import { LuImagePlus } from "react-icons/lu";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

function Customize(){
    const {serverURL,userData, setUserData,frontendImage, setFrontendImage,
            backendImage, setBackendImage, selectedImage, setSelectedImage} = React.useContext(UserDataContext);
            const navigate = useNavigate();

    const inputImage = React.useRef(null)

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
        console.log("Selected file:", file);
    }
    
    return(
        <div className='w -full h-[100vh] bg-gradient-to-t from-[black] to-[#020253] flex justify-center items-center flex-col gap-[20px]'>
            <RiArrowGoBackFill className='text-white text-2xl absolute top-5 left-5 cursor-pointer' onClick={() => navigate("/")} />
            <h1 className='text-white text-2xl p-[20px] gap-[20px] '>Customize Your <span className='text-blue-200'>Assistant Image</span> </h1>
            <div className='flex flex-wrap justify-center items-center gap-[20px]'>
            <Card image={image1}/>
            <Card image={image2}/>
            <Card image={image3}/> 
            <Card image={image4}/>
            <Card image={image5}/>
            <Card image={image6}/>
            <Card image={image7}/>
            <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 hover:border-white rounded-2xl overflow-hidden shadow-lg shadow-black relative cursor-pointer hover:scale-[1.05] hover:shadow-blue-950 transition-all duration-300 ease-in-out flex items-center justify-center ${selectedImage == "input" ? "border-4 border-white shadow-blue-950" : null}`} required onClick={() => {
                inputImage.current.click()
                setSelectedImage("input")
                
            }}>
                {!frontendImage && <LuImagePlus className='w-25px h-25px text-white flex items-center justify-center' />}
                {frontendImage && <img src={frontendImage} className='w-full h-full object-cover' />}
            </div>
            <input type="file" accept="image/*" hidden ref={inputImage} onChange={handleImage}/>
            </div>
            {selectedImage && <button className='bg-pink-200 text-black gap-[20px] px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer' onClick={() => navigate("/Customize2")}>
                Add Image
            </button>}

        </div>
    )
}
export default Customize;