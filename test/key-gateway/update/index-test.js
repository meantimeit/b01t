var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var KeyEntity = require('../../../lib').entity.KeyEntity;
var PrivateKeyEntity = require('../../../lib').entity.PrivateKeyEntity;
var update = require('../../../lib').gateway.key.update;

test('Error if no key gateway passed', function (t) {
  t.plan(2);
  update(null, null, assertErrorMessage(t, 'No key gateway provided'));
  update(undefined, null, assertErrorMessage(t, 'No key gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);
  update(noop, null, assertErrorMessage(t, 'No key provided'));
  update(noop, undefined, assertErrorMessage(t, 'No key provided'));
});

test('Error if not instance of Key', function (t) {
  t.plan(1);
  update(noop, {}, assertErrorMessage(t, 'Not a KeyEntity'));
});

test('Error if Key has no ID', function (t) {
  t.plan(1);
  var msg = new KeyEntity();
  update(noop, msg, assertErrorMessage(t, 'KeyEntity has no ID'));
});

test('Extracts serialised data from Key', function (t) {
  t.plan(2);

  var mockKeyGateway = {
    update: function (data, done) {
      t.deepEqual(data, {
        id: 1,
        type: 'private',
        key: 'OHMYOHMY',
        userId: 1
      });
    }
  };
  var key = new PrivateKeyEntity();
  key.setId(1);
  key.setCipher('OHMYOHMY');
  key.setUserId(1);
  var _toJSON = key.toJSON;
  key.toJSON = function () {
    t.pass();
    return _toJSON.call(key);
  };

  update(mockKeyGateway, key, noop);
});

test('Key gateway error', function (t) {
  t.plan(1);
  var errorKeyGateway = {
    update: function (data, done) {
      done(new Error('SOME KEY GATEWAY ERROR'));
    }
  };
  var key = new KeyEntity();
  key.setId(1);
  update(errorKeyGateway, key, function (err) {
    t.equal(err.message, 'SOME KEY GATEWAY ERROR');
  });
});

test('Key gateway returns new key with ID', function (t) {
  t.plan(1);
  var saveKeyGateway = {
    update: function (data, done) {
      data.id = 1;
      done(null, data);
    }
  };
  var key = new KeyEntity();
  key.setId(1);
  update(saveKeyGateway, key, function (err, key) {
    t.equal(key.getId(), 1);
  });
});