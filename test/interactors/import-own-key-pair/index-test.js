var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var assertParamEqual = require('../../test-utils').assertParamEqual;

var user = require('../test-doubles/import-own-key-pair-user-entity');
var errorForPublicKeyGateway = require('../test-doubles/import-own-key-pair-error-for-public-key-gateway');
var errorForPrivateKeyGateway = require('../test-doubles/import-own-key-pair-error-for-private-key-gateway');
var successfulGateway = require('../test-doubles/import-own-key-pair-successful-gateway');

var importOwnKeyPair = require('../../..').importOwnKeyPair;

test('Gateway implementation error for public key', function (t) {
  t.plan(1);
  var options = {
    user: user,
    gateway: errorForPublicKeyGateway
  };
  var keyData = {
    public: 'P00BLEEK',
    private: 'PREYEVETTE'
  };
  importOwnKeyPair(options, keyData, assertErrorMessage(t, 'SOMEGENERICGATEWAYERROR'));
});

test('Gateway implementation error for private key', function (t) {
  t.plan(1);
  var options = {
    user: user,
    gateway: errorForPrivateKeyGateway()
  };
  var keyData = {
    public: 'P00BLEEK',
    private: 'PREYEVETTE'
  };
  importOwnKeyPair(options, keyData, assertErrorMessage(t, 'SOMEGENERICGATEWAYERROR'));
});

test('Successful import', function (t) {
  t.plan(1);
  var options = {
    user: user,
    gateway: successfulGateway
  };
  var keyData = {
    public: 'P00BLEEK',
    private: 'PREYEVETTE'
  };
  importOwnKeyPair(options, keyData, assertParamEqual(t, 1, null));
});
