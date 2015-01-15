var test = require('tape');
var assertParamEqual = require('../../test-utils').assertParamEqual;
var assertErrorMessage = require('../../test-utils').assertErrorMessage;

var decrypt = require('../../../lib').crypto.decrypt;
var decryptSimpleMessageMockCrypto = require('../test-doubles/decrypt-simple-message-mock-crypto.js');
var decryptErrorMockCrypto = require('../test-doubles/decrypt-error-mock-crypto.js');

test('Error when no crypto implementation passed', function (t) {
  t.plan(2);
  decrypt(null, null, null, null, assertErrorMessage(t, 'No crypto passed to decrypt'));
  decrypt(undefined, null, null, null, assertErrorMessage(t, 'No crypto passed to decrypt'));
});

test('Error when no key passed', function (t) {
  t.plan(3);
  decrypt(decryptSimpleMessageMockCrypto, null, null, null, assertErrorMessage(t, 'No key passed to decrypt'));
  decrypt(decryptSimpleMessageMockCrypto, undefined, null, null, assertErrorMessage(t, 'No key passed to decrypt'));
  decrypt(decryptSimpleMessageMockCrypto, 'badkey', null, null, assertErrorMessage(t, 'Key passed to decrypt must be instance of KeyEntity'));
});

//test('Decrypt simple message', function (t) {
//  t.plan(1);
//  decrypt(decryptSimpleMessageMockCrypto, 'SECRET', 'PASSWORD', 'ISECRETLSECRETISECRETKSECRETESECRETOSECRETWSECRETLSECRETSSECRET', assertParamEqual(t, 2, 'ILIKEOWLS'));
//});

//test('Decrypt error', function (t) {
//  t.plan(1);
//  decrypt(decryptErrorMockCrypto, 'PUNYHUMAN', 'HULK', 'SMASH', assertErrorMessage(t, 'Some error'));
//});
