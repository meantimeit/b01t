var test = require('tape');
var assertParamEqual = require('../../test-utils').assertParamEqual;
var assertErrorMessage = require('../../test-utils').assertErrorMessage;

var encrypt = require('../../..').crypto.encrypt;
var encryptSimpleMessageMockCrypto = require('../test-doubles/encrypt-simple-message-mock-crypto.js');
var encryptErrorMockCrypto = require('../test-doubles/encrypt-error-mock-crypto.js');

var KeyEntity = require('../../..').entity.KeyEntity;

test('Error when no crypto implementation passed', function (t) {
  t.plan(2);
  encrypt(null, null, null, assertErrorMessage(t, 'No crypto passed to encrypt'));
  encrypt(undefined, null, null, assertErrorMessage(t, 'No crypto passed to encrypt'));
});

test('Error when no key passed', function (t) {
  t.plan(3);
  encrypt(encryptSimpleMessageMockCrypto, null, null, assertErrorMessage(t, 'No key passed to encrypt'));
  encrypt(encryptSimpleMessageMockCrypto, undefined, null, assertErrorMessage(t, 'No key passed to encrypt'));
  encrypt(encryptSimpleMessageMockCrypto, 'badkey', null, assertErrorMessage(t, 'Key passed to encrypt must be instance of KeyEntity'));
});

test('Error when no message passed', function (t) {
  t.plan(3);
  var mockKey = new KeyEntity();
  mockKey.setCipher('SUPERSECRETCIPHER');

  encrypt(encryptSimpleMessageMockCrypto, mockKey, null, assertErrorMessage(t, 'No message passed to encrypt'));
  encrypt(encryptSimpleMessageMockCrypto, mockKey, undefined, assertErrorMessage(t, 'No message passed to encrypt'));
  encrypt(encryptSimpleMessageMockCrypto, mockKey, 'spong', assertErrorMessage(t, 'Message passed to encrypt must be instance of DecryptedMessageEntity'));
});

//test('Encrypt simple message', function (t) {
//  t.plan(1);
//  encrypt(encryptSimpleMessageMockCrypto, 'SECRETCIPHER', 'MYSECRETMESSAGE', assertParamEqual(t, 2, 'SECRETCIPHERMYSECRETMESSAGE'));
//});
//
//test('Encrypt error', function (t) {
//  t.plan(1);
//  encrypt(encryptErrorMockCrypto, 'HULK', 'SMASH', assertErrorMessage(t, 'Some error'));
//});
