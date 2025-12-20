import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Message schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// API endpoint to save messages
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res
      .status(200)
      .json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on http://localhost:5000`)
);
