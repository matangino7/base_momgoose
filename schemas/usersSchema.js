const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // externalId: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
