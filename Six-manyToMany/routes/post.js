const express = require('express');
const router = express.Router();
const Post = require('../database/models/Post');
const User = require('../database/models/User');

// GET ALL
router.get('/', (req, res) => {
    Post.findAll({
        include: {
            model: User,
            as: 'autor',
            attributes: ['name']
        },
        attributes: ['title', 'body']
    })
        .then(response => {
            res.json(response);
        });
});

// CREATE
router.post('/', (req, res) => {
    const { title, body } = req.body;

    Post.create({
        title,
        body
    }).then(post => {
        res.json(post);
    }).catch(err => {
        res.send(err);
    });
});

// READ
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    Post.findByPk(id)
        .then(response => {
            res.json(response);
        })
})

// UPDATE
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    Post.update({
        title,
        body
    },
    {
        where: {
            id
        }
    }).then(response => {
        res.json(response);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Post.destroy({
        where: {
            id
        }
    }).then(response => {
        res.json(response);
    });
});

module.exports = router