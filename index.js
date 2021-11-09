require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const corsApp = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const mainRouter = require("./src/routers");

const app = express();
const httpServer = createServer(app);
const cors = {
  origin: "*",
};
const io = new Server(httpServer, {
  cors,
});
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
// const cors = {
//   origin: ["http://192.168.1.100:8000"],
// };
app.use(corsApp());

app.use(express.static("public"));

app.use(mainRouter);

io.on("connection", (socket) => {
  console.log("Socket connection", socket.id);
});

httpServer.listen(port, () => {
  console.log(`App started at port ${port}`);
});
const socketIoObject = io;
module.exports.ioObject = socketIoObject;
