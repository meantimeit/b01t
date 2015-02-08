var UserEntity = require('../../user-entity');

function generatePairUserId(user) {
  return user.getName() + ' <' + user.getEmail() + '>';
}

function createPair(crypto, keyBuilder, userEntity, passphrase, done) {
  if (crypto === null || crypto === undefined) {
    return done(new Error('No crypto implementation'));
  }

  if (keyBuilder === null || keyBuilder === undefined) {
    return done(new Error('No key builder'));
  }

  if (!(userEntity instanceof UserEntity)) {
    return done(new Error('No user entity'));
  }

  crypto.createPair(generatePairUserId(userEntity), passphrase, function (err, data) {
    if (err) {
      return done(err);
    }

    var keyPair = [];
    keyPair.push(keyBuilder({
      key: data.public,
      type: 'public',
      userId: userEntity.getId()
    }));
    keyPair.push(keyBuilder({
      key: data.private,
      type: 'private',
      userId: userEntity.getId()
    }));

    done(null, keyPair);
  });
}

module.exports = createPair;
