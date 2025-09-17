const UserModel = require("../schemas/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerNewUser = async (newUserData) => {
  try {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
    let newDocument = new UserModel(newUserData);
    await newDocument.save();
    return newUserData;
  } catch (error) {
    console.log("Error Register Client: " + error.message);
    return false;
  }
};

const loginUser = async (userData) => {
  try {
    const { username, password } = userData;
    const user = await UserModel.findOne({ username });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return jwt.sign(
          {
            username: user.username,
            docId: user._id,
          },
          process.env.SECRET_TOKEN_KEY
        );
      }
    }
    return "Unable Logging In Client";
  } catch (error) {
    console.log("Error Logging Client: " + error.message);
    return false;
  }
};

module.exports = { registerNewUser, loginUser };
