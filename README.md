# b01t

**Version 0.0.0 (Still incomplete)**

Core library for the b01t password manager. The interface for b01t is a series of functions that expects a number of basic
builders and gateways that you manage.

## Generate Key Pair [`generateKeyPair(options, passphrase, done)`]

IF you wish to instantiate a fresh key pair for the current user:

    var generateKeyPair = require('b01t').generateKeyPair;
    var crypto = require('b01t').extras.pgp.crypto;
    var gateway = require('./my-gateway-implementation');
    var user = require('./my-user');
    var options = {
      crypto: crypto,
      gateway: gateway,
      user: user
    };

    generateKeyPair(options, 'PASSPHRASE', function (err) {
      // Key pair generation completed
    });

The first parameter (`options`) is an object containing the following keys:

* crypto: An object containing a crypto implementation (a PGP implementation is available in this package)
* gateway: Itself an object containing all of your storage implementations
* user: A user entity instantiated by you

The second parameter (`passphrase`) is the passphrase string that your user has entered to secure the private key

## Import Own Key Pair [`importOwnKeyPair(options, keyData, done)`]

If you wish to instantiate a fresh key pair for the current user:

    var importOwnKeyPair = require('b01t').importOwnKeyPair;
    var gateway = require('./my-gateway-implementation');
    var user = require('./my-user');
    var options = {
      gateway: gateway,
      user: user
    };

    importOwnKeyPair(options, 'PASSPHRASE', function (err) {
      // Key pair generation completed
    });

The first parameter (`options`) is an object containing the following keys:

* gateway: Itself an object containing all of your storage implementations
* user: A user entity instantiated by you

The second parameter (`passphrase`) is the passphrase string that your user has entered to secure the private key

## Get User [`getUser(options, userId, done)`]

If you want to get the user details of a specific user (namely yourself):

    var getUser = require('b01t').getUser;
    var gateway = require('./my-gateway-implementation');
    var userId = 1;
    var options = {
      gateway: gateway
    };

    getUser(options, userId, function (err, user) {
      // user entity now available to use in other b01t use cases
    });
