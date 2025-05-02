// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 2000; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 1999; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  //fill(50, 50, 50, 50);
  //rect(0, 0, width, height);
  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.x + p.parX > width + 100) {
      particles.splice(i, 1);
    }
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(1);

    //color
    this.r = 0
    this.g = 0
    this.b = 0

    //particle drift pos
    this.parX
    this.parY
    this.xR = random(1000);
    this.yR = random(1000);
  }
  // methods (functions): particle's behaviors
  update() {
    this.driftX = noise(.005 * frameCount + this.xR);
    this.driftY = noise(.005 * frameCount + this.yR);


    if (mouseIsPressed) {
      this.parX = lerp(parX, mouseX, .02)
      this.parY = lerp(parY, mouseY, .02)
    } else {
      this.parX = 100 * this.driftX
      this.parY = 100 * this.driftY
    }
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);

    noStroke()
    fill(this.r, this.g, this.b, 20);
    circle(this.parX, this.parY, this.dia);

    pop();
  }
  changeColor() {
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }
  changeSize() {
    this.dia = random(1)
  }
}

