const express = require('express')
const router = express.Router();
const User = require('../database/models/User');

//CREATE /api/users
router.post('/', (req, res) => {
    const { name, email, age } = req.body;
    User.create({
        name,
        email,
        age  
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = router;