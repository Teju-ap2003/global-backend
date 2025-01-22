// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");  // Import CORS
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // Enable CORS for all requests
// app.use(cors());

// // MongoDB connection
// mongoose.connect("mongodb://localhost:27017/userDBbb")
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err));


// // Define User schema
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// // Create User model
// const User = mongoose.model("User", userSchema);

// // Route to register user with encrypted password
// // Route to handle login
// app.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if the user exists
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid username or password" });
//         }

//         // Compare the entered password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid username or password" });
//         }

//         // If login is successful, generate a token (optional)
//         const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "defaultSecret", {
//             expiresIn: "1h",
//         });

//         res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


// // Start the server
// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });




// Route to handle login
// app.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if the user exists
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid username or password" });
//         }

//         // Compare the entered password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid username or password" });
//         }

//         // If login is successful, generate a token (optional)
//         const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "defaultSecret", {
//             expiresIn: "1h",
//         });

//         res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });




// const express = require('express');
// const app = express();
// const mongoose = require("mongoose")
// const cors = require("cors")


// app.use(express.json());
// app.use(cors())

// app.post('/', (req, res) => {
//     res.json({ success: true });
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log("Server running on port 3000");
// });





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
