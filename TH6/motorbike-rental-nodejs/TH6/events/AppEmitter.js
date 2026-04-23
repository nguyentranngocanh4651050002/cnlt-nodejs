const EventEmitter = require('events');

class BikeEmitter extends EventEmitter {
    constructor() {
        super();
        this.totalRent = 0;
    }

    rentBike(id) {
        this.totalRent++;
        this.emit('rent', `Xe ${id} đã được thuê`);
    }

    returnBike(id) {
        this.emit('return', `Xe ${id} đã được trả`);
    }
}

module.exports = new BikeEmitter();