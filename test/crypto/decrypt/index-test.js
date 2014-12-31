var test = require('tape');
var assertParamEqual = require('../../test-utils').assertParamEqual;
var assertErrorMessage = require('../../test-utils').assertErrorMessage;

var decrypt = require('../../..').crypto.decrypt;
var decryptSimpleMessageMockCrypto = require('../test-doubles/decrypt-simple-message-mock-crypto.js');
var decryptErrorMockCrypto = require('../test-doubles/decrypt-error-mock-crypto.js');

test('Decrypt simple message', function (t) {
  t.plan(1);
  decrypt(decryptSimpleMessageMockCrypto, 'SECRET', 'PASSWORD', 'ISECRETLSECRETISECRETKSECRETESECRETOSECRETWSECRETLSECRETSSECRET', assertParamEqual(t, 2, 'ILIKEOWLS'));
});

test('Decrypt error', function (t) {
  t.plan(1);
  decrypt(decryptErrorMockCrypto, 'PUNYHUMAN', 'HULK', 'SMASH', assertErrorMessage(t, 'Some error'));
});
