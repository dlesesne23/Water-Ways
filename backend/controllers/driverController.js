require('dotenv').config();
const router = require('express').Router();
// Axios takes the response from external API and stores data it in 
// const axios = require("axios")
// Database models
const db = require('../models');
// For hashing passwords
const bcrypt = require('bcrypt');
// For creating and verifying JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');


// SIGNUP
router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      // Check if user already exists
      const existingDriver = await db.Driver.findOne({ username });
      if (existingDriver) {
        return res.status(409).json({ msg: `Username ${username} already exists. Please sign in.`});
      }
      // Create a new user with the hashed password
      const newDriver = new db.Driver({
        username: username,
        email: email,
        password: password,
      });
      // Save the new driver
      await newDriver.save();
      driver = newDriver
      // Create a token for the new driver
      const token = createToken(newDriver);
      res.json({ token, driver: newDriver });
    } catch (error) {
      console.log("Signup Error:", error.message)
      res.status(400).json({ msg: error.message });
    }
  });

  // SIGNIN
// Receive credentials from driver
// Verify credentials are accurate
// If credentials are accurate, then return a token

router.post('/signin', async (req, res) => {
    try {
      console.log("Attempting to sign in with:", req.body); 
      const { username, password } = req.body
      const foundDriver = await db.Driver.findOne({ username })
      if (!foundDriver) throw new Error(`No user found with username ${username}`)
      const validPassword = await bcrypt.compare(password, foundDriver.password)
      if (!validPassword) throw new Error(`The password credentials shared did not match the credentials for the user with username ${username}`)
      const token = createToken(foundDriver)
    driver = foundDriver
      res.json({ token, driver: foundDriver })
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  })

  // Create token form
function createToken(driver) {
    return jwt.sign({ driver }, process.env.SECRETKEY, { expiresIn: '24h' })
  }

// Verify a token
function checkToken(req, res, next) {
    let token = req.get('Authorization')
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        req.driver = err ? null : decoded.driver
        req.exp = err ? null : new Date(decoded.exp * 1000)
      })
      return next()
    } else {
      req.driver = null
      return next()
    }
  }

  function ensureLoggedIn(req, res, next) {
    if (req.driver) return next()
    res.status('401').json({ msg: 'Unauthorized You Shall Not Pass' })
  }

  // GET driver by id
router.get('/:id', async (req, res) => {
    try {
        const driver = await db.Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ message: "Error fetching driver", error: error });
    }
  });
  
  // DELETE driver by id
  router.delete('/:id', async (req, res) => {
    try {
        const deletedDriver = await db.Driver.findByIdAndDelete(req.params.id);
        if (!deletedDriver) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Successfully deleted driver" });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // UPDATE driver by id
  router.put('/:id', async (req, res) => {
    // Destructure and remove password from request body if empty
    let { password, ...updateData } = req.body;
    if (password === '') {
      password = undefined; // Ignore password update if field is left empty
    } else {
      // Only hash password if it's updated
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      updateData.password = password;
    }
    
    const updatedDriver = await db.Driver.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password -__v');
  
    const token = createToken(updatedDriver);
    res.status(200).json({ token, driver: updatedDriver });
  });

  module.exports = router;