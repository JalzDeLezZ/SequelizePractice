const Post = require('./models/Post');
const User = require('./models/User');
const Address = require('./models/Address');


User.hasOne(Address, {as : 'domicilio', foreignKey: 'residente_id'});

Address.belongsTo(User, {as: 'residente', foreignKey: 'residente_id'});