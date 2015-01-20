var KeyEntity = require('../../key-entity');

function remove(keyGateway, key, done) {
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

  keyGateway.remove(key.getId(), function (err) {
    if (err) {
      return done(err);
    }

    done();
  });
}

module.exports = remove;