module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 🔹 join session room
    socket.on("join-session", (sessionId) => {
      socket.join(sessionId);
      console.log(`User joined session ${sessionId}`);
    });

    // 🔹 code sync
    socket.on("code-change", ({ sessionId, code }) => {
      socket.to(sessionId).emit("code-update", code);
    });

    // 🔹 chat message
    socket.on("send-message", ({ sessionId, message }) => {
      socket.to(sessionId).emit("receive-message", message);
    });

    // 🔹 WebRTC signaling

socket.on("offer", ({ sessionId, offer }) => {
  socket.to(sessionId).emit("offer", offer);
});

socket.on("answer", ({ sessionId, answer }) => {
  socket.to(sessionId).emit("answer", answer);
});

socket.on("ice-candidate", ({ sessionId, candidate }) => {
  socket.to(sessionId).emit("ice-candidate", candidate);
});

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};