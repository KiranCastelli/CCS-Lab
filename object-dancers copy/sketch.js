let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new KiranDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

class KiranDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.timev = 0;
  }
  update() {
    this.timev = frameCount;
  }
  display() {
    push();
    translate(this.x, this.y);
    let startr = 40;
    let radiius = startr + 10 * sin(this.timev * 0.1);
    noStroke();
    fill(255);
    circle(0, 0, radiius * 2);

    let rot = this.timev % 360;
    for (let i = 0; i < 6; i++) {

      let startangle = i * (360 / 6);
      let rotangle = (startangle + rot) * (PI / 180);

      let x1 = radiius * cos(rotangle);
      let y1 = radiius * sin(rotangle);
      let x2 = (radiius + 20) * cos(rotangle);
      let y2 = (radiius + 20) * sin(rotangle);
      let col = map(sin(this.timev * 0.05), -1, 1, 0, 255);
      strokeWeight(2);
      stroke(255, col, 0);
      line(x1, y1, x2, y2);
    }


    for (let r = 25; r > 0; r--) {
      let re = map(sin(this.timev * 0.5 + r), -1, 1, 150, 255);
      let gr = map(cos(this.timev * 0.5 + r), -1, 1, 150, 255);
      let bl = map(sin(this.timev * 0.5 + r), -1, 1, 150, 255);
      fill(re, gr, bl);
      noStroke();
      circle(0, 0, r * 2);
    }

    let eyesi = 10 + 2 * sin(this.timev * 0.2);
    fill(0);
    circle(-10, -5, eyesi);
    circle(10, -5, eyesi);
    pop();

  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

