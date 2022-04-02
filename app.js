const express = require('express')
const app = express()
const sequelize = require('./database/db')
const User = require('./database/models/User')

//SETTING
const PORT = process.env.PORT || 3000;

//ROUTES
app.get('/', (req, res) => { 
  // User.create({
  //   name: 'John Doe',
  //   birthday: new Date(),
  // }).then(user => {
  //   res.json(user)
  // }) 
  User.findAll().then(users => {
    res.json(users)
  })
})

//SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

    sequelize.sync({force: false})
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    })
})

/* 
 493  npm init -y
  494  touch app.js config.js
  495  npm i express nodemon
  493  npm install --save sequelize
  494  npm install --save mysql2
*/