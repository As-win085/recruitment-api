const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        
        // This will show us if the string is empty or malformed
        console.log("--- DB DEBUG START ---");
        console.log("Value of MONGO_URI:", uri);
        console.log("Type of MONGO_URI:", typeof uri);
        console.log("--- DB DEBUG END ---");

        if (!uri) {
            throw new Error("MONGO_URI is undefined. Check if your .env file is in the root folder.");
        }

        await mongoose.connect(uri);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;