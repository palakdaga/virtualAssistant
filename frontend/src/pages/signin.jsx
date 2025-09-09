
import React from 'react';
import bg from '../assets/authBg.png';
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserDataContext } from '../context/UserContext.jsx';

function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
     const {serverURL, setUserData} = React.useContext(UserDataContext);
    const navigate = useNavigate(); // react-router-dom
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
   const [error, setError] = React.useState('');
   const [loading, setLoading] = React.useState(false);

    const handleSignIn = async (e)=>{
        e.preventDefault();  // Prevent page refresh on form submission
        setError(''); // Reset error state
        setLoading(true); // Set loading state
        // Trim input values and validate

        if ( !email.trim() || !password.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        

        try{
            
            let result = await axios.post(
                `${serverURL}/api/auth/signin`,
                { email, password },
                {
                    withCredentials: true // Include cookies in the request
                }
            )
            setLoading(false); // Reset loading state
            setUserData(result.data)
            Navigate("/")

        }catch (error) {
        setLoading(false);
        setUserData(null);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data.message || "An unexpected error occurred.";
            alert(`Signin failed: ${errorMessage}`);
            setError(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            alert("No response received. Please check your network connection.");
            setError("Network Error: No response received.");
        } else {
            // Something happened in setting up the request that triggered an Error
            alert("An unknown error occurred. Please try again.");
            setError("Unknown error.");
        }
    }  
    }
  return (
     <div className='w-full h-[100vh] bg-cover bg-center flex justify-center items-center ' style={{ backgroundImage: `url(${bg})` }}>
       <form onSubmit={handleSignIn} className='w-[90%] h-[600px] max-w-[500px] bg-[#00000060] backdrop-blur flex flex-col justify-center items-center gap-[10px] rounded-[20px] relative shadow-lg shadow-black' >
        <h2 className='text-white text-2xl mb-6'>Login to <span className=' text-blue-500'>Virtual Assistant</span></h2>

        <input type="email" placeholder="Email" className="px-[20px] mb-4 p-2 rounded-[30px]  w-[80%] text-white outline-none bg-transparent border-2 border-white placeholder-grey " required onChange={(e)=>setEmail(e.target.value)} value={email} />

        <div className="px-[20px] mb-4 p-2 rounded-[30px]  w-[80%] text-white outline-none bg-transparent border-2 border-white placeholder-grey relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full bg-transparent outline-none text-white " required onChange={(e)=>setPassword(e.target.value)} value={password} />
            {!showPassword && <MdOutlineRemoveRedEye  className="absolute right-4 top-3 text-white cursor-pointer text-[white]" onClick={() => setShowPassword(true)} />
            }
            {showPassword && < IoEyeOff className="absolute right-4 top-3 text-white cursor-pointer text-[white]" onClick={() => setShowPassword(false)} />
            }
        </div>
        {error && <p className='text-red-500'>*{error}</p>}

        <button type="submit" className="bg-white text-black  px-4 py-2 rounded-[50px]"  disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
        <div className='absolute bottom-20 text-white'>
            <p>Want to create a new account! <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
        </div>
      </form>
       
    </div>
  )
}

export default SignIn;
