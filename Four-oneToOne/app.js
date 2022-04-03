const express = require('express')
const app = express()
const sequelize = require('./database/db') 
require('./database/asociations')

//>>>>>>>>>>>>>>>>>>>>SETTING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const PORT = process.env.PORT || 3000;

//>>>>>>>>>>>>>>>>>>>>MIDLEWARE -> para poder llenar el req.body

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//>>>>>>>>>>>>>>>>>>>>>ROUTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/', (req, res) => {
   res.json({"Hello": "World"})
})
app.use('/api/posts', require('./routes/post'))
app.use('/api/users', require('./routes/users'))
app.use('/api/addresses', require('./routes/addresses'))

//>>>>>>>>>>>>>>>>>>>>SERVER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

    sequelize.sync({force: false})//<<<<<<<<<<<<
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

  ==================
  526  mkdir Two-crud
  527  cp -R One-InicialSequelize/ Two-crud/
*/