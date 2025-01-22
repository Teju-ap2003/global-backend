
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/globaldata")
  .then(() => { console.log("DB connected"); })
  .catch(() => { console.log("DB not connected"); });

// Define the User schema
const userSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.model("User", userSchema);

// Endpoint to check username match
app.post("/check-username", async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ username });

    if (user) {
      res.send({ match: true });
    } else {
      res.send({ match: false });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).send("Server error");
  }
});

// Sample route to add a user for testing
app.post("/add-user", async (req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });
  await newUser.save();
  res.send("User added successfully");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
