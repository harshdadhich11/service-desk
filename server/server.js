// server/config/db.js

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGO_URI); // Add this line to verify URI
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
