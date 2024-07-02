const express = require("express");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const historyRoutes = require("./routes/historyRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", userRoutes);
app.use("/", roleRoutes);
app.use("/", historyRoutes);

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
