const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/User');

// @route GET api/users
// @desc get users
// @access Public

router.get('/',async(req,res) => {
    try{
        const users = await User.find({});
        console.log('users list',users);
        res.json(users);
    }catch(error){
        console.log('error'.error.message.toString());
        res.status(500).json({message:error})
    }
});

module.exports = router;