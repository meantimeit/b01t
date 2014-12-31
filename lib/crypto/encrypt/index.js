'use strict';

var KeyEntity = require('../../key-entity');
var DecryptedMessageEntity = require('../../decrypted-message-entity');

function encrypt(crypto, key, message, done) {
  if (crypto === null || crypto === undefined) {
    return done(new Error('No crypto passed to encrypt'));
  }

  if (key === null || key === undefined) {
    return done(new Error('No key passed to encrypt'));
  }

  if (!(key instanceof KeyEntity)) {
    return done(new Error('Key passed to encrypt must be instance of KeyEntity'));
  }

  if (message === null || message === undefined) {
    return done(new Error('No message passed to encrypt'));
  }

  if (!(message instanceof DecryptedMessageEntity)) {
    return done(new Error('Message passed to encrypt must be instance of DecryptedMessageEntity'));
  }

  // Call the encryptable interface with the key, message and callback
  crypto.encrypt(key, message, done);
}

module.exports = encrypt;
