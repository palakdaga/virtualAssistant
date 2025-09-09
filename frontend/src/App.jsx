import React, { useContext } from "react";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Customize from "./pages/customize.jsx";
import Customize2 from "./pages/customize2.jsx";
import Home from "./pages/Home.jsx";
import { UserDataContext } from "./context/UserContext.jsx";

function App() {
  const {userData, setUserData} = useContext(UserDataContext)
  return (
   <Routes>
    <Route path="/" element={(userData?.assistantImage && userData?.assistantName) ?<Home/> :<Navigate to={"/customize"}/>}/>
     <Route path="/signup" element={!userData?<SignUp/> : <Navigate to={"/"}/>} />
      <Route path="/signin" element={!userData?<SignIn/> : <Navigate to={"/"}/>} />
      <Route path="/Customize" element={userData?<Customize/>:<Navigate to={"/signup"}/>} />
      <Route path="/Customize2" element={userData?<Customize2/>:<Navigate to={"/signup"}/>} />
   </Routes>
  );
}

export default App;
