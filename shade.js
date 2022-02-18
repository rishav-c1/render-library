import Vector from "./vectorOps.js";
const Shade = Object.create(null);

Shade.diffuse = (lightVector) => (normal) => Math.max(
    0,
    Vector.dotProduct(lightVector, normal)
);

Shade.spectral = (lightVector, vcam, alpha) => function (normal) {
    const ldotn = Vector.dotProduct(normal, lightVector);
    const normFactor = Vector.scalarMult(normal, 2 * ldotn);
    const rm = Vector.subVector(normFactor, lightVector);
    return Math.pow(Math.max(0, Vector.dotProduct(rm, vcam)), alpha);
};

export default Object.freeze(Shade);