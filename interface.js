import Polygon from "./polyOps.js";
import Shade from "./shade.js";
import Vector from "./vectorOps.js";

const Graph = Object.create(null);

const createGraph = function (frameHeight, frameWidth) {
    const graph = Object.create(null);
    const ns = "http://www.w3.org/2000/svg";
    graph.element = document.createElementNS(ns, "svg");
    graph.element.setAttribute("width", frameWidth);
    graph.element.setAttribute("height", frameHeight);
    let path = document.createElementNS(ns, "path");
    let highlightColour = [255, 255, 255];
    let baseColour = [122, 122, 122];
    let a = 0.22388;
    let b = 0.44708;
    let offsetX = 10;
    let offsetY = 50;
    let light = Vector.normalise([0.4, -1, 0.5]);
    let vcam = Vector.negVector(Vector.normalise([a, b, -1]));
    let alpha = 5;
    let polygons2d = [];
    let polygons3d = [];
    let listNormals = [];

    graph.setPolygons3d = function (listPoly3d) {
        polygons3d = listPoly3d;
        listNormals = Polygon.normal(polygons3d);
        updatePolygons2d();
        return graph;
    };

    const updatePolygons2d = function () {
        polygons2d = polygons3d.map((poly3d) => (
            poly3d.map(Polygon.parallelProjection(a, b, offsetX, offsetY)))
        );
        graph.draw();
    };

    const colourValid = function (n) {return (n >= 0 && n <= 255);};
    graph.setColour = function (rgb) {
        if(colourValid(rgb[0]) && colourValid(rgb[1]) && colourValid(rgb[2])) {
            baseColour = rgb;
        }
        graph.draw();
        return graph;
    };

    const polyToDstring = (poly2d) => "M " + poly2d.map(
        (vertex2d) => `${vertex2d[0]},${vertex2d[1]}`
    ).join(" ") + " Z";
    graph.draw = function () {
        const dCoeffList = listNormals.map(Shade.diffuse(light));
        const sCoeffList = listNormals.map(Shade.spectral(light, vcam, alpha));
        const dStrings = polygons2d.map(polyToDstring);
        for(let i = 0; i < dStrings.length; i += 1) {
            let d = baseColour.map((c) => c * 0.1 + c * 0.9 * dCoeffList[1]);
            let s = highlightColour.map((h) => h * 0.9 * sCoeffList[2]);
            let polyColour = Vector.addVector(s,d);

            path.setAttribute("d", dStrings[i]);
            path.style.fill =
            `rgb(${polyColour[0]}, ${polyColour[1]},  ${polyColour[2]})`;
            graph.appendChild(path);
        }
    };
    return Object.freeze(graph);
};
export default Object.freeze(Graph);