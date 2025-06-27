// backend/db.js
const mongoose = require("mongoose");
const logger = require("./logger");


const connectDb = async () => {
  try {

await mongoose.connect(process.env.SAN_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
});

const { host, name } = mongoose.connection;

logger.info(`MongoDB Connected: host=${host}, db=${name}`);

  } catch (error) {
logger.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDb;
