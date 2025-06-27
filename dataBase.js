const mongoose = require("mongoose");
const logger = require("./logger");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.SAN_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    });

    const conn = mongoose.connection;

    logger.info(`MongoDB Connected`);
    logger.info(`DB Name: ${conn.name}`);
    logger.info(`URI: ${conn.client?.s?.url || 'Unavailable'}`);

    isConnected = conn.readyState === 1;
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDb;
