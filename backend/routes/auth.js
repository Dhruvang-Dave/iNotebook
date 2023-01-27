const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
        body('name', 'Enter a valid name').isLength({ min: 2 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', "Password must be at least 5 characters").isLength({ min: 5 }),

        ], async (req, res) => {
        /*create user using : POST './api/auth' , Doesn't require auth :- below code is working too... */
            // console.log(User);
            // const newUser = await User.create(req.body)
            // res.json(newUser)

            // console.log(req.body);
            // const user = await new User(req.body)
            // user.save();

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }
                User.create({
                        name: req.body.name,
                        password: req.body.password,
                        email: req.body.email,
                }).then(user => res.json(user)).catch( err=> {console.log(err); res.json({error: "Please enter valid email", message: err.message})})
                // res.send(req.body);
})

module.exports = router;