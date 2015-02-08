var curry = require('prelude-ls').curry;
var createPair = require('../crypto').createPair;
var keyBuilder = require('../key-builder');
var keyGateway = require('../key-gateway');
var doBoth = require('../do-all')(2);

function generateNewKeyPair(options, passphrase, done) {
  createPair(options.crypto, keyBuilder, options.user, passphrase, function (err, keyPair) {
    if (err) { return done(err); }
    var doneBoth = doBoth(done);
    keyGateway.save(options.gateway.key, keyPair[0], doneBoth);
    keyGateway.save(options.gateway.key, keyPair[1], doneBoth);
  });
}

module.exports = curry(generateNewKeyPair);
