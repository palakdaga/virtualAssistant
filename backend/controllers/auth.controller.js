import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import GenToken from "../config/token.js"

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existEmail = await User.findOne({ email });
    console.log("existEmail:", existEmail);
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password created");

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    console.log("User created:", user);

    const token = await GenToken(user._id);
    console.log("Token generated:", token);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "lax",
    });

    const { password: pwd, ...userData } = user.toObject();

    return res.status(201).json(userData);

  } catch (error) {
    console.log("Signup error message:", error.message);
    console.log(error.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const signin = async (req, res) => {
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"email does not exist!"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters!"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const token = await GenToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: false, // Set to true if using HTTPS
            // sameSite: "lax"
        })

        return res.status(200).json(user)

    }catch(error){
        console.error("Signin error:", error);
        return res.status(500).json({message:"signin error"})
    }
}

export const logout=async (req,res)=>{

    try{
        
        res.clearCookie("token",
            {
                httpOnly: true,
                secure: false,   // set true if using HTTPS in production
                sameSite: "lax"
            }
        )
        return res.status(200).json({message:"logout successful"})
    }catch(error){
        console.error("Logout error:", error);
        return res.status(500).json({message:"Internal server error"})
    }
}