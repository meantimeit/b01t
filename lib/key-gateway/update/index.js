var KeyEntity = require('../../key-entity');

function update(keyGateway, key, done) {
  if (keyGateway === null || keyGateway === undefined) {
    return done(new Error('No key gateway provided'));
  }

  if (key === null || key === undefined) {
    return done(new Error('No key provided'));
  }

  if (!(key instanceof KeyEntity)) {
    return done(new Error('Not a KeyEntity'));
  }

  if (!key.getId()) {
    return done(new Error('KeyEntity has no ID'));
  }

  keyGateway.update(key.toJSON(), function (err, data) {
    if (err) {
      return done(err);
    }

    var savedKey = new KeyEntity();
    savedKey.setId(data.id);
    savedKey.setCipher(data.key);
    savedKey.setUserId(data.userId);

    done(null, savedKey);
  });
}

module.exports = update;
