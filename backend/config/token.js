import jwt from 'jsonwebtoken';
const GenToken = async (userId) => {
    try{
        const token = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn:"7d"})
        return token;
    }catch(error){
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
}
export default GenToken;