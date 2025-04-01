/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new ChatGPTDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class ChatGPTDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // Use a time variable for animations.
    this.t = 0;
  }
  update() {
    // Update our time variable with the current frame count.
    this.t = frameCount;
  }
  display() {
    push();
    translate(this.x, this.y);

    // --- Outer Pulsating Circle & Radial Lines ---
    // Base settings: make sure everything stays within 200x200 pixels.
    let baseRadius = 40; // Base radius for the pulsating effect.
    let pulse = 10 * sin(this.t * 0.1); // Pulse oscillates between -10 and 10.
    let dynamicRadius = baseRadius + pulse; // Varies between 30 and 50.

    // Draw the outer circle.
    noStroke();
    fill(255);
    circle(0, 0, dynamicRadius * 2);

    // Draw 6 radial lines that rotate using frameCount, without calling rotate().
    let numLines = 6;
    // Use the frame count modulo 360 as a degree offset.
    let offsetDegrees = this.t % 360;
    strokeWeight(2);
    for (let i = 0; i < numLines; i++) {
      // Calculate angle in degrees, then convert to radians manually.
      let baseAngleDeg = i * (360 / numLines);
      let angleDeg = baseAngleDeg + offsetDegrees;
      let angle = angleDeg * (PI / 180);

      // Start point on the circle's edge.
      let x1 = dynamicRadius * cos(angle);
      let y1 = dynamicRadius * sin(angle);
      // End point extends a fixed length (20 pixels) further, but stays within bounds.
      let x2 = (dynamicRadius + 20) * cos(angle);
      let y2 = (dynamicRadius + 20) * sin(angle);

      // Color shifts smoothly over time.
      let col = map(sin(this.t * 0.05 + i), -1, 1, 0, 255);
      stroke(255, col, 0);
      line(x1, y1, x2, y2);
    }

    // --- Inner Gradient Circle ---
    // Draw several concentric circles to simulate a gradient.
    let innerRadius = 25; // Maximum radius for the inner gradient circle.
    for (let r = innerRadius; r > 0; r--) {
      // Calculate colors that shift smoothly with time.
      let redVal = map(sin(this.t * 0.05 + r * 0.1), -1, 1, 150, 255);
      let greenVal = map(cos(this.t * 0.03 + r * 0.05), -1, 1, 150, 255);
      let blueVal = map(sin(this.t * 0.07 + r * 0.2), -1, 1, 150, 255);
      fill(redVal, greenVal, blueVal);
      noStroke();
      circle(0, 0, r * 2);
    }

    // --- Personality: Expressive Eyes ---
    // Add two small "eyes" that blink/move slightly.
    let eyeOffsetX = 10;
    let eyeOffsetY = -5;
    // Eye size oscillates to simulate blinking.
    let eyeSize = 5 + 2 * sin(this.t * 0.2);
    fill(0);
    circle(-eyeOffsetX, eyeOffsetY, eyeSize);
    circle(eyeOffsetX, eyeOffsetY, eyeSize);

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

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
