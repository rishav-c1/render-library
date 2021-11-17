import Vector from "./vector_ops.js";
import Project from "./project.js";
const Shade = Object.create(null);

function generateNormal(polygon_3d) {
    return Vector.normalise(
        Vector.addVector(
            Vector.crossProduct(polygon_3d[0], polygon_3d[1]),
            Vector.crossProduct(polygon_3d[1], polygon_3d[2]),
            Vector.crossProduct(polygon_3d[2], polygon_3d[0])
        )
    );
}

const light_vector = Vector.normalise([0.4, -1, 0.5]);
Shade.poly_to_colour = function (polygon_3d) {
    return Math.pow(
        (Math.max(0, Vector.dotProduct(
            light_vector,
            generateNormal(polygon_3d)
        ))),
        (1)
    );
};

const vcam = Vector.negVector(Vector.normalise([Project.a, Project.b, -1]));
const alpha = 5;

Shade.spectral = function (polygon_3d) {
    let normal = generateNormal(polygon_3d);
    let ldotn = Vector.dotProduct(normal, light_vector);
    let normFactor = Vector.scalarMult(normal, 2 * ldotn);
    let rm = Vector.subVector(normFactor, light_vector);
    return Math.pow(
        Math.max(0, Vector.dotProduct(rm, vcam)),
        alpha
    );
};

export default Object.freeze(Shade);