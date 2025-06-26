const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const dataBase = require("./dataBase");
dataBase();

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
