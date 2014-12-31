var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var EncryptedMessageEntity = require('../../..').entity.EncryptedMessageEntity;
var save = require('../../..').gateway.message.save;

test('Error if no message gateway passed', function (t) {
  t.plan(2);

  save(null, null, assertErrorMessage(t, 'No message gateway provided'));
  save(undefined, null, assertErrorMessage(t, 'No message gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);

  save(noop, null, assertErrorMessage(t, 'No message provided'));
  save(noop, undefined, assertErrorMessage(t, 'No message provided'));
});

test('Error if not instance of Message', function (t) {
  t.plan(1);

  save(noop, {}, assertErrorMessage(t, 'Not a MessageEntity'));
});

test('Extracts serialised data from Message', function (t) {
  t.plan(2);

  var mockMessageGateway = {
    save: function (data, done) {
      t.deepEqual(data, {
        name: 'Test name',
        data: 'ABCDEFG',
        fields: {
          username: 'my-username'
        },
        userId: 1
      });
    }
  };
  var message = new EncryptedMessageEntity();
  message.setName('Test name');
  message.setData('ABCDEFG');
  message.setUserId(1);
  message.addField('username', 'my-username');
  var _toJSON = message.toJSON;
  message.toJSON = function () {
    t.pass();
    return _toJSON.call(message);
  };

  save(mockMessageGateway, message, noop);
});

test('Message gateway error', function (t) {
  t.plan(1);
  var errorMessageGateway = {
    save: function (data, done) {
      done(new Error('SOME MESSAGE GATEWAY ERROR'));
    }
  };
  var message = new EncryptedMessageEntity();
  save(errorMessageGateway, message, function (err) {
    t.equal(err.message, 'SOME MESSAGE GATEWAY ERROR');
  });
});

test('Message gateway returns new message with ID', function (t) {
  t.plan(1);
  var saveMessageGateway = {
    save: function (data, done) {
      data.id = 1;
      done(null, data);
    }
  };
  var message = new EncryptedMessageEntity();
  save(saveMessageGateway, message, function (err, message) {
    t.equal(message.getId(), 1);
  });
});