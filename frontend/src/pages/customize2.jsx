import React from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function Customize2() {
    const { userData, backendImage , selectedImage , setUserData , serverURL } = React.useContext(UserDataContext);
    const [assistantName, setAssistantName] = React.useState(userData?.assistantName || '');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleUpdateAssistant = async () => {
        setLoading(true);
        try{
            let formData = new FormData();
            formData.append("assistantName", assistantName);
            if(backendImage) {
                formData.append("assistantImage", backendImage);
            }else {
                formData.append("imageUrl", selectedImage);
            }
            const result = await axios.post(`${serverURL}/api/user/update`, formData, { withCredentials: true });
            console.log("Update successful:", result.data);
            setLoading(false);
            setUserData(result.data);
            navigate("/");

        }catch(error){
            setLoading(false);
            console.error("Error updating assistant:", error);
        }
    }
   
    return(
        
            <div className='w -full h-[100vh] bg-gradient-to-t from-[black] to-[#020253] flex justify-center items-center flex-col gap-[20px]'>
            <RiArrowGoBackFill className='text-white text-2xl absolute top-5 left-5 cursor-pointer' onClick={() => navigate(-1)} />
            <h1 className='text-white text-2xl p-[20px] gap-[20px] '>Customize Your <span className='text-blue-200'>Assistant Name</span> </h1>
            <input type="text" placeholder="eg. jhavis" className="px-[20px] mb-4 p-2 rounded-[30px] max-w-[300px] w-[80%] text-white outline-none
             bg-transparent border-2 border-white placeholder-grey "
             required 
             onChange={(e)=>setAssistantName(e.target.value)} value={assistantName} />
            {assistantName && <button className='bg-pink-200 text-black gap-[20px] px-4 py-2 rounded-md hover:bg-green-600 hover:text-white
             transition-all duration-300 ease-in-out cursor-pointer'
             disabled={loading}
              onClick={() => {
                
                userData.assistantName = assistantName;
                handleUpdateAssistant()
            }}>
                {loading ? "Creating..." : "Finally create Your Assistant"}
            </button>}
        </div>
    )
}
export default Customize2