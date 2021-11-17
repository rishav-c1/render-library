const Vector = Object.create(null);

Vector.crossProduct = function (vector1, vector2) {
    return [
        vector1[1] * vector2[2] - vector1[2] * vector2[1],
        vector1[2] * vector2[0] - vector1[0] * vector2[2],
        vector1[0] * vector2[1] - vector1[1] * vector2[0]
    ];
};

Vector.dotProduct = function (vector1, vector2) {
    return vector1[0] * vector2[0] + vector1[1] * vector2[1] +
    vector1[2] * vector2[2];
};

Vector.addVector = function (vector1, vector2, vector3) {
    if (vector3 === undefined) {
        vector3 = [0, 0, 0];
    }
    return [
        vector1[0] + vector2[0] + vector3[0],
        vector1[1] + vector2[1] + vector3[1],
        vector1[2] + vector2[2] + vector3[2]
    ];
};

Vector.subVector = function (vector1, vector2) {
    return [
        vector1[0] - vector2[0],
        vector1[1] - vector2[1],
        vector1[2] - vector2[2]
    ];
};

Vector.scalarMult = function (vector, s) {
    return [vector[0] * s, vector[1] * s, vector[2] * s];
};

Vector.negVector = function ([x, y, z]) {
    return [-x, -y, -z];
};

Vector.normalise = function (vector) {
    let mag = Math.hypot(...vector);
    return [vector[0] / mag, vector[1] / mag, vector[2] / mag];
};

export default Object.freeze(Vector);