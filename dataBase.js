const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.SAN_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    });

    isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected:", db.connection.host);
  } catch (error) {
    console.error("Error in DB connection:", error.message);
    throw new Error("Database connection failed");
  }
};

module.exports = connectDb;
