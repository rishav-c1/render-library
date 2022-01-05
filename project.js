// Merge project and polyOps
const Project = Object.create(null);
import Shade from "./shade.js";
import Plot from "./plot.js";
import Polygon from "./polyOps.js";


//dstring, poly colour -> krgb + kspectral

//Note: Type Signature of Shade has changed to listNormals and not poly3d
Project.project3d = function (listPoly3d) {
    let list_dstrings_colours = listPoly3d.map((poly3d) => [
        polyToDstring(poly3d.map(parallelProjection)),
        Shade.diffused(Polygon.normal(poly3d)),
        Shade.spectral(Polygon.normal(poly3d))
    ]);
    Plot.plotSVG(list_dstrings_colours);
};