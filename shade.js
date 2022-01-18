import Vector from "./vectorOps.js";
const Shade = Object.create(null);
//Re-implemented using normals
//const light_vector = Vector.normalise([0.4, -1, 0.5]);
//const vcam = Vector.negVector(Vector.normalise([Project.a, Project.b, -1]));
//const alpha = 5;

//One function for all
Shade.diffuse = (lightVector) => (normal) => Math.pow(
    Math.max(0, Vector.dotProduct(lightVector, normal)),
    1
);

//type signature - normal, vcam, alpha, lightVector
Shade.spectral = (lightVector, vcam, alpha) => function (normal) {
    const ldotn = Vector.dotProduct(normal, lightVector);
    const normFactor = Vector.scalarMult(normal, 2 * ldotn);
    const rm = Vector.subVector(normFactor, lightVector);
    return Math.pow(Math.max(0, Vector.dotProduct(rm, vcam)), alpha);
};

export default Object.freeze(Shade);