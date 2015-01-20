var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var KeyEntity = require('../../../lib').entity.KeyEntity;
var PublicKeyEntity = require('../../../lib').entity.PublicKeyEntity;
var save = require('../../../lib').gateway.key.save;

test('Error if no key gateway passed', function (t) {
  t.plan(2);

  save(null, null, assertErrorMessage(t, 'No key gateway provided'));
  save(undefined, null, assertErrorMessage(t, 'No key gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);

  save(noop, null, assertErrorMessage(t, 'No key provided'));
  save(noop, undefined, assertErrorMessage(t, 'No key provided'));
});

test('Error if not instance of Message', function (t) {
  t.plan(1);

  save(noop, {}, assertErrorMessage(t, 'Not a KeyEntity'));
});

test('Extracts serialised data from Key', function (t) {
  t.plan(2);

  var mockKeyGateway = {
    save: function (data, done) {
      t.deepEqual(data, {
        id: 1,
        type: 'public',
        key: 'HEREBEDRAGONS',
        userId: 1
      });
    }
  };
  var key = new PublicKeyEntity();
  key.setId(1);
  key.setCipher('HEREBEDRAGONS');
  key.setUserId(1);
  var _toJSON = key.toJSON;
  key.toJSON = function () {
    t.pass();
    return _toJSON.call(key);
  };

  save(mockKeyGateway, key, noop);
});

test('Key gateway error', function (t) {
  t.plan(1);
  var errorKeyGateway = {
    save: function (data, done) {
      done(new Error('SOME KEY GATEWAY ERROR'));
    }
  };
  var key = new KeyEntity();
  save(errorKeyGateway, key, function (err) {
    t.equal(err.message, 'SOME KEY GATEWAY ERROR');
  });
});

test('Key gateway returns new key with ID', function (t) {
  t.plan(1);
  var saveKeyGateway = {
    save: function (data, done) {
      data.id = 1;
      done(null, data);
    }
  };
  var key = new KeyEntity();
  save(saveKeyGateway, key, function (err, key) {
    t.equal(key.getId(), 1);
  });
});