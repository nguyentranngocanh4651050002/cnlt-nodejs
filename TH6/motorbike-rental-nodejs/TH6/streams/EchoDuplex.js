const { Duplex } = require('stream');

class EchoDuplex extends Duplex {
    _write(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    }

    _read(size) {}
}

module.exports = EchoDuplex;