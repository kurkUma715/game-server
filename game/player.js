var server = require('../server.js');
var transform = require('./transform.js');

module.exports = class player {
    constructor() {
        this.id = server.generateId();
        this.profile = {
            username: '',
            banned: false,
            developer: false,
            content: {
                level: 0,
                exp: 0,
                inventory: []
            }
        };
        this.transform = new transform();
        this.state = {
            isCrouching: false,
            isRunning: false,
            isGrounded: false,
        };
    }
}