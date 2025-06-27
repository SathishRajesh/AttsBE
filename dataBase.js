// backend/db.js
const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.sandb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Prevents "buffering timed out" error
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected:", db.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connectDb;
