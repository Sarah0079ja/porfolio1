const express = require("express");
// const { Firestore } = require("@google-cloud/firestore");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// === CORS Configuration ===

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://sarahportfolio.cloud");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }
  next();
});


// === Firestore Initialization ===
const firestore = new Firestore();

// === Middleware ===
app.use(express.json());
app.use(express.static(path.join(__dirname, ))); // "public" was removed from here, ensure assets are in /public

// === Routes ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); //"public" was removed from here
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