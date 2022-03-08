import Polygon from "./polyOps.js";
import Shade from "./shade.js";
import vectorOps from "./vectorOps.js";
import Vector from "./vectorOps.js";

const Graph = Object.create(null);

Graph.createGraph = function (frameHeight, frameWidth, spec) {
  const graph = Object.create(null);
  const ns = "http://www.w3.org/2000/svg";
  graph.element = document.createElementNS(ns, "svg");
  graph.element.setAttribute("width", frameWidth);
  graph.element.setAttribute("height", frameHeight);
  let highlightColour = [255, 255, 255];
  let baseColour = [122, 255, 122];
  let a = 0.1;
  let b = 0.1;
  let theta = Math.PI / 2;
  let phi = Math.PI / 2;
  let offsetX = frameWidth / 2;
  let offsetY = frameHeight / 2;
  let light = [0.4, -1, 0.5];
  let vcam = Vector.negate(Vector.normalise([a, b, -1]));
  let alpha = 5;
  let polygons2d = [];
  let polygons3d = [];
  let listNormals = [];

  const el = (id) => document.getElementById(id);

  const updateCamera = function () {
    vcam = [
      Math.sin(theta) * Math.cos(phi),
      Math.cos(theta),
      Math.sin(theta) * Math.sin(phi)
    ];
    a = phi - Math.PI / 2;
    b = theta - Math.PI / 2;
    //sortPolygons();
  };

  el("theta").oninput = function () {
    theta = Number(el("theta").value);
    updateCamera();
  };

  el("phi").oninput = function () {
    phi = Number(el("phi").value);
    updateCamera();
  };

  el("alpha").oninput = function () {
    alpha = el("alpha").value;
  };

  el("lvx").oninput = function () {
    light = [el("lvx").value, light[1], light[2]];
  };

  el("lvy").oninput = function () {
    light = [light[0], el("lvy").value, light[2]];
  };

  el("lvz").oninput = function () {
    light = [light[0], light[1], el("lvz").value];
  };

  el("colour").oninput = function () {
    const colour = el("colour").value;
    graph.setColour([
      parseInt(colour.substr(1, 2), 16),
      parseInt(colour.substr(3, 2), 16),
      parseInt(colour.substr(5, 2), 16)
    ]);
  };
  const colourValid = function ([red, green, blue]) {
    return (
      red >= 0 &&
      red <= 255 &&
      green >= 0 &&
      green <= 255 &&
      blue >= 0 &&
      blue <= 255
    );
  };
  graph.setColour = function (rgb) {
    if (colourValid(rgb)) {
      baseColour = rgb;
    }
    graph.draw();
    return graph;
  };

  let dragX0;
  let dragY0;
  let dragging = false;

  const dragStart = function (event) {
    dragX0 = event.x;
    dragY0 = event.y;
    dragging = true;
  };

  const dragEnd = function () {
    dragging = false;
  };

  const dragMove = function (event) {
    if (!dragging) {
      return;
    }
    const deltaX =  event.x - dragX0;
    const deltaY =  event.y - dragY0;
    dragX0 = event.x;
    dragY0 = event.y;
    theta += deltaY / (-20 * Math.PI);
    phi += deltaX / (20 * Math.PI);
    updateCamera();
  };

  graph.element.addEventListener("mousedown", dragStart);
  graph.element.addEventListener("mousemove", dragMove);
  graph.element.addEventListener("mouseup", dragEnd);
  // graph.element.addEventListener("touchstart", draw, false);
  // graph.element.addEventListener("touchmove", draw, false);
  // graph.element.addEventListener("touchend", draw, false);


  graph.setPolygons3d = function (listPoly3d) {
    polygons3d = listPoly3d;
    sortPolygons();
    listNormals = listPoly3d.map(Polygon.normal);
    updatePolygons2d();
    return graph;
  };

  const updatePolygons2d = function () {
    polygons2d = polygons3d.map((poly3d) =>
      poly3d.map(Polygon.parallelProjection(a, b, offsetX, offsetY))
    );
    graph.draw();
  };

  const sortPolygons = function () {
    polygons3d.sort(
      (a,b) => Vector.dotProduct(vcam, a[0]) - Vector.dotProduct(vcam, b[0])
    );
  };

  const polyToDstring = (poly2d) =>
    "M " +
    poly2d.map((vertex2d) => `${vertex2d[0]},${vertex2d[1]}`).join(" ") +
    " Z";
  graph.draw = function () {
    graph.element.textContent = "";
    const dCoeffList = listNormals.map(Shade.diffuse(Vector.normalise(light)));
    const sCoeffList = listNormals.map(
      Shade.spectral(Vector.normalise(light), vcam, alpha)
    );
    const dStrings = polygons2d.map(polyToDstring);

    dStrings.forEach(function (dString, i) {
      //sortPolygons();
      const d = baseColour.map((c) => c * 0.1 + c * 0.9 * dCoeffList[i]);
      const s = highlightColour.map((h) => h * 0.9 * sCoeffList[i]);
      const polyColour = Vector.addVector(s, d);
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", dString);
      path.style.fill = `rgb(${polyColour[0]}, ${polyColour[1]},  ${polyColour[2]})`;
      graph.element.appendChild(path);
    });
  };
  return Object.freeze(graph);
};
export default Object.freeze(Graph);
