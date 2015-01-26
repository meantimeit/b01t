var test = require('tape');
var assertParamEqual = require('../../test-utils/index').assertParamEqual;
var noop = require('../../test-utils/index').noop;

var InMemoryMessageGateway = require('../../..').extras.gateway.InMemoryMessageGateway;
var gateway;

function initialiseGateway() {
  gateway = new InMemoryMessageGateway();
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

test('Save 1 message', function (t) {
  t.plan(1);
  initialiseGateway();
  var messageData = {
    name: 'TESTNAME',
    data: 'THISISENCRYPTEDHONEST'
  };
  gateway.save(messageData, assertParamEqual(t, 2, {
    id: 1,
    name: 'TESTNAME',
    data: 'THISISENCRYPTEDHONEST'
  }));
});

test('Save 2 messages', function (t) {
  t.plan(1);
  initialiseGateway();
  var messageData1 = {
    name: 'TESTNAME',
    data: 'THISISENCRYPTEDHONEST'
  };
  var messageData2 = {
    name: 'TESTNAME2',
    data: 'THISISENCRYPTEDHONEST2'
  };
  gateway.save(messageData1, noop);
  gateway.save(messageData2, assertParamEqual(t, 2, {
    id: 2,
    name: 'TESTNAME2',
    data: 'THISISENCRYPTEDHONEST2'
  }));
});

test('Save 1 message, find all', function (t) {
  t.plan(1);
  initialiseGateway();
  var messageData = {
    name: 'TESTNAME',
    data: 'THISISENCRYPTEDHONEST'
  };
  gateway.save(messageData, function() {
    gateway.findAll(assertParamEqual(t, 2, [{
      id: 1,
      name: 'TESTNAME',
      data: 'THISISENCRYPTEDHONEST'
    }]));
  });
});

test('Save 1 message, find by id', function (t) {
  t.plan(1);
  initialiseGateway();
  var messageData = {
    name: 'TESTNAME',
    data: 'THISISENCRYPTEDHONEST'
  };
  gateway.save(messageData, function() {
    gateway.findById(1, assertParamEqual(t, 2, {
      id: 1,
      name: 'TESTNAME',
      data: 'THISISENCRYPTEDHONEST'
    }));
  });
});

test('Update 1 message, then find by id', function (t) {
  t.plan(2);
  initialiseGateway();
  var messageData = {
    name: 'TESTNAME',
    data: 'THISISENCRYPTEDHONEST'
  };
  gateway.save(messageData, function (err, data) {
    data.name = 'NEWTESTNAME';
    gateway.update(data, function (err, updatedData) {
      t.deepEqual(updatedData, {
        id: 1,
        name: 'NEWTESTNAME',
        data: 'THISISENCRYPTEDHONEST'
      });
      gateway.findById(1, function (err, data) {
        t.deepEqual(data, {
          id: 1,
          name: 'NEWTESTNAME',
          data: 'THISISENCRYPTEDHONEST'
        });
      });
    });
  });
});

test('Remove 1 message', function (t) {
  t.plan(1);
  initialiseGateway();
  var messageData = {
    name: 'TESTNAME',
    data: 'THISISENCRYPTEDHONEST'
  };
  gateway.save(messageData, function () {
    gateway.remove(1, function () {
      gateway.findById(1, assertParamEqual(t, 2, null));
    });
  });
});