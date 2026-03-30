const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://mentorship-frontend-sigma.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

module.exports = app;