var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var noop = require('../../test-utils').noop;

var UserEntity = require('../../../lib').entity.UserEntity;
var remove = require('../../../lib').gateway.user.remove;

test('Error if no user gateway passed', function (t) {
  t.plan(2);
  remove(null, null, assertErrorMessage(t, 'No user gateway provided'));
  remove(undefined, null, assertErrorMessage(t, 'No user gateway provided'));
});

test('Error if no entity passed', function (t) {
  t.plan(2);
  remove(noop, null, assertErrorMessage(t, 'No user provided'));
  remove(noop, undefined, assertErrorMessage(t, 'No user provided'));
});

test('Error if not instance of User', function (t) {
  t.plan(1);
  remove(noop, {}, assertErrorMessage(t, 'Not a UserEntity'));
});

test('Error if User has no ID', function (t) {
  t.plan(1);
  var msg = new UserEntity();
  remove(noop, msg, assertErrorMessage(t, 'UserEntity has no ID'));
})

test('Passes ID to gateway', function (t) {
  t.plan(1);

  var mockUserGateway = {
    remove: function (id, done) {
      t.equal(id, 1);
    }
  };
  var user = new UserEntity();
  user.setId(1);
  user.setName('Test name');
  user.setEmail('connrs@example.com');

  remove(mockUserGateway, user, noop);
});

test('User gateway error', function (t) {
  t.plan(1);
  var errorUserGateway = {
    remove: function (id, done) {
      done(new Error('SOME USER GATEWAY ERROR'));
    }
  };
  var user = new UserEntity();
  user.setId(1);
  remove(errorUserGateway, user, function (err) {
    t.equal(err.message, 'SOME USER GATEWAY ERROR');
  });
});

test('User gateway calls done function with no error', function (t) {
  t.plan(1);
  var saveUserGateway = {
    remove: function (data, done) {
      done(null);
    }
  };
  var user = new UserEntity();
  user.setId(1);
  remove(saveUserGateway, user, function (err, user) {
    t.ok(err === undefined);
  });
});