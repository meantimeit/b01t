var test = require('tape');
var assertParamEqual = require('../../test-utils/index').assertParamEqual;
var noop = require('../../test-utils/index').noop;

var InMemoryKeyGateway = require('../../..').extras.gateway.InMemoryKeyGateway;
var gateway;

function initialiseGateway() {
  gateway = new InMemoryKeyGateway();
}

test('Empty data when finding all', function (t) {
  t.plan(1);
  initialiseGateway();
  gateway.findAll(function (err, data) {
    t.deepEqual(data, []);
  });
});

test('Empty data when finding by ID', function (t) {
  t.plan(1);
  initialiseGateway();
  gateway.findById(1, assertParamEqual(t, 2, null));
});

test('Save 1 key', function (t) {
  t.plan(1);
  initialiseGateway();
  var keyData = {
    type: 'public',
    key: 'SOMESORTOFENCRYPTEDKEY'
  };
  gateway.save(keyData, assertParamEqual(t, 2, {
    id: 1,
    type: 'public',
    key: 'SOMESORTOFENCRYPTEDKEY'
  }));
});

test('Save 2 keys', function (t) {
  t.plan(1);
  initialiseGateway();
  var keyData1 = {
    type: 'public',
    key: 'SOMESORTOFENCRYPTEDKEY'
  };
  var keyData2 = {
    type: 'private',
    key: 'SOMESORTOFENCRYPTEDKEY2'
  };
  gateway.save(keyData1, noop);
  gateway.save(keyData2, assertParamEqual(t, 2, {
    id: 2,
    type: 'private',
    key: 'SOMESORTOFENCRYPTEDKEY2'
  }));
});

test('Save 1 key, find all', function (t) {
  t.plan(1);
  initialiseGateway();
  var keyData = {
    type: 'private',
    key: 'PRIVET'
  };
  gateway.save(keyData, function() {
    gateway.findAll(assertParamEqual(t, 2, [{
      id: 1,
      type: 'private',
      key: 'PRIVET'
    }]));
  });
});

test('Save 1 key, find by id', function (t) {
  t.plan(1);
  initialiseGateway();
  var keyData = {
    type: 'public',
    key: '123456789'
  };
  gateway.save(keyData, function() {
    gateway.findById(1, assertParamEqual(t, 2, {
      id: 1,
      type: 'public',
      key: '123456789'
    }));
  });
});

test('Update 1 key, then find by id', function (t) {
  t.plan(2);
  initialiseGateway();
  var keyData = {
    type: 'private',
    key: '123456'
  };
  gateway.save(keyData, function (err, data) {
    data.key = '090909';
    gateway.update(data, function (err, updatedData) {
      t.deepEqual(updatedData, {
        id: 1,
        type: 'private',
        key: '090909'
      });
      gateway.findById(1, function (err, data) {
        t.deepEqual(data, {
          id: 1,
          type: 'private',
          key: '090909'
        });
      });
    });
  });
});

test('Save 2 key s, find by id', function (t) {
  t.plan(1);
  initialiseGateway();
  var keyData = {
    type: 'public',
    key: '123456789',
    userId: 1
  };
  var keyData2 = {
    type: 'private',
    key: '111122',
    userId: 2
  };
  gateway.save(keyData, function() {
    gateway.save(keyData2, function () {
      gateway.findByUserId(2, assertParamEqual(t, 2, {
        id: 2,
        type: 'private',
        key: '111122',
        userId: 2
      }));
    });
  });
});

test('Remove 1 key', function (t) {
  t.plan(1);
  initialiseGateway();
  var keyData = {
    type: 'private',
    key: '91919191'
  };
  gateway.save(keyData, function () {
    gateway.remove(1, function () {
      gateway.findById(1, assertParamEqual(t, 2, null));
    });
  });
});