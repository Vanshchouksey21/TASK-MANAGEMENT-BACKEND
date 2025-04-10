const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: String,
  taskDesc: String,
  completionDate: String,
  userid: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', taskSchema); 
