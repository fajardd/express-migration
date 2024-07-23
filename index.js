const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");
const loginRoutes = require("./routes/loginRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const historyRoutes = require("./routes/historyRoutes");
const dokterRoutes = require("./routes/dokterRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const dropdownRoutes = require("./routes/dropdownRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", loginRoutes);
app.use("/", profileRoutes);
app.use("/", userRoutes);
app.use("/", roleRoutes);
app.use("/", historyRoutes);
app.use("/", dokterRoutes);
app.use("/", adminRoutes);
app.use("/", customerRoutes);
app.use("/", scheduleRoutes);
app.use("/", serviceRoutes);
app.use("/", dropdownRoutes);
app.use("/", forgotPasswordRoutes);

app.get("/", (req, res) => {
  res.send(`
    Server available
  `);
});

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("unable to connect ti the database: ", err);
  });
