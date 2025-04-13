const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: String,
  taskDesc: String,
  completionDate: String,
  userid: { type: mongoose.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" }, // Correct / Not Correct
  isCompletedByUser: { type: Boolean, default: false }, // set by user side
  createdAt: {
    type: Date,
    default: Date.now
  }
});
