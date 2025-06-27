// backend/db.js
const mongoose = require("mongoose");
const logger = require("./logger");


const connectDb = async () => {
  try {

    const db = await mongoose.connect(process.env.SAN_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    });

     db.connections[0].readyState === 1;
       logger.info(` MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
logger.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDb;
