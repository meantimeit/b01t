var test = require('tape');

var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var dummyCrypto = require('../test-doubles/dummy-crypto.js');
var dummyKeyBuilder = require('../test-doubles/dummy-key-builder.js');
var createPairUserEntity = require('../test-doubles/create-pair-user-entity.js');
var createPairSuccessMockCrypto = require('../test-doubles/create-pair-success-mock-crypto.js');
var createPairErrorMockCrypto = require('../test-doubles/create-pair-error-mock-crypto.js');

var keyBuilder = require('../../../lib').keyBuilder;
var KeyEntity = require('../../../lib').entity.KeyEntity;
var PublicKeyEntity = require('../../../lib').entity.PublicKeyEntity;
var PrivateKeyEntity = require('../../../lib').entity.PrivateKeyEntity;

var createPair = require('../../../lib').crypto.createPair;

test('No crypto implementation', function (t) {
  t.plan(2);
  createPair(null, null, null, null, assertErrorMessage(t, 'No crypto implementation'));
  createPair(undefined, null, null, null, assertErrorMessage(t, 'No crypto implementation'));
});

test('No message builder', function (t) {
  t.plan(2);
  createPair(dummyCrypto, null, null, null, assertErrorMessage(t, 'No message builder'));
  createPair(dummyCrypto, undefined, null, null, assertErrorMessage(t, 'No message builder'));
});

test('No user entity', function (t) {
  t.plan(2);

  createPair(dummyCrypto, dummyKeyBuilder, null, null, assertErrorMessage(t, 'No user entity'));
  createPair(dummyCrypto, dummyKeyBuilder, undefined, null, assertErrorMessage(t, 'No user entity'));
});

test('createPair error', function (t) {
  t.plan(1);
  createPair(createPairErrorMockCrypto, dummyKeyBuilder, createPairUserEntity, '', assertErrorMessage(t, 'FAIL'));
});

test('Calls createPair on crypto implementation', function (t) {
  t.plan(3);
  var mockCrypto = {
    createPair: function (userId, passphrase, done) {
      t.equal(userId, 'jane <jame@example.org>');
      t.equal(passphrase, 'TESTPass');
      t.pass();
      done(null, {});
    }
  };
  createPair(mockCrypto, dummyKeyBuilder, createPairUserEntity, 'TESTPass', noop);
});

test('Creates 2 keys with key builder', function (t) {
  t.plan(4);

  function mockKeyBuilder(keyData) {
    t.ok(keyData.key !== undefined);
    t.equal(keyData.userId, 1);
  }

  createPair(createPairSuccessMockCrypto, mockKeyBuilder, createPairUserEntity, 'potato', noop);
});

test('Creates KeyEntities', function (t) {
  t.plan(8);

  createPair(createPairSuccessMockCrypto, keyBuilder, createPairUserEntity, 'potato', function (err, keyPair) {
    t.ok(keyPair[0] instanceof PublicKeyEntity, 'First key is PublicKeyEntity');
    t.ok(keyPair[1] instanceof PrivateKeyEntity, 'Second key is PrivateKeyEntity');
    t.ok(keyPair[0] instanceof KeyEntity, 'First key is derivative of KeyEntity');
    t.ok(keyPair[1] instanceof KeyEntity, 'Second key is derivative of KeyEntity');
    t.equal(keyPair[0].getCipher(), 'PUBKEY', 'Public key is correct');
    t.equal(keyPair[1].getCipher(), 'PRIVKEY', 'Private key is correct');
    t.equal(keyPair[0].getUserId(), 1, 'User ID is correct');
    t.equal(keyPair[1].getUserId(), 1, 'User ID is correct');
  });
});
