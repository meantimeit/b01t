'use strict';

var KeyEntity = require('../../key-entity');
var DecryptedMessageEntity = require('../../decrypted-message-entity');
var EncryptedMessageEntity = require('../../encrypted-message-entity');

function validateArguments(crypto, key, message) {
  if (crypto === null || crypto === undefined) {
    return new Error('No crypto passed to encrypt');
  }

  if (key === null || key === undefined) {
    return new Error('No key passed to encrypt');
  }

  if (!(key instanceof KeyEntity)) {
    return new Error('Key passed to encrypt must be instance of KeyEntity');
  }

  if (message === null || message === undefined) {
    return new Error('No message passed to encrypt');
  }

  if (!(message instanceof DecryptedMessageEntity)) {
    return new Error('Message passed to encrypt must be instance of DecryptedMessageEntity');
  }
}

function createEncryptedMessageFromDecryptedMessage(message) {
  var encryptedMessage = new EncryptedMessageEntity();
  encryptedMessage.setName(message.getName());
  encryptedMessage.setUserId(message.getUserId());
  return encryptedMessage;
}

function doEncryption(crypto, key, message, done) {
  var encryptedMessage = createEncryptedMessageFromDecryptedMessage(message);
  var encryptCounter = 2;

  function encryptionDone() {
    if (!--encryptCounter) {
      done(null, encryptedMessage);
    }
  }

  crypto.encrypt(key.getCipher(), JSON.stringify(message.getData()), function (err, message) {
    encryptedMessage.setData(message);
    encryptionDone();
  });

  crypto.encrypt(key.getCipher(), JSON.stringify(message.getFields()), function (err, fields) {
    encryptedMessage.addFields(fields);
    encryptionDone();
  });
}

function encrypt(crypto, key, message, done) {
  var error = validateArguments(crypto, key, message);
  if (error instanceof Error) { return done(error); }
  doEncryption(crypto, key, message, done);
}

module.exports = encrypt;
