var test = require('tape');
var assertCallbackError = require('../../test-utils').assertCallbackError;
var noop = require('../../test-utils').noop;

var findAll = require('../../../lib').gateway.key.findAll;
var validFindAllDataKeyGateway = require('../test-doubles/valid-findall-data-key-gateway.js');
var keyBuilder = require('../../../lib').builder.key;
var PublicKeyEntity = require('../../../lib').entity.PublicKeyEntity;

test('Given no key gateway then error', function (t) {
  t.plan(2);

  findAll(null, null, assertCallbackError(t, 'No key gateway provided'));
  findAll(undefined, null, assertCallbackError(t, 'No key gateway provided'));
});

test('Given no key builder then error', function (t) {
  t.plan(2);

  findAll(noop, null, assertCallbackError(t, 'No key builder provided'));
  findAll(noop, undefined, assertCallbackError(t, 'No key builder provided'));
});

test('When error then propagate error', function (t) {
  t.plan(1);

  var keyGateway = {
    findAll: function (done) {
      done(new Error('GENERIC FETCH ERROR'));
    }
  };

  findAll(keyGateway, noop, assertCallbackError(t, 'GENERIC FETCH ERROR'));
});

test('When successful, pass data to builder', function (t) {
  t.plan(1);

  var keyBuilder = function (data) {
    t.deepEqual(data, {
      id: 1,
      type: 'public',
      key: 'HEREBEDRAGONS',
      userId: 1
    });
  };

  findAll(validFindAllDataKeyGateway, keyBuilder, noop);
});

test('Data sent to builder returned to callback', function (t) {
  t.plan(2);
  findAll(validFindAllDataKeyGateway, keyBuilder, function (err, data) {
    t.ok(data[0] instanceof PublicKeyEntity);
    t.equal(data[0].getCipher(), 'HEREBEDRAGONS');
  });
});
