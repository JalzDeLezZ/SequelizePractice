const express = require('express')
const router = express.Router();
const User = require('../database/models/User');
const Address = require('../database/models/Address');
const Post = require('../database/models/Post');

router.get('/', (req, res) => {
    User.findAll({
        // include: 'address',
        include: [{
            model: Address,
            as: 'domicilio',
            attributes: ['street']
        }, {
            model: Post,
            as: 'publicaciones',
            attributes: ['title', 'body'],
            where: {
                title: 'Foo'
            }
        }],
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
    const { name, email, age , street} = req.body;
    User.create({
        name,
        email,
        age,
        domicilio: {
            street
        }
    },{
        include : 'domicilio'
    }
    
    ).then(dataUser => {
        /* Address.create({street}).then(dataStreet=> {
            dataUser.setDomicilio(dataStreet).then(result => {
                res.json(dataUser)
            })
        }) */
        res.json(dataUser)
    }).catch(err => {
        res.json(err)
    })
})

//see address of users /api/users/:id/address
router.get('/:id/address', (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(dataUser => {
            dataUser.getDomicilio()
        .then(dataDomicilio => {
            res.json(dataDomicilio);
        })
    })
})

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(dataUser => {
            dataUser.getPublicaciones()
        .then(dataPost => {
            res.json(dataPost);
        });
    });
});

module.exports = router;