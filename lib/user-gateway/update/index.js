var UserEntity = require('../../user-entity');

function update(userGateway, user, done) {
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

  userGateway.update(user.toJSON(), function (err, data) {
    if (err) {
      return done(err);
    }

    var savedUser = new UserEntity();
    savedUser.setId(data.id);
    savedUser.setName(data.name);
    savedUser.setEmail(data.email);

    done(null, savedUser);
  });
}

module.exports = update;
