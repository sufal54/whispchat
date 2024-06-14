const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv/config");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true, withCredentials: true }));
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: true,
  },
});

// routers
const user = require("./router/userRoute.js");
app.use("/user", user);

const message = require("./router/messageRoute.js");
const isAuth = require("./middleware/isAuth.js");
app.use("/user/message", isAuth, message);

const onlineUsers = new Map();

// io
io.on("connection", (socket) => {
  socket.on("online", (id) => {
    try {
      setTimeout(() => {
        onlineUsers.set(id, socket.id);
        io.emit("listonline", [...onlineUsers.keys()]);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("sendMess", (data, userData) => {
    if (data?.isNew) {
      io.to(onlineUsers.get(data.newMessage.reciverId)).emit(
        "newSender",
        userData
      );
    } else {
      io.to(onlineUsers.get(data.newMessage.reciverId)).emit(
        "senderMsg",
        userData
      );
    }
    io.to(onlineUsers.get(data.newMessage.reciverId)).emit("sendMess", {
      data,
    });
  });

  socket.on("disconnect", () => {
    //after 5sec user deleted
    try {
      for (let [key, value] of onlineUsers.entries()) {
        if (value === socket.id) {
          setTimeout(() => {
            onlineUsers.delete(key);
            io.emit("listonline", [...onlineUsers.keys()]);
          }, 5000);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
});

function main() {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("Database connected"));
}
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("Server Stated");
  main();
});
