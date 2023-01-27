const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {

    //create user using : POST './api/auth' , Doesn't require auth :- below code is working too...
    // console.log(User);
    // const newUser = await User.create(req.body)
    // res.json(newUser)

        console.log(req.body);
        const user = await new User(req.body)
        user.save();
        // res.send(user);
})

module.exports = router;