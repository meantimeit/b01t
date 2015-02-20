# Gateways

To create your own application, using b01t, you will need to create a gateway object for the primary b01t functions in this library. How you implement the internals is up to you, but the primary functions will expect you to provide a complete (or almost complete) gateway implementation. The gateway should be an object with the following keys:

* user
* key
* message

## User

The `user` key contains the following methods:

* findAll: `findAll(cb);`
  The cb parameter is function called on completion of the action. If there is an error, the first parameter will contain an error object
* findById: `findById(id, cb);`
  The id parameter should be the id of a user. The cb parameter is a callback function. The callback should accept an error parameter and a user object
* remove: `remove(id, cb);`
  The id parameter should be the id of a user. The cb parameter is a callback function. The callback should accept an error parameter
* save: `save(userObject, cb);`
  The userObject parameter will be a plain javascript object containing new user data. The cb parameter is a callback function. The callback should accept an error parameter and an additional parameter that contains the saved user object (with additional id field)
* update: `update(userObject, cb);`
  The userObject parameter will be a plain javascript object containing new user data. The cb parameter is a callback function. The callback should accept an error parameter

See the [InMemoryUserGateway](../lib/in-memory-message-gateway/index.js) module for a reference implementation.

## Key

TODO

See the [InKeyUserGateway](../lib/in-memory-key-gateway/index.js) module for a reference implementation.

## Message

TODO

See the [InMemoryMessageGateway](../lib/in-memory-message-gateway/index.js) module for a reference implementation.
