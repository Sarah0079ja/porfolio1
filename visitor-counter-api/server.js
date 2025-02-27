const express = require("express");
const { Firestore } = require("@google-cloud/firestore");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Firestore
const firestore = new Firestore();

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, "../public")));

// Serve the HTML template
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Endpoint to increment and return visitor count
app.post("/visitor-count", async (req, res) => {
  try {
    const counterRef = firestore.collection("counters").doc("visitor-count");
    const doc = await counterRef.get();

    let count = 1;
    if (doc.exists) {
      count = doc.data().count + 1;
    }

    // Update the count in Firestore
    await counterRef.set({ count });

    // Return the updated count
    res.json({ count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
