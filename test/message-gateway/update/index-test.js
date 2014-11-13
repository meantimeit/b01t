var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var EncryptedMessageEntity = require('lib/encrypted-message-entity');
var update = require('lib/message-gateway').update;

test('Error if no message gateway passed', function (t) {
  t.plan(2);
  update(null, null, assertErrorMessage(t, 'No message gateway provided'));
  update(undefined, null, assertErrorMessage(t, 'No message gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);
  update(noop, null, assertErrorMessage(t, 'No message provided'));
  update(noop, undefined, assertErrorMessage(t, 'No message provided'));
});

test('Error if not instance of Message', function (t) {
  t.plan(1);
  update(noop, {}, assertErrorMessage(t, 'Not a MessageEntity'));
});

test('Error if Message has no ID', function (t) {
  t.plan(1);
  var msg = new EncryptedMessageEntity();
  update(noop, msg, assertErrorMessage(t, 'MessageEntity has no ID'));
})

test('Extracts serialised data from Message', function (t) {
  t.plan(2);

  var mockMessageGateway = {
    update: function (data, done) {
      t.deepEqual(data, {
        id: 1,
        name: 'Test name',
        data: 'ABCDEFG',
        fields: {
          username: 'my-username'
        }
      });
    }
  };
  var message = new EncryptedMessageEntity();
  message.setID(1);
  message.setName('Test name');
  message.setData('ABCDEFG');
  message.addField('username', 'my-username');
  var _toJSON = message.toJSON;
  message.toJSON = function () {
    t.pass();
    return _toJSON.call(message);
  };

  update(mockMessageGateway, message, noop);
});

test('Message gateway error', function (t) {
  t.plan(1);
  var errorMessageGateway = {
    update: function (data, done) {
      done(new Error('SOME MESSAGE GATEWAY ERROR'));
    }
  };
  var message = new EncryptedMessageEntity();
  message.setID(1);
  update(errorMessageGateway, message, function (err) {
    t.equal(err.message, 'SOME MESSAGE GATEWAY ERROR');
  });
});

test('Message gateway returns new message with ID', function (t) {
  t.plan(1);
  var saveMessageGateway = {
    update: function (data, done) {
      data.id = 1;
      done(null, data);
    }
  };
  var message = new EncryptedMessageEntity();
  message.setID(1);
  update(saveMessageGateway, message, function (err, message) {
    t.equal(message.getID(), 1);
  });
});