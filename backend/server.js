const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/devices", require("./routes/device.routes"));

app.use("/api/complaints", require("./routes/complaint.routes"));

app.use("/api/notifications", require("./routes/notification.routes"));

app.use("/api/admin", require("./routes/admin.routes"));

app.use("/api/superadmin", require("./routes/superadmin.routes"));
// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("✅ MongoDB connected");

})
.catch((err) => {

  console.error("❌ MongoDB Error:", err);

});

// Default Route
app.get("/", (req, res) => {

  res.send("🚀 DigiYantra Backend Running");

});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});