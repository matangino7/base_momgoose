const express = require("express");
const dotenv = require("dotenv");
const { taskRouter } = require("./routes/tasks");
const { userRouter } = require("./routes/usersRouter");
const { addDataToDb } = require("./bl/demoLogic");
dotenv.config();
const app = express();

app.use(require("cors")()); //allow all origin access to server
app.use(express.json()); // allow object casting

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/mission", async (req, res) => {
  const data = await addDataToDb();
  res.status(200).send(data);
});

app.listen(process.env.PORT, async () => {
  try {
    await require("./utils/mongoose.db").connectToDb(process.env.MONGO_URL);
    console.log("Server runing on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
