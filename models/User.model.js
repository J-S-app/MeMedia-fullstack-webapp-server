const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: true,
      required: true
    },
    profileImage: String,
    birthday: Number,
    country: String,
    coverImage: String,
    catchPhrase: String,
    aboutMeme: String,
    isCurrentUser: Boolean,
    followings: {
      type: [ObjectId]
    },
    followers: [ObjectId]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
