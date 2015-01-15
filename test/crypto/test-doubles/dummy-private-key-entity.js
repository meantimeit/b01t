var PrivateKeyEntity = require('../../../index.js').entity.PrivateKeyEntity;

var pk = new PrivateKeyEntity();
pk.setCipher('OHWOWISTHISACIPHER');

module.exports = pk;