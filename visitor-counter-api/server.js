const express = require("express");
const { Firestore } = require("@google-cloud/firestore"); // Fixed parentheses
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// CORS Configuration
app.use(
  cors({
    origin: "https://sarahportfolio.cloud",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
); // Removed extra braces

// Initialize Firestore
const firestore = new Firestore();

// Serve static files
app.use(express.static(path.join(__dirname, "public"))); // Removed "../"

// Routes
app.get("/", (req, res) => {
  // Fixed "#" ➔ "/"
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST Endpoint
app.post("/visitor-count", async (req, res) => {
  try {
    const counterRef = firestore.collection("counters").doc("visitor-count");
    const doc = await counterRef.get();
    let count = doc.exists ? doc.data().count + 1 : 1;
    await counterRef.set({ count }); // Fixed syntax
    res.json({ count });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Endpoint (for debugging)
app.get("/visitor-count", async (req, res) => {
  try {
    const counterRef = firestore.collection("counters").doc("visitor-count");
    const doc = await counterRef.get();
    res.json({ count: doc.data().count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch count" });
  }
});

// Start server
app.listen(PORT, () => {
  // Fixed "Listen" ➔ "listen"
  console.log(`Server running on http://localhost:${PORT}`); // Fixed template string
});
