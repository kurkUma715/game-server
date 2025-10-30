module.exports = class vector3 {
    constructor(X = 0, Y = 0, Z = 0) {
        this.x = X;
        this.y = Y;
        this.z = Z;
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    normalized() {
        var mag = this.magnitude();
        return new vector3(this.x / mag, this.y / mag, this.z / mag)
    }

    distance(OtherVect = position) {
        var direction = new vector3();
        direction.x = OtherVect.x - this.x;
        direction.y = OtherVect.y - this.y;
        direction.z = OtherVect.z - this.z;
        return direction.magnitude;
    }

    consoleOutput() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}