const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// File path for visitor counter
const counterFilePath = path.join(__dirname, "counter.json");

// Load or initialize visitor count
let visitorCount = 0;
if (fs.existsSync(counterFilePath)) {
  try {
    const data = fs.readFileSync(counterFilePath, "utf-8");
    visitorCount = JSON.parse(data).count || 0;
  } catch (err) {
    console.error("Failed to read counter file:", err);
    visitorCount = 0;
  }
}

// Middleware to serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Increment count on homepage access
app.get("/", (req, res) => {
  visitorCount++;
  fs.writeFileSync(
    counterFilePath,
    JSON.stringify({ count: visitorCount }),
    "utf-8"
  );
  res.sendFile(path.join(__dirname, "index.html"));
});

// Optional API route to fetch current count
app.get("/visitor-count", (req, res) => {
  res.json({ count: visitorCount });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});











// const express = require("express");
// // const { Firestore } = require("@google-cloud/firestore");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 8080;

// // === CORS Configuration ===

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://sarahportfolio.cloud");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204); // No Content
//   }
//   next();
// });

// // === Middleware ===
// app.use(express.json());
// app.use(express.static(path.join(__dirname, ))); // "public" was removed from here, ensure assets are in /public

// // === Routes ===
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html")); //"public" was removed from here
// });

// // POST: Increment Visitor Count
// app.post("/visitor-count", async (req, res) => {
//   try {
//     // const counterRef = firestore.collection("counters").doc("visitor-count") // Use this code when deploying to GCS with firebase for the database counter;
//     const doc = await counterRef.get();
//     const count = doc.exists ? doc.data().count + 1 : 1;
//     await counterRef.set({ count });
//     res.json({ count });
//   } catch (error) {
//     console.error("Error updating visitor count:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // GET: Read Visitor Count
// app.get("/visitor-count", async (req, res) => {
//   try {
//     const counterRef = firestore.collection("counters").doc("visitor-count");
//     const doc = await counterRef.get();
//     const count = doc.exists ? doc.data().count : 0;
//     res.json({ count });
//   } catch (error) {
//     console.error("Error fetching visitor count:", error);
//     res.status(500).json({ error: "Failed to fetch count" });
//   }
// });

// // === Start Server ===
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
