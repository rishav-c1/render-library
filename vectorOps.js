const Vector = Object.create(null);

Vector.crossProduct = function ([x1, y1, z1], [x2, y2, z2]) {
    return [
        y1 * z2 - z1 * y2,
        z1 * x2 - x1 * z2,
        x1 * y2 - y1 * x2
    ];
};

Vector.dotProduct = function ([x1, y1, z1], [x2, y2, z2]) {
    return x1 * x2 + y1 * y2 + z1 * z2;
};

Vector.addVector = function ([x1, y1, z1], [x2, y2, z2], vector3) {
    if (vector3 === undefined) {
        vector3 = [0, 0, 0];
    }
    return [
        x1 + x2 + vector3[0],
        y1 + y2 + vector3[1],
        z1 + z2 + vector3[2]
    ];
};

Vector.subVector = function ([x1, y1, z1], [x2, y2, z2]) {
    return [x1 - x2, y1 - y2, z1 - z2];
};

Vector.scalarMult = function ([x, y, z], s) {
    return [x * s, y * s, z * s];
};

Vector.negate = function ([x, y, z]) {
    return [-x, -y, -z];
};

Vector.normalise = function ([x, y, z]) {
    let mag = Math.hypot(x, y, z);
    return [x / mag, y / mag, z / mag];
};

export default Object.freeze(Vector);