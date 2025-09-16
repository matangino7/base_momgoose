const mongoose = require("mongoose");

async function connectToDb(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongoose");
  } catch (error) {
    console.log("Unable to connect to mongoose");
  }
}

module.exports = {
  connectToDb,
};
