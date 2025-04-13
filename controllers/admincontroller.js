const adminModel = require("../models/AdimModel");
const userModel = require("../models/UserModel");
const PassGenrator = require("../middleware/passwordGenrator");
const sendEmail = require("../middleware/sendEmail"); 
const bcrypt = require("bcrypt");
const taskModel = require("../models/TaskModel");

const adminlogin = async (req, res) => {
  const { adminid, password } = req.body;

  try {
    const admin = await adminModel.findOne({ adminid });

    if (!admin) {
      return res.status(401).json({ message: "Invalid ID" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    console.log("✅ Admin login successful:", admin);
    res.status(200).json({ message: "Login successful", admin });

  } catch (error) {
    console.log("❌ Error in admin login:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const usercreation = async (req, res) => {
  const { name, email, role } = req.body;
  const password = PassGenrator.passgen(); // plain password

  try {
    // Save user with plain password
    const newUser = await userModel.create({
      name,
      email,
      role,
      password
    });

    console.log("✅ New user created:", newUser);

    // Send email with plain credentials
    await sendEmail(email, name, password); // ✅ simplified

    res.status(201).json({
      message: "User created and email sent",
      user: newUser
    });
  } catch (error) {
    console.error("❌ Error creating user or sending email:", error);
    res.status(500).json({
      message: "Server error during user creation or email sending"
    });
  }
};


const userdisplay = async (req, res) => {
  const user = await userModel.find();
  res.status(200).send(user);
}



const assigntask = async (req, res) => {
  const { userId, task, taskDesc, completionDate } = req.body;

  try {
    const createdTask = await taskModel.create({
      task,
      taskDesc,
      completionDate,
      userid: userId,
    });

    console.log("✅ Task assigned to user:", createdTask);
    res.status(200).send("Task assigned successfully!");
  } catch (error) {
    console.log("❌ Error assigning task:", error);
    res.status(500).send("Internal server error");
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
};

const updatetaskstatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const task = await taskModel.findByIdAndUpdate(taskId, { status }, { new: true });
    res.status(200).json({ message: "Task status updated", task });
  } catch (err) {
    console.error("❌ Error updating task status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};



const getUserTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ userid: req.params.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send("Failed to fetch tasks");
  }
};
module.exports = { adminlogin, usercreation, userdisplay, assigntask , deleteUser, updatetaskstatus , getUserTasks };
