// backend/db.js
const mongoose = require("mongoose");
const logger = require("./logger");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;

  try {

    const db = await mongoose.connect(process.env.SAN_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    });

    isConnected = db.connections[0].readyState === 1;
       logger.info(` MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
logger.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDb;
