const { Schema, model } = require("mongoose");

const onlineChatSchema = new Schema(
  {
    chatPair: {
      type: Array,
    }
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const OnlineChat = model("OnlineChat", onlineChatSchema);

module.exports = OnlineChat;
