const mongoose = require("mongoose");
const logger = require("./logger");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.SAN_DB, {
      bufferCommands: false,
    });

    const conn = mongoose.connection;

    const dbName = conn.db?.databaseName || "Unavailable";
    logger.info(`✅ MongoDB Connected`);
    logger.info(`🔗 DB Name: ${dbName}`);

    isConnected = conn.readyState === 1;
  } catch (error) {
    logger.error(`❌ MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDb;
