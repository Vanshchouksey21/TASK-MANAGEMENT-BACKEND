const adminModel = require("../models/AdimModel");
const userModel = require("../models/UserModel");
const PassGenrator = require("../middleware/passwordGenrator");
const sendEmail = require("../middleware/sendEmail"); 
const bcrypt = require("bcrypt");

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

module.exports = { adminlogin, usercreation };
