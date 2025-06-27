const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./dataBase"); // renamed to match typical convention

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDb(); // ✅ Wait for DB to be connected

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error.message);
    process.exit(1); // Exit process if DB fails
  }
};

startServer();
