require("dotenv").config();

const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const sessionSocket = require("./sockets/sessionSocket");

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// make io accessible everywhere
app.set("io", io);

// after io created
sessionSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});