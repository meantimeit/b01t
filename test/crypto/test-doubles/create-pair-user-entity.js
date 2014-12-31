var UserEntity = require('../../..').entity.UserEntity;
var user = new UserEntity();
user.setId(1);
user.setName('jane');
user.setEmail('jame@example.org');

module.exports = user;
