const express = require('express');
const app = express();

require("dotenv").config()

const db = require('./models')
const userCtrl = require("./controllers/userController")

// Middleware
app.use(cors());             
app.use(cookieParser());
//Promise based HTTP client for making requests to external API
const axios = require("axios") 
// Middleware to parse JSON bodies
app.use(express.json())
//HTTP request logger middleware for node.js
const morgan = require("morgan")
app.use(morgan("tiny"))

app.use("/user", userCtrl)

//I.N.D.U.C.E.S.
// Index route
app.get("/", (req, res) => {
    res.send("Water Ways App!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server sailing on port ${PORT}`));