var test = require('tape');
var assertErrorMessage = require('../../test-utils/index').assertErrorMessage;
var noop = require('../../test-utils/index').noop;

var UserEntity = require('../../../lib/index').entity.UserEntity;
var save = require('../../../lib/index').gateway.user.save;

test('Error if no user gateway passed', function (t) {
  t.plan(2);

  save(null, null, assertErrorMessage(t, 'No user gateway provided'));
  save(undefined, null, assertErrorMessage(t, 'No user gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);

  save(noop, null, assertErrorMessage(t, 'No user provided'));
  save(noop, undefined, assertErrorMessage(t, 'No user provided'));
});

test('Error if not instance of User', function (t) {
  t.plan(1);

  save(noop, {}, assertErrorMessage(t, 'Not a UserEntity'));
});

test('Extracts serialised data from User', function (t) {
  t.plan(2);

  var mockUserGateway = {
    save: function (data, done) {
      t.deepEqual(data, {
        name: 'connrs',
        email: 'connrs@example.com'
      });
    }
  };
  var user = new UserEntity();
  user.setName('connrs');
  user.setEmail('connrs@example.com');
  var _toJSON = user.toJSON;
  user.toJSON = function () {
    t.pass();
    return _toJSON.call(user);
  };

  save(mockUserGateway, user, noop);
});

test('User gateway error', function (t) {
  t.plan(1);
  var errorUserGateway = {
    save: function (data, done) {
      done(new Error('SOME USER GATEWAY ERROR'));
    }
  };
  var user = new UserEntity();
  save(errorUserGateway, user, function (err) {
    t.equal(err.message, 'SOME USER GATEWAY ERROR');
  });
});

test('User gateway returns new user with ID', function (t) {
  t.plan(1);
  var saveUserGateway = {
    save: function (data, done) {
      data.id = 1;
      done(null, data);
    }
  };
  var user = new UserEntity();
  save(saveUserGateway, user, function (err, user) {
    t.equal(user.getId(), 1);
  });
});