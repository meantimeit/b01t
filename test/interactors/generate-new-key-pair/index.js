var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var assertParamEqual = require('../../test-utils').assertParamEqual;

var user = require('../test-doubles/generate-new-key-pair-user-entity');
var errorCrypto = require('../test-doubles/generate-new-key-pair-error-crypto');
var mockCrypto = require('../test-doubles/generate-new-key-pair-mock-crypto');
var errorForPublicKeyGateway = require('../test-doubles/generate-new-key-pair-error-for-public-key-gateway');
var errorForPrivateKeyGateway = require('../test-doubles/generate-new-key-pair-error-for-private-key-gateway');
var successfulGateway = require('../test-doubles/generate-new-key-pair-successful-gateway');

var generateNewKeyPair = require('../../..').generateNewKeyPair;

test('Crypto implementation error', function (t) {
  t.plan(1);
  var options = {
    crypto: errorCrypto,
    user: user
  };
  generateNewKeyPair(options, 'p4ss', assertErrorMessage(t, 'SOMECRYPTOIMPLEMENTATIONERROR'));
});

test('Gateway implementation error for public key', function (t) {
  t.plan(1);
  var options = {
    crypto: mockCrypto,
    user: user,
    gateway: errorForPublicKeyGateway
  };
  generateNewKeyPair(options, 'p4ss', assertErrorMessage(t, 'SOMEKEYGATEWAYIMPLEMENTATIONERROR'));
});

test('Gateway implementation error for private key', function (t) {
  t.plan(1);
  var options = {
    crypto: mockCrypto,
    user: user,
    gateway: errorForPrivateKeyGateway()
  };
  generateNewKeyPair(options, 'p4ss', assertErrorMessage(t, 'SOMEKEYGATEWAYIMPLEMENTATIONERROR'));
});

test('Successful keyPair generation', function (t) {
  t.plan(1);
  var options = {
    crypto: mockCrypto,
    user: user,
    gateway: successfulGateway
  };
  generateNewKeyPair(options, 'p4ss', assertParamEqual(t, 1, null));
});