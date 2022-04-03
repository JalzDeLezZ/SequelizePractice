const express = require('express')
const router = express.Router();
const User = require('../database/models/User');
const Address = require('../database/models/Address');

router.get('/', (req, res) => {
    User.findAll({
        // include: 'address',
        include: {
            model: Address,
            as: 'domicilio',
            attributes: ['street']
        },
        attributes: ['name', 'age']
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

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