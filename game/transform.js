var vector3 = require('./vector3.js');
var quaternion = require('./quaternion.js');

module.exports = class transform {
    constructor() {
        this.position = new vector3();
        this.bodyRotation = new quaternion();
        this.spineRotation = new quaternion();
        this.headRotation = new quaternion();
    }
}