var test = require('tape');
var assertThrowsWithMessage = require('../../test-utils/index').assertThrowsWithMessage;
var dummyPrivateKeyEntity = require('../test-doubles/dummy-private-key-entity.js');

var PublicKeyEntity = require('../../..').entity.PublicKeyEntity;
var PrivateKeyEntity = require('../../..').entity.PrivateKeyEntity;
var deprotectKey = require('../../..').crypto.deprotectKey;

test('Throws error if no crypto passed', function (t) {
  t.plan(2);
  assertThrowsWithMessage(t, deprotectKey.bind(null), 'No crypto');
  assertThrowsWithMessage(t, deprotectKey.bind(null, null), 'No crypto');
});

test('Throws error if no private key passed', function (t) {
  t.plan(3);
  assertThrowsWithMessage(t, deprotectKey.bind(null, {}), 'No private key');
  assertThrowsWithMessage(t, deprotectKey.bind(null, {}, null), 'No private key');
  assertThrowsWithMessage(t, deprotectKey.bind(null, {}, 'badkey'), 'Private key must be an instance of PrivateKeyEntity');
});

test('Throws error if no password passed', function (t) {
  t.plan(2);
  assertThrowsWithMessage(t, deprotectKey.bind(null, {}, dummyPrivateKeyEntity), 'No password');
  assertThrowsWithMessage(t, deprotectKey.bind(null, {}, dummyPrivateKeyEntity, null), 'No password');
});

test('Returns PublicKeyEntity', function (t) {
  t.plan(4);
  var crypto = {
    deprotectKey: function (cipher, password) {
      t.equal(cipher, 'OHWOWISTHISACIPHER');
      t.equal(password, 'AWESOMEPASSWORD');
      return 'OHNOESANUNLOCKEDCIPHER';
    }
  };
  var pubKey = deprotectKey(crypto, dummyPrivateKeyEntity, 'AWESOMEPASSWORD');
  t.ok(pubKey instanceof PublicKeyEntity);
  t.equal(pubKey.getCipher(), 'OHNOESANUNLOCKEDCIPHER');
});