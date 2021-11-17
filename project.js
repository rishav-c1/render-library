const Project = Object.create(null);
import Shade from "./shade.js";
import Plot from "./plot.js";

Project.a = 0.22388;
Project.b = 0.44708;
const parallel_projection = (vertex) => [
    vertex[0] + Project.a * vertex[2] + 10,
    vertex[1] + Project.b * vertex[2] + 50
];
const poly_to_dstring = (poly2d) => "M " + poly2d.map(
    (vertex2d) => `${vertex2d[0]},${vertex2d[1]}`
).join(" ") + " Z";
//dstring, poly colour -> krgb + kspectral

function project3d(list_of_polygon_3d) {
    let list_dstrings_colours = list_of_polygon_3d.map((poly3d) => [
        poly_to_dstring(poly3d.map(parallel_projection)),
        Shade.poly_to_colour(poly3d),
        Shade.spectral(poly3d)
    ]);
    Plot.plotSVG(list_dstrings_colours);
}