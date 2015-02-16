var userBuilder = require('../../../lib').builder.user;

module.exports = userBuilder({
  id: 1,
  name: 'Jane Doe',
  email: 'jane.doe@example.com'
});
