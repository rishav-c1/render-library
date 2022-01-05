import Polygon from "./polyOps.js";
const Graph = Object.create(null);

const createGraph = function (frameHeight, frameWidth) {
    const graph = Object.create(null);
    const ns = "http://www.w3.org/2000/svg";
    graph.element = document.createElementNS(ns, "svg");
    graph.element.setAttribute("width", frameWidth);
    graph.element.setAttribute("height", frameHeight);
    let path = document.createElementNS(ns, "path");
    let colour = [122,122,122];
    let polygons2d = [];
    let polygons3d = [];
    let listNormals = [];

    graph.setPolygons3d = function (listPoly3d) {
        polygons3d = listPoly3d;
        listNormals = Polygon.normal(polygons3d);
        graph.draw();
        return graph;
    };//done

    const updatePolygons2d = function () {
        //project 2d
        graph.draw();
    }
        
    const polyToDstring = (poly2d) => "M " + poly2d.map(
        (vertex2d) => `${vertex2d[0]},${vertex2d[1]}`
    ).join(" ") + " Z";

    graph.setColour = function (rgb) {
        if(rgb[0] in Range (0,255) && rgb[1] in Range (0,255) && rgb[2] in Range (0,255))
        colour = rgb;
        graph.draw();
        return graph;
    };

    /*
    * shade 2d
    * 
    */
    graph.draw = function () {
    };
    
    return Object.freeze(graph);
};

// colours, vcam, light-vector, range(scale)


export default Object.freeze(Graph);

/*  const svg = document.getElementById("mapRoot");
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
};*/