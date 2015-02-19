var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var assertParamInstanceOf = require('../../test-utils').assertParamInstanceOf;

var errorForUserGateway = require('../test-doubles/get-user-error-for-user-gateway');
var successfulUserGateway = require('../test-doubles/get-user-successful-user-gateway');
var UserEntity = require('../../../lib/user-entity');

var getUser = require('../../..').getUser;

test('Gateway implementation error', function (t) {
  t.plan(1);
  var options = {
    gateway: errorForUserGateway
  };
  getUser(options, 1, assertErrorMessage(t, 'GENERICGATEWAYIMPLEMENTATIONERROR'));
});

test('Successful return of user', function (t) {
  t.plan(1);
  var options = {
    gateway: successfulUserGateway
  };
  getUser(options, 1, assertParamInstanceOf(t, 2, UserEntity));
});