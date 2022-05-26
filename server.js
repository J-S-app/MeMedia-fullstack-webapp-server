const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;


const io = require("socket.io")(5600, {
  cors: {
    credentials: true,
    origin: process.env.ORIGIN ||  "http://localhost:3000",
  },
});


let users = []


const addUser = (userId, socketId) => {
  !users?.some(user => user.userId == userId) &&
    users?.push({ userId, socketId })
}

const getUser = (userId) => {
  return users?.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users?.filter(user => user.socketId != socketId)
}


io.on("connection", (socket) => {

  console.log("a user connected.");

  socket.on("addUser", (userId) => {
    addUser(userId, socket?.id);
    io.emit("getUsers", users);
  })

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });



  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  })

})


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
