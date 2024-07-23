const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../../../models");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate reset code
    const resetCode = crypto.randomBytes(3).toString("hex"); // Generates a 6-character code
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // email kamu
        pass: process.env.PASSWORD, // password aplikasi
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please use the following code to reset your password. This code is valid for one hour:\n\n
             ${resetCode}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.error("There was an error: ", error);
        res.status(500).json({ message: "Email could not be sent" });
      } else {
        res.status(200).json({ message: "Recovery email sent" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyResetCode = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: code,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Reset code is invalid or has expired" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Code verified", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Stored hashed password before reset:", user.password); // Log password sebelum reset

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed password in reset process:", hashedPassword);

    // Tes bcrypt.compare langsung setelah hashing
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Password match status (direct test after hashing):", isMatch);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    console.log("Stored hashed password after reset:", user.password); // Log password setelah reset

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
