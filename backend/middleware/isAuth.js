import jwt from 'jsonwebtoken';
const isAuth = async (req, res, next) => {
    try{
        console.log('req.cookies:', req.cookies);
        const token = req.cookies.token; // Get token from cookies
        console.log('Token:', token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = verifyToken.userId;
        if (!req.userID) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    }catch(error){
        console.error("JWT verification error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
export default isAuth;
