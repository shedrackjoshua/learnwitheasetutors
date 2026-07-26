import express from "express";
import { createToken } from "../utils/twilio.js";

const router = express.Router();

// TURN credentials endpoint
router.get("/turn-credentials", async (req, res) => {
  try {
    const token = await createToken();
    res.json(token.iceServers);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate TURN credentials" });
  }
});

// Join classroom endpoint
router.post("/join", async (req, res) => {
  try {
    const { classroomId, userId } = req.body;

    // Example: add user to classroom session (DB/socket logic goes here)
    // await ClassroomService.addUser(classroomId, userId);

    res.json({ message: `User ${userId} joined classroom ${classroomId}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to join classroom" });
  }
});

// Leave classroom endpoint
router.post("/leave", async (req, res) => {
  try {
    const { classroomId, userId } = req.body;

    // Example: remove user from classroom session (DB/socket logic goes here)
    // await ClassroomService.removeUser(classroomId, userId);

    res.json({ message: `User ${userId} left classroom ${classroomId}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to leave classroom" });
  }
});

export default router;