const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "OnlineChat"
    },
    messageSender:String,
    messageText: String,
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
