const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoute = require("./routes/AdminRoute");
require("dotenv").config();
const DBcon = require("./config/db");
const userRoutes = require('./routes/UserRoute'); 
const app = express();

// Connect to MongoDB
DBcon.connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/admin", adminRoute);
app.use('/user', userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 SERVER IS RUNNING ON PORT ${port}`);
});
