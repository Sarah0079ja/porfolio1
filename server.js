const express = require("express");
const { Firestore } = require("@google-cloud/firestore");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// === CORS Configuration ===
app.use(
  cors({
    origin: "https://sarahportfolio.cloud", // your frontend domain
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.options("*", cors()); // Handle preflight requests

// === Firestore Initialization ===
const firestore = new Firestore();

// === Middleware ===
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // ensure assets are in /public

// === Routes ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST: Increment Visitor Count
app.post("/visitor-count", async (req, res) => {
  try {
    const counterRef = firestore.collection("counters").doc("visitor-count");
    const doc = await counterRef.get();
    const count = doc.exists ? doc.data().count + 1 : 1;
    await counterRef.set({ count });
    res.json({ count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET: Read Visitor Count
app.get("/visitor-count", async (req, res) => {
  try {
    const counterRef = firestore.collection("counters").doc("visitor-count");
    const doc = await counterRef.get();
    const count = doc.exists ? doc.data().count : 0;
    res.json({ count });
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    res.status(500).json({ error: "Failed to fetch count" });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});