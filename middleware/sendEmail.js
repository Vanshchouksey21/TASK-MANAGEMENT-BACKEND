
const nodemailer = require("nodemailer");

const sendEmail = async (email, name, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Vanshchouksey2175@gmail.com", // ✅ Your Gmail
        pass: "ekcw ojtn rhrb ypai" // ⚠️ App Password required here
      }
    });

    const info = await transporter.sendMail({
      from: '"Task Management System" <Vanshchouksey2175@gmail.com>',
      to: email,
      subject: "🧠 Task Management - Login Credentials",
      text: `Hey ${name},\n\nYour account has been created successfully.\n\nLogin Email: ${email}\nPassword: ${password}\n\nPlease change your password after first login.\n\nRegards,\nTeam TMS`
    });

    console.log("📧 Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
