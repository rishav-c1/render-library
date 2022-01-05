import Vector from "./vectorOps.js";
const Shade = Object.create(null);
//Reimplemented using normals
//const light_vector = Vector.normalise([0.4, -1, 0.5]);
//const vcam = Vector.negVector(Vector.normalise([Project.a, Project.b, -1]));
//const alpha = 5;

//One function for all
Shade.diffused = function (normal, lightVector) {
    return Math.pow(
        Math.max(0, Vector.dotProduct(lightVector, normal)),
        1
    );
};

//type signature - normal, vcam, alpha, lightVector
Shade.spectral = function (normal, lightVector, vcam, alpha) {
    let ldotn = Vector.dotProduct(normal, lightVector);
    let normFactor = Vector.scalarMult(normal, 2 * ldotn);
    let rm = Vector.subVector(normFactor, lightVector);
    return Math.pow(Math.max(0, Vector.dotProduct(rm, vcam)), alpha);
};

export default Object.freeze(Shade);