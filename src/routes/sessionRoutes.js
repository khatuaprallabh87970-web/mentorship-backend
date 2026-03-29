const express = require("express");
const router = express.Router();
const {
  createSession,
  joinSession,
  endSession,
} = require("../controllers/sessionController");

router.post("/create", createSession);
router.post("/join", joinSession);
router.post("/end", endSession);

module.exports = router;