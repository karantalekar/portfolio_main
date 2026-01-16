// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB error:", err));

// // Message schema
// const messageSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   message: String,
//   date: { type: Date, default: Date.now },
// });

// const Message = mongoose.model("Message", messageSchema);

// // API endpoint to save messages
// app.post("/api/contact", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res
//       .status(400)
//       .json({ success: false, error: "All fields are required" });
//   }

//   try {
//     const newMessage = new Message({ name, email, message });
//     await newMessage.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Message saved successfully!" });
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ success: false, error: "Failed to save message" });
//   }
// });

// app.listen(process.env.PORT || 5000, () =>
//   console.log(`Server running on http://localhost:5000`)
// );

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://karantalekar.vercel.app",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Brevo SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // Brevo SMTP login
    pass: process.env.SMTP_PASS, // Brevo SMTP key
  },
});

// Verify SMTP
transporter.verify((error, success) => {
  if (error) console.error("❌ SMTP VERIFY ERROR:", error);
  else console.log("✅ SMTP READY");
});

// Contact API
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.FROM_EMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h3>📩 New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    console.log("✅ Email sent:", info.messageId);

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ SEND ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
