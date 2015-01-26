var User = require('../../../lib').entity.UserEntity;
var userBuilder = function () {
  return new User();
};

module.exports = userBuilder;

