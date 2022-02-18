const Polygon = Object.create(null);
import Vector from "./vectorOps.js";

Polygon.normal = function (poly3d) {
    return Vector.normalise(Vector.addVector(
        Vector.crossProduct(poly3d[0], poly3d[1]),
        Vector.crossProduct(poly3d[1], poly3d[2]),
        Vector.crossProduct(poly3d[2], poly3d[0])
    ));
};

Polygon.parallelProjection = (a, b, x0, y0) => (vertex) => [
    Math.cos(a) * vertex[0] + Math.sin(a) * vertex[2] + x0,
    -Math.sin(a) * Math.sin(b) * vertex[0] + Math.cos(b) * vertex[1] +
    Math.cos(a) * Math.sin(b) * vertex[2] + y0
];

export default Object.freeze(Polygon);
