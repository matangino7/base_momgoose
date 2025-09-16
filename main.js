const { connectToDb } = require("./utils/mongoose.db");
const express = require("express");
const dotenv = require("dotenv");
const { router } = require("./routes/tasks");
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/tasks", router);

app.listen(process.env.PORT, async () => {
  try {
    await connectToDb(process.env.MONGO_URL);
    console.log("Server runing on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
