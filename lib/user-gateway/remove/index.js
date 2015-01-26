var UserEntity = require('../../user-entity');

function remove(userGateway, user, done) {
  if (userGateway === null || userGateway === undefined) {
    return done(new Error('No user gateway provided'));
  }

  if (user === null || user === undefined) {
    return done(new Error('No user provided'));
  }

  if (!(user instanceof UserEntity)) {
    return done(new Error('Not a UserEntity'));
  }

  if (!user.getId()) {
    return done(new Error('UserEntity has no ID'));
  }

  userGateway.remove(user.getId(), function (err) {
    if (err) {
      return done(err);
    }

    done();
  });
}

module.exports = remove;