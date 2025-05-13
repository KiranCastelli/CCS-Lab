let NUM_OF_PARTICLES = 800; // initial number of particles
let MAX_OF_PARTICLES = 2999; // maximum number of particles
let pressed_once = false

let particles = [];
let targets = [];

function setup() {

  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  background(30, 30, 30);

  // generate 10 target points
  for (let i = 0; i < 10; i++) {
    targets.push(new Target(random(width), random(height)));
  }

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  for (let i = targets.length - 1; i >= 0; i--) {
    let t = targets[i];
    //t.display();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();

  }
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isContaminated = false;
  }
  display() {
    // this can be used as a debugging tool.
    push();
    noStroke();
    if (this.isContaminated) {
      fill(255, 0, 0);
    } else {
      fill(255, 255, 255);
    }
    circle(this.x, this.y, 5);
    pop();
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.posX = 0;
    this.posY = 0;

    this.dia = random(1);
    //this.check = 0; // no need?
    this.speed = 0.5;
    this.otherColorR = random(100);
    this.otherColorG = random(10);
    this.otherColorB = random(10);

    //this.decide = int(random(targets.length));
    //this.tx = targets[this.decide].x;
    //this.ty = targets[this.decide].y;

    // instead of the code above, we can do this:
    this.target = random(targets); // select a random element from the "targets" array.

    this.isContaminated = false;
  }

  update() {
    //calculate a formula for the DIRECTIONAL component of the velocity, this way we can add any constant speed we want
    //this took so long
    this.iHat =
      (this.target.x - (this.posX + this.x)) /
      dist(
        this.target.x,
        this.target.y,
        this.posX + this.x,
        this.posY + this.y
      );
    this.jHat =
      (this.target.y - (this.posY + this.y)) /
      dist(
        this.target.x,
        this.target.y,
        this.posX + this.x,
        this.posY + this.y
      );

    //formula for rotating vector 90 degrees counter clockwise
    this.perpiHat = this.jHat;
    this.perpjHat = -this.iHat;

    //create arc
    this.arcVelocityX =
      100 *
      sin(
        PI *
        (dist(this.x, this.y, this.x + this.posX, this.y + this.posY) /
          dist(this.x, this.y, this.target.x, this.target.y))
      ) *
      this.perpiHat;
    this.arcVelocityY =
      100 *
      sin(
        PI *
        (dist(this.x, this.y, this.x + this.posX, this.y + this.posY) /
          dist(this.x, this.y, this.target.x, this.target.y))
      ) *
      this.perpjHat;

    //create velocity towards target
    this.vx = this.iHat * this.speed;
    this.vy = this.jHat * this.speed;

    //apply the velocity
    this.posX += this.vx;
    this.posY += this.vy;

    // when particle reaches close to target
    // this.check <-- this could be just a local variable.
    let distance = dist(
      this.target.x,
      this.target.y,
      this.posX + this.x,
      this.posY + this.y
    );
    if (distance < random(2, 10)) {
      // this is what you asked!

      if (this.isContaminated) {
        this.target.isContaminated = true;
      }

      if (this.target.isContaminated) {
        this.isContaminated = true;
      }
      //this.decide = int(random(targets.length));
      //this.tx = targets[this.decide].x;
      //this.ty = targets[this.decide].y;

      // again, instead of the code above, we can update the target randomly:
      this.target = random(targets);

      // update current position and reset movement
      this.x += this.posX;
      this.y += this.posY;
      this.posX = 0;
      this.posY = 0;
      this.dia = random(1);
    }

    if (this.isContaminated) {
      this.speed = random(0.4); // perhaps this could be slower?
    }

    // color mapping based on distance
    this.maxColor = 100;
    this.halfX = (this.x + this.target.x) / 2;
    this.halfY = (this.y + this.target.y) / 2;
    this.maxDist = abs(dist(this.x, this.y, this.halfX, this.halfY));
    this.posToHalf = abs(
      dist(this.posX + this.x, this.posY + this.y, this.halfX, this.halfY)
    );
    this.color = abs(map(this.posToHalf, this.maxDist, 0, 0, this.maxColor));
    this.redMod = abs(map(this.posToHalf, this.maxDist, 0, 0, 50));
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    if (this.isContaminated) {
      fill(this.otherColorR - this.redMod, this.otherColorG - this.redMod, this.otherColorB - this.redMod);
    } else {
      fill(this.color);
    }
    ellipse(
      this.posX + this.arcVelocityX,
      this.posY + this.arcVelocityY,
      this.dia,
      this.dia
    );
    pop();
  }
}

function mousePressed() {
  if (pressed_once == false) {
    let randomTarget = random(targets);
    randomTarget.isContaminated = true;
    pressed_once = true
  } else {
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.isContaminated = false
    }
    for (let i = targets.length - 1; i >= 0; i--) {
      let t = targets[i];
      t.isContaminated = false
    }
    pressed_once = false
  }



}
