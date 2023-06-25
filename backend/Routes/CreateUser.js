const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "CreatingfirstprojectwithMERN:)"

router.post("/createuser", [
  body('email', 'not valid email').isEmail(),
  body('name', 'increase lenght').isLength({ min: 5 }),
  body('password', 'Increase length').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt =await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
        /*name:"Shyam Das",
        password:"123456",
        email:"shyamdas123@hotmail.com",
        location:"QWERTY edrfef"*/
      })
      res.json({ success: true });

    } catch (error) {
      console.log(error)
      res.json({ success: false });
    }
  })

router.post("/loginuser", [
  body('email', 'not valid email').isEmail(),
  body('password', 'Increase length').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Type credentials" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Type again with correct credentials" })
      }

      const data = {
          user:{
            id: userData.id
          }
      }
      const authToken = jwt.sign(data,jwtSecret)// one can add exp date here according to their requirements , here data will remain untill cleared by user rhrough deleting cache

      return res.json({ success: true, authToken });

    } catch (error) {
      console.log(error)
      res.json({ success: false });
    }
  })

module.exports = router;