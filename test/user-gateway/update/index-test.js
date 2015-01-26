var test = require('tape');
var assertErrorMessage = require('../../test-utils/index').assertErrorMessage;
var noop = require('../../test-utils/index').noop;

var UserEntity = require('../../../lib/index').entity.UserEntity;
var update = require('../../../lib/index').gateway.user.update;

test('Error if no user gateway passed', function (t) {
  t.plan(2);
  update(null, null, assertErrorMessage(t, 'No user gateway provided'));
  update(undefined, null, assertErrorMessage(t, 'No user gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);
  update(noop, null, assertErrorMessage(t, 'No user provided'));
  update(noop, undefined, assertErrorMessage(t, 'No user provided'));
});

test('Error if not instance of User', function (t) {
  t.plan(1);
  update(noop, {}, assertErrorMessage(t, 'Not a UserEntity'));
});

test('Error if User has no ID', function (t) {
  t.plan(1);
  var msg = new UserEntity();
  update(noop, msg, assertErrorMessage(t, 'UserEntity has no ID'));
});

test('Extracts serialised data from User', function (t) {
  t.plan(2);

  var mockUserGateway = {
    update: function (data, done) {
      t.deepEqual(data, {
        id: 1,
        name: 'connrs',
        email: 'connrs@example.com'
      });
    }
  };
  var user = new UserEntity();
  user.setId(1);
  user.setName('connrs');
  user.setEmail('connrs@example.com');
  var _toJSON = user.toJSON;
  user.toJSON = function () {
    t.pass();
    return _toJSON.call(user);
  };

  update(mockUserGateway, user, noop);
});

test('User gateway error', function (t) {
  t.plan(1);
  var errorUserGateway = {
    update: function (data, done) {
      done(new Error('SOME USER GATEWAY ERROR'));
    }
  };
  var user = new UserEntity();
  user.setId(1);
  update(errorUserGateway, user, function (err) {
    t.equal(err.message, 'SOME USER GATEWAY ERROR');
  });
});

test('User gateway returns new user with ID', function (t) {
  t.plan(1);
  var saveUserGateway = {
    update: function (data, done) {
      data.id = 1;
      done(null, data);
    }
  };
  var user = new UserEntity();
  user.setId(1);
  update(saveUserGateway, user, function (err, user) {
    t.equal(user.getId(), 1);
  });
});