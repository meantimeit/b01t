# Crypto

Certain library functions will expect you to pass a crypto implementation. By default, b01t ships with an OpenPGP implementation that you may use:

```javascript
var crypto = require('b01t').extras.pgp.crypto;
```

See the [b01t-pgp-crypto](https://github.com/meantimeit/b01t-pgp-crypto) code for further information.
