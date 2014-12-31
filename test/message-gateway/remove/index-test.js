var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var EncryptedMessageEntity = require('../../..').entity.EncryptedMessageEntity;
var remove = require('../../..').gateway.message.remove;

test('Error if no message gateway passed', function (t) {
  t.plan(2);
  remove(null, null, assertErrorMessage(t, 'No message gateway provided'));
  remove(undefined, null, assertErrorMessage(t, 'No message gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);
  remove(noop, null, assertErrorMessage(t, 'No message provided'));
  remove(noop, undefined, assertErrorMessage(t, 'No message provided'));
});

test('Error if not instance of Message', function (t) {
  t.plan(1);
  remove(noop, {}, assertErrorMessage(t, 'Not a MessageEntity'));
});

test('Error if Message has no ID', function (t) {
  t.plan(1);
  var msg = new EncryptedMessageEntity();
  remove(noop, msg, assertErrorMessage(t, 'MessageEntity has no ID'));
})

test('Passes ID to gateway', function (t) {
  t.plan(1);

  var mockMessageGateway = {
    remove: function (id, done) {
      t.equal(id, 1);
    }
  };
  var message = new EncryptedMessageEntity();
  message.setId(1);
  message.setName('Test name');
  message.setData('ABCDEFG');
  message.addField('username', 'my-username');

  remove(mockMessageGateway, message, noop);
});

test('Message gateway error', function (t) {
  t.plan(1);
  var errorMessageGateway = {
    remove: function (id, done) {
      done(new Error('SOME MESSAGE GATEWAY ERROR'));
    }
  };
  var message = new EncryptedMessageEntity();
  message.setId(1);
  remove(errorMessageGateway, message, function (err) {
    t.equal(err.message, 'SOME MESSAGE GATEWAY ERROR');
  });
});

test('Message gateway calls done function with no error', function (t) {
  t.plan(1);
  var saveMessageGateway = {
    remove: function (data, done) {
      done(null);
    }
  };
  var message = new EncryptedMessageEntity();
  message.setId(1);
  remove(saveMessageGateway, message, function (err, message) {
    t.ok(err === undefined);
  });
});