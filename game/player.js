var server = require('../server.js');
var transform = require('./transform.js');

module.exports = class player {
    constructor() {
        this.id = server.generateId();
        this.transform = new transform();
        this.state = {
            isCrouching: false,
            isRunning: false
        }
    }
}