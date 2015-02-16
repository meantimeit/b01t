var curry = require('prelude-ls').curry;
var keyGateway = require('../key-gateway');
var keyBuilder = require('../key-builder');
var doBoth = require('../do-all')(2);

function importOwnKeyPair(options, keyData, done) {
  var publicKey = keyBuilder({
    type: 'public',
    key: keyData.public,
    userId: options.user.getId()
  });
  var privateKey = keyBuilder({
    type: 'private',
    key: keyData.private,
    userId: options.user.getId()
  });
  var doneBoth = doBoth(done);

  keyGateway.save(options.gateway.key, publicKey, doneBoth);
  keyGateway.save(options.gateway.key, privateKey, doneBoth);
}

module.exports = curry(importOwnKeyPair);
