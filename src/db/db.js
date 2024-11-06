const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1); // 1: something is wrong, 0: user exited 
    }
};

module.exports = connectDB; 