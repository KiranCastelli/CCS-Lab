let mySound;
let amp;

function preload() {
  mySound = loadSound("assets/song.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  mic = new p5.AudioIn();
  mic.start()

  x = width / 2
  y = height / 2
}



function draw() {
  background(220, 10);

  let volume = mic.getLevel()


  y += .5;

  y -= volume * 5

  noStroke()
  fill(0, 0, 255)
  circle(x, y, 50)

}

