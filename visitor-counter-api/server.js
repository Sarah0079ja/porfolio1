const express = require("express");
const { Firestore } = require("@google-cloud/firestore");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// CORS Configuration
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);

// // Middleware for JSON parsing
// app.use(express.json());

// Initialize Firestore
const firestore = new Firestore();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST Endpoint for Visitor Count
app.post("/visitor-count", async (req, res) => {
  try {
    const counterRef = firestore.collection("counters").doc("visitor-count");
    const doc = await counterRef.get();
    let count = doc.exists ? doc.data().count + 1 : 1;
    await counterRef.set({ count });
    res.json({ count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Endpoint for Visitor Count (for debugging)
app.get("/visitor-count", async (req, res) => {
  try {
    const counterRef = firestore.collection("counters").doc("visitor-count");
    const doc = await counterRef.get();
    res.json({ count: doc.exists ? doc.data().count : 0 });
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    res.status(500).json({ error: "Failed to fetch count" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
