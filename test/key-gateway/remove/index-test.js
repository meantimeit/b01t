var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var KeyEntity = require('../../../lib').entity.KeyEntity;
var remove = require('../../../lib').gateway.key.remove;

test('Error if no key gateway passed', function (t) {
  t.plan(2);
  remove(null, null, assertErrorMessage(t, 'No key gateway provided'));
  remove(undefined, null, assertErrorMessage(t, 'No key gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);
  remove(noop, null, assertErrorMessage(t, 'No key provided'));
  remove(noop, undefined, assertErrorMessage(t, 'No key provided'));
});

test('Error if not instance of Key', function (t) {
  t.plan(1);
  remove(noop, {}, assertErrorMessage(t, 'Not a KeyEntity'));
});

test('Error if Key has no ID', function (t) {
  t.plan(1);
  var msg = new KeyEntity();
  remove(noop, msg, assertErrorMessage(t, 'KeyEntity has no ID'));
})

test('Passes ID to gateway', function (t) {
  t.plan(1);

  var mockKeyGateway = {
    remove: function (id, done) {
      t.equal(id, 1);
    }
  };
  var key = new KeyEntity();
  key.setId(1);
  key.setCipher('RED');

  remove(mockKeyGateway, key, noop);
});

test('Key gateway error', function (t) {
  t.plan(1);
  var errorKeyGateway = {
    remove: function (id, done) {
      done(new Error('SOME KEY GATEWAY ERROR'));
    }
  };
  var key = new KeyEntity();
  key.setId(1);
  remove(errorKeyGateway, key, function (err) {
    t.equal(err.message, 'SOME KEY GATEWAY ERROR');
  });
});

test('Key gateway calls done function with no error', function (t) {
  t.plan(1);
  var saveKeyGateway = {
    remove: function (data, done) {
      done(null);
    }
  };
  var key = new KeyEntity();
  key.setId(1);
  remove(saveKeyGateway, key, function (err, key) {
    t.ok(err === undefined);
  });
});