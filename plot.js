//Inputs - colour(rgb), list of 3d polygons, vcam, light vector
import Shade from "./shade.js";
const colour = [254, 157, 61];
let ks_colour = [255, 255, 255];

const Plot = Object.create(null);
Plot.plotSVG = function (list_dstrings_colours) {
    const svg = document.getElementById("mapRoot");
    const ns = "http://www.w3.org/2000/svg";
    svg.textContent = "";
    list_dstrings_colours.forEach(function (dstring) {
        let path = document.createElementNS(ns, "path");
        let ldotn = dstring[1];
        let split_amb_diff = (c) => c * 0.1 + c * 0.9 * ldotn;
        let diff = colour.map(split_amb_diff);
        //Spectral
        let spec = ks_colour.map(
            (k) => 0.9 * k * dstring[2]
        );
        //Splitting up Ambient and Diffused Lights
        let split_c = Shade.addVector(diff, spec);
        path.setAttribute("d", dstring[0]);
        path.style.fill = `rgb(${split_c[0]}, ${split_c[1]},  ${split_c[2]})`;
        svg.appendChild(path);
    });
};
//Plot.generate3dPolygons = function (w1)

//project3d(list_of_polygon_3d);
export default Object.freeze(Plot);