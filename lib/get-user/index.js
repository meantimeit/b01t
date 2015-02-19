var userBuilder = require('../user-builder');
var userGateway = require('../user-gateway');

function getUser(options, userId, done) {
  userGateway.findById(options.gateway.user, userBuilder, userId, done);
}

module.exports = getUser;
