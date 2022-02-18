const el = (id) => document.getElementById(id);

let canvas = el("canvas");
let context = canvas.getContext("2d");

let start = function (coors) {
  context.beginPath();
  context.moveTo(coors.x, coors.y);
  this.isDrawing = true;
};

let move = function (coors) {
  if (this.isDrawing) {
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 20;
    context.lineTo(coors.x, coors.y);
    context.stroke();
  }
};

let stop = function (coors) {
  if (this.isDrawing) {
    this.touchmove(coors);
    this.isDrawing = false;
  }
};

let drawer = {
  isDrawing: false,
  mousedown: start,
  mousemove: move,
  mouseup: stop,
  touchstart: start,
  touchmove: move,
  touchend: stop,
};

let draw = function (e) {
  var coors = {
    x: e.clientX - 40 || e.targetTouches[0].pageX - 40,
    y: e.clientY - 75 || e.targetTouches[0].pageY - 75,
  };
  drawer[e.type](coors);
};

canvas.addEventListener("mousedown", draw, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", draw, false);
canvas.addEventListener("touchstart", draw, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", draw, false);

let go = function (e) {
  this.parentNode.removeChild(this);
  draw(e);
};

document.body.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  false
);
