import Graph from "./interface.js";

const generate3dPolygons = function (phase = 0) {
    const cell = (h, s) => (x, z) => [
        [s * x, s * h(x, z), s * z],
        [s * x + s, s * h(x + 1, z), s * z],
        [s * x + s, s * h(x + 1, z + 1), s * z + s],
        [s * x, s * h(x, z + 1), s * z + s]
    ];
    const polygon = cell(
        (x, z) => Math.sin(0.5 * x / 2 + phase) * Math.cos(z / 2),
        15
    );
    const sequence = (n) => Array.from({"length": n}, (ignore, k) => k);
    return sequence(25).flatMap(
        (x) => sequence(25).map((z) => [x - 12, z - 12])
    ).map((xz) => polygon(xz[0], xz[1]));
};

const graph = Graph.createGraph(500, 500);
document.body.append(graph.element);
graph.setPolygons3d(generate3dPolygons());
const el = (id) => document.getElementById(id);
const frameRateEl = el("frame");

let lastT = 0;
let animationPhase = 0;
const animationFrame = function (t) {
    const deltaT = t - lastT;
    const frameRate = 1000 / deltaT;
    frameRateEl.value = (frameRate);
    lastT = t;
    animationPhase = (
        animationPhase + deltaT * 2 * Math.PI / 1000
    ) % (2 * Math.PI);
    graph.setPolygons3d(generate3dPolygons(animationPhase));
    window.requestAnimationFrame(animationFrame);
};

window.requestAnimationFrame(animationFrame);