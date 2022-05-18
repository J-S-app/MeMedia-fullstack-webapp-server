const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required : true
    },
    postContent: String,
    postLikes: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
    postComments: {
      type: [Schema.Types.ObjectId],
      ref: "Comments"
    },
    postOwner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
