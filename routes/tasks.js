const express = require("express");
const taskRouter = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../dl/tasks");

taskRouter.route("/").get(getAllTasks).post(createTask);
taskRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = { taskRouter };
