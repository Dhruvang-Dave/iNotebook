const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'dhruvangisgood';

// ROUTE : 1  Create user using POST /api/auth/createuser. NO LOGIN REQUIRE.
router.post('/createuser', [
        body('name', 'Enter a valid name').isLength({ min: 2 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', "Password must be at least 5 characters").isLength({ min: 5 }),

        ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            let user = await User.findOne({email: req.body.email});
            if(!user) {
                return res.status(400).json({error: "Sorry, A user with this email already exists"})
            }
            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                password: securePass,
                email: req.body.email,
            })
            var authToken = jwt.sign({user}, 'JWT_SECRET');
            res.json({authToken});
        } catch (e) {
            console.error(errors.message);
            res.status(500).send("Internal serve error");
        }

})

// ROUTE : 2  Create user using POST /api/auth/login. NO LOGIN REQUIRE.
router.post('/login', [
        body('email', 'Enter a valid email').isEmail(),
        body('password', "Password can not be empty").exists()
], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try{
            let user = await User.findOne({email});
            if(!user){
                return  res.status(404).json({error : "Please try to login with correct credentials"});
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return  res.status(404).json({error : "Please try to login with correct credentials"});
            }
            const data =  {
                user : {
                    id : user.id
                }
            }
            let authToken = jwt.sign({user}, JWT_SECRET);
            res.json({authToken});

        }catch (e) {
            console.error(errors.message);
            res.status(500).send("Internal serve error");
        }
})

// ROUTE : 3  Get loged In user Details using POST /api/auth/getuser. LOGIN REQUIRE.

router.post('/getuser', fetchuser ,async (req, res) => {
    const errors = validationResult(req);
    try {
        console.log("user is running", req.user)
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (e) {
        console.error(errors.message);
        res.status(500).send("Internal serve error");
    }
})

module.exports = router