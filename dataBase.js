const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.sanDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((success) => {
      console.log("MongoDb Connected !!!!");
    })
    .catch((errorMessage) => {
      console.log("Error in DataBase file", errorMessage);
    });
};

module.exports = connectDb;
