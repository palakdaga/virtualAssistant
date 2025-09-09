import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import geminiResponse from '../gemini.js';
import moment from 'moment';

export const getCurrentUser = async (req, res) => {
    try {
        const userID = req.userID; // Get user ID from the request

        if (!userID) {
            return res.status(400).json({ message: 'User ID not provided in request' });
        }
        const user = await User.findById(userID).select('-password'); // remove password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user); // Return user data without password
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {assistantName,imageUrl} = req.body;
        let assistantImage;
        if(req.file){
            assistantImage = await uploadOnCloudinary(req.file.path);
        }
        else{
            assistantImage = imageUrl;
        }
        const user=await User.findByIdAndUpdate(req.userID, {
            assistantName: assistantName,
            assistantImage: assistantImage
        }, { new: true }).select('-password'); // remove password from the response
        return res.status(200).json(user);
    }catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const askToAssistant = async (req, res) => {
    try{
        const {command} = req.body;
        const user = await User.findById(req.userID).select('-password');
        user.history.push(command);
        await user.save(); // Save the updated history to the user document
        const userName = user.name;
        const assistantName = user.assistantName;
        const result = await geminiResponse(command, assistantName ,userName);
        const jsonMatch = result.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            return res.status(400).json({ message: "sorry I didn't understand that." });
        }
        const gemResult = JSON.parse(jsonMatch[0]);

        const type = gemResult.type
        const now = moment();

        switch(type) {
            case "get-date":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response:`The current date is ${now.format('YYYY-MM-DD')}.`
            });
            case "get-time":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response:`The current time is ${now.format('HH:mm:ss')}.`
            });
            case "get-day":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response:`Today is ${now.format('dddd')}.`
                });

            case "get-month":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response:`The current month is ${now.format('MMMM')}.`
                });
            case "general":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: gemResult.response
            });
            case "joke":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Here's a joke for you: ${gemResult.response}`
            });
            case "quote":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Here's a quote for you: ${gemResult.response}`
            });
            
            case "calculator-open":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Opening calculator for the expression: ${gemResult.userInput}`
            });
            
            case "google-search":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Searching Google for "${gemResult.userInput}"...`
            });
            case "youtube-search":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Searching YouTube for "${gemResult.userInput}"...`
            });
            case "wikipedia-search":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Searching Wikipedia for "${gemResult.userInput}"...`
            });
            case "instagram-search":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Searching Instagram for "${gemResult.userInput}"...`
            });
            case "twitter-search":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Searching Twitter for "${gemResult.userInput}"...`
            });
            case "facebook-search":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Searching Facebook for "${gemResult.userInput}"...`
            });
            case "linkedin-search":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Searching LinkedIn for "${gemResult.userInput}"...`
            });
            case "get-translation":
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: `Translating "${gemResult.userInput}"...`
            });
            // Add more cases as needed for other types
            default:
            return res.status(400).json({ message: "Unsupported command type." });

        }
        
    }catch (error) {
        console.error("Error asking assistant:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}