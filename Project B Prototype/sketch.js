
let NUM_OF_PARTICLES = 800; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 2999; // Decide the maximum number of particles.

let particles = [];
let p1x;
let p1y;
let p2x;
let p2y;
let p3x;
let p3y;
let p4x;
let p4y;
let p5x;
let p5y;
let p6x;
let p6y;
let p7x;
let p7y;
let p8x;
let p8y;
let p9x;
let p9y;
let p10x;
let p10y;


/* what you proposed in class
class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isCon = false;
  }
} */

let pressed;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  background(30, 30, 30)
  // generate particles

  p1x = random(width)
  p1y = random(height)

  p2x = random(width)
  p2y = random(height)

  p3x = random(width)
  p3y = random(height)

  p4x = random(width)
  p4y = random(height)

  p5x = random(width)
  p5y = random(height)

  p6x = random(width)
  p6y = random(height)

  p7x = random(width)
  p7y = random(height)

  p8x = random(width)
  p8y = random(height)

  p9x = random(width)
  p9y = random(height)

  p10x = random(width)
  p10y = random(height)

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }

}

function draw() {

  // update and display
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
  }

}

class Particle {
  constructor(startX, startY) {
    //initial variables
    this.x = startX;
    this.y = startY;
    this.posX = 0
    this.posY = 0

    //particle properties
    this.dia = random(1);
    this.check = 0;
    this.speed = .5;
    this.otherColorR = random(100)
    this.otherColorG = random(10)
    this.otherColorB = random(10)
    this.targRed = false

    //target
    this.decide = int(random(6))

    if (this.decide == 0) {
      this.tx = p1x
      this.ty = p1y
    }

    if (this.decide == 1) {
      this.tx = p2x
      this.ty = p2y
    }

    if (this.decide == 2) {
      this.tx = p3x
      this.ty = p3y
    }
    if (this.decide == 3) {
      this.tx = p4x
      this.ty = p4y
    }

    if (this.decide == 4) {
      this.tx = p5x
      this.ty = p5y
    }

    if (this.decide == 5) {
      this.tx = p6x
      this.ty = p6y
    }


  }

  update() {
    //calculate a formula for the DIRECTIONAL component of the velocity, this way we can add any constant speed we want
    //this took so long

    this.iHat = (this.tx - (this.posX + this.x)) / dist(this.tx, this.ty, this.posX + this.x, this.posY + this.y)
    this.jHat = (this.ty - (this.posY + this.y)) / dist(this.tx, this.ty, this.posX + this.x, this.posY + this.y)

    //formula for rotating vector 90 degrees counter clockwise
    this.perpiHat = this.jHat
    this.perpjHat = -this.iHat

    //create arc
    this.arcVelocityX = 100 * sin(PI * (dist(this.x, this.y, this.x + this.posX, this.y + this.posY) / dist(this.x, this.y, this.tx, this.ty))) * this.perpiHat
    this.arcVelocityY = 100 * sin(PI * (dist(this.x, this.y, this.x + this.posX, this.y + this.posY) / dist(this.x, this.y, this.tx, this.ty))) * this.perpjHat

    //create velocity towards target
    this.vx = this.iHat * this.speed;
    this.vy = this.jHat * this.speed;


    //apply the velocity
    this.posX += this.vx;
    this.posY += this.vy;

    //for when particle reaches close to target
    this.check = dist(this.tx, this.ty, this.posX + this.x, this.posY + this.y)
    if (this.check < random(2, 10)) {
      //choose new target
      this.decide = int(random(11))

      if (this.decide == 0) {
        this.tx = p1x
        this.ty = p1y
        //update the particle's traits
        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }

      if (this.decide == 1) {
        this.tx = p2x
        this.ty = p2y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }

      if (this.decide == 2) {
        this.tx = p3x
        this.ty = p3y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }
      if (this.decide == 3) {
        this.tx = p4x
        this.ty = p4y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }

      if (this.decide == 4) {
        this.tx = p5x
        this.ty = p5y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }

      if (this.decide == 5) {
        this.tx = p6x
        this.ty = p6y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }
      if (this.decide == 6) {
        this.tx = p7x
        this.ty = p7y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }
      if (this.decide == 7) {
        this.tx = p8x
        this.ty = p8y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }
      if (this.decide == 8) {
        this.tx = p9x
        this.ty = p9y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }
      if (this.decide == 9) {
        this.tx = p10x
        this.ty = p10y

        this.x = this.posX + this.x
        this.y = this.posY + this.y
        this.posX = 0
        this.posY = 0
        this.dia = random(1)
      }
      /*       else {
              this.tx = random(width)
              this.ty = random(height)
      
              this.x = this.posX + this.x
              this.y = this.posY + this.y
              this.posX = 0
              this.posY = 0
              this.dia = random(1)
            }  */
    }

    if (pressed == true) {
      this.speed = random(.5, 1)
    }

    //color
    this.maxColor = 100
    this.halfX = (this.x + this.tx) / 2
    this.halfY = (this.y + this.ty) / 2
    this.maxDist = abs(dist(this.x, this.y, this.halfX, this.halfY))
    this.posToHalf = abs(dist(this.posX + this.x, this.posY + this.y, this.halfX, this.halfY))
    this.color = abs(map(this.posToHalf, this.maxDist, 0, 0, this.maxColor))


  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    if (pressed == true) {
      fill(this.otherColorR, this.otherColorG, this.otherColorB)
    } else {
      fill(this.color);
    }

    ellipse(this.posX + this.arcVelocityX, this.posY + this.arcVelocityY, this.dia, this.dia);
    pop();
  }


}

function mousePressed() {
  pressed = true;
}
