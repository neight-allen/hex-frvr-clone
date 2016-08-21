const _ = require('underscore');

const Board = require('./board');
const Shape = require('./shape');
const hexHelper = require('./hex-helper');

const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

var score = 0;

var isMouseDown = false;
var board = new Board(ctx);

var shapeInHand = false;
var shapeFrom = "zero";

var mouseCoords = {};

var shapesInWaiting = {
  first: new Shape(ctx),
  second: new Shape(ctx),
  third: new Shape(ctx)
}

const shapesInWaitingBoxes = [
  {key: "first", bounds: [600, 700, 100, 200]},
  {key: "second", bounds: [600, 700, 250, 350]},
  {key: "third", bounds: [600, 700, 400, 500]},
]

function drawShapesInWaiting() {
  shapesInWaiting.first.draw(650, 150, .5);
  shapesInWaiting.second.draw(650, 300, .5);
  shapesInWaiting.third.draw(650, 450, .5);
}

function drawShapeInHand(){
  if(isMouseDown && shapeInHand) {
    shapeInHand.draw(mouseCoords.x, mouseCoords.y);
  }
}

function whichShapeDidYouPick() {
  return shapesInWaitingBoxes.reduce(function(shape, box) {
    var bounds = box.bounds;
    if(mouseCoords.x > bounds[0] && mouseCoords.x < bounds[1] && mouseCoords.y > bounds[2] && mouseCoords.y < bounds[3]){
      shape = shapesInWaiting[box.key];
      shapeFrom = box.key;
    }
    return shape;
  }, false)
}


// board.addRandomTiles();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  board.drawPotentialSlots(mouseCoords.x, mouseCoords.y, shapeInHand);
  drawShapesInWaiting();
  drawShapeInHand();
  requestAnimationFrame(gameLoop);
});

document.addEventListener('mousedown', function(event){
  // console.log("mouseDown. x:", event.x, " y:", event.y);
  mouseCoords = getMousePos(canvas, event);
  isMouseDown = true;
  shapeInHand = whichShapeDidYouPick();

  // var x = mouseCoords.x - hexHelper.boardOffset.x;
  // var y = mouseCoords.y - hexHelper.boardOffset.y;
  // var [hexX, hexY, hexZ] = hexHelper.pixelsToHex(x,y);
  // console.log("X:", hexX, " Y:", hexY, "Z:", hexZ);
})

document.addEventListener('mouseup', function(event){
  // console.log("mouseUp. x:", event.x, " y:", event.y);
  if(shapeInHand && board.validDrop(mouseCoords.x, mouseCoords.y, shapeInHand)){
    board.addTilesFromShape(mouseCoords.x, mouseCoords.y, shapeInHand);
    shapesInWaiting[shapeFrom] = new Shape(ctx);
    score += board.removeFullLines();
    console.log("score:", score);
    document.getElementById("score-value").innerText = score;
    if(!board.movesRemaining(_.values(shapesInWaiting)))
      alert("No more moves");
  }

  isMouseDown = false;
  shapeInHand = false;
  // console.log(shapeInHand);
})

document.addEventListener('mousemove', function(event){
  if(isMouseDown){
    mouseCoords = getMousePos(canvas, event);
  }
})

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
