const userModel = require('../models/UserModel');

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("❌ Error in user login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userLogin };