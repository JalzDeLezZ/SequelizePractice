const Post = require('./models/Post');
const User = require('./models/User');
const Address = require('./models/Address');
const Band = require('./models/Band');


User.hasOne(Address, {as : 'domicilio', foreignKey: 'residente_id'});

Address.belongsTo(User, {as: 'residente', foreignKey: 'residente_id'});

// 1 - N
User.hasMany(Post, {as: 'publicaciones', foreignKey: 'autorId'});

Post.belongsTo(User, {as: 'autor'});

// N - N
// this method add functions logic (user.addBand) and (user.getUser)...
User.belongsToMany(Band, {through : 'userXband'});
Band.belongsToMany(User, {through : 'userXband'});
