var UserEntity = require('../user-entity');

function userBuilder(data) {
  var user = new UserEntity();

  if (data.id) {
    user.setId(data.id);
  }

  user.setName(data.name);
  user.setEmail(data.email);

  return user;
}

module.exports = userBuilder;
