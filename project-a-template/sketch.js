
function setup() {
    canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container")
    background(0);
    //circle var
    circ = 0;


    //color var
    col = 0;
    sub = false;
    col2 = 255;
    sub2 = false;

    //ripple
    ripx = random(width);
    ripy = random(height);
    grow = 10;
    rip = random(0.5, 1);
    i = 0;
    grow = random(5, 10);
    des = 1;
    hit = false;
    rippleChance = 0;
    newdemen = false
    pre = false
    rcolor = 0
    going = false
    c = 0

    //new
    tun = 100
    tuny = height / 2
    tunx = width / 2
    appear = false
    mouseClick = false

    //ageing
    age = 0

    //3 dimension
    d3 = false
    beat = 0
    t = 0
    accel = 0
    d = 0

    //end
    end = false
}

//function preload() {
//mySound = loadSound('sound.mp3');
//}

function draw() {

    //ORIGINAL DIMENSION 1
    //theEnd()
    if (hit == false && newdemen == false) {
        /////CHANCE FOR NEW DIMENSION
        rippleChance = int(random(500));
        /////CIRCLE STUFF
        circ = circ + (2 * PI / 360);
        let r = noise(frameCount * 0.005);
        r = map(r, 0, 1, 20, 250);

        //////CIRCLE 1
        let x = width / 2 + cos(circ) * r;
        let y = height / 2 + sin(circ) * r;

        //COLOR CHANGING SYSTEM
        if (col >= 255) {
            sub = true;
        }

        if (col <= 0) {
            sub = false;
        }

        if (sub == true) {
            col -= 1;
        }

        if (sub == false) {
            col += 1;
        }

        //MAKE THREE CIRCLES  
        fill(col);
        noStroke();
        ellipse(x, y, 30, 30);

        fill(col);
        noStroke();
        ellipse(x - 10, y - 10, 30, 30);

        fill(col);
        noStroke();
        ellipse(x + 10, y + 10, 30, 30);

        //CIRCLE 2
        let x2 = width / 2 - cos(circ) * r;
        let y2 = height / 2 - sin(circ) * r;

        if (col2 >= 255) {

            sub2 = true;
        }

        if (col2 <= 0) {

            sub2 = false;
        }

        if (sub2 == true) {

            col2 -= 1;
        }

        if (sub2 == false) {

            col2 += 1;
        }
        //MAKE THREE MORE CIRCLES
        fill(col2);
        noStroke();
        ellipse(x2, y2, 30, 30);

        fill(col2);
        noStroke();
        ellipse(x2 - 10, y2 - 10, 30, 30);

        fill(col2);
        noStroke();
        ellipse(x2 + 10, y2 + 10, 30, 30);

        //ADD ZOOM AND BLUR
        filter(BLUR, 1)
        copy(0, 0, width, height, (width - width - 5), (height - height) - 5, width + 10, height + 10);
    }

    //RIPPLE FOR NEW DIMENSION
    if (pre == true && newdemen == false) {
        if (i == 0) {
            //mySound.play()
        }
        hit = true;
        stro = map(i, 0, 20, 0, 255);
        noStroke();
        fill(255);
        circle(width / 2, height / 2, grow);
        filter(BLUR, 1)
        copy(0, 0, width, height, (width - width - 3), (height - height) - 3, width + 6, height + 6);
        grow += 20 * rip;
        i += 1;
        if (i > 3) {
            noStroke();
            fill(0);
            circle(width / 2, height / 2, des);
            des += 20 * rip;
        }
        if (i > 200) {
            ripple();
        }
    }

    //d2
    if (newdemen == true && d3 == false) {
        d2()
    }

    //3 dimension
    if (d3 == true) {
        dim3()

    }
    //end
    if (end == true) {
        theEnd()
    }
}

function ripple() {
    filter(BLUR, 1)
    ripx = random(width);
    ripy = random(height);
    grow = 10;
    rip = random(0.5, 1);
    i = 0;
    grow = random(5, 10);
    des = 1;
    hit = false;
    newdemen = true
    end = false
    chance = random(5)
}


//////////////////////////////////
//D2
//////////////////////////////////



function d2() {

    let shapesize = random(20, 40);
    let shapes = shapesize
    if (going == false) {
        shapeChance = int(random(5))
        shapex = random(width);
        shapey = random(height);
        outx = random(0, 800)
        outy = random(0, 500)
        c = 0
    }
    age += .6
    rcolor = map(rcolor, shapes, 200, 255, 0)

    blurry = map(age, 0, 1000, 0, 1)
    age_color = map(age, 0, 1000, 255, 0)
    //tunnel affect
    tcolor = map(tun, 100, 1000, 0, 255)
    noFill()
    stroke(tcolor)
    strokeWeight(3)
    circle(tunx, tuny, tun)
    tun += 4
    if (tun < 1000) {
        copy(0, 0, width, height, (width - width - .7), (height - height) - .7, width + 1.4, height + 1.4);
        filter(BLUR, 1)
    }
    //go into tunnel

    if (tun > 1000) {
        copy(0, 0, width, height, (width - width - 10), (height - height) - 10, width + 20, height + 20);
        filter(BLUR, blurry)
        if (tun > 800 && age < 1000) {
            appear = true
        }
    }

    //creature re appears

    if (appear == true) {
        circ = circ + (2 * PI / 360);
        let r = noise(frameCount * 0.005);
        r = map(r, 0, 1, 50, 400);

        //let r = noise(frameCount * 0.005);
        //r = map(r,0,1,50,200);

        //circle 1

        let x = width / 2 + cos(circ) * r;
        let y = height / 2 + sin(circ) * r;


        if (col >= 255) {

            sub = true;
        }

        if (col <= 0) {

            sub = false;
        }

        if (sub == true) {

            col -= 1;
        }

        if (sub == false) {

            col += 1;
        }



        fill(col);
        noStroke();
        ellipse(x, y, 30, 30);

        fill(col);
        noStroke();
        ellipse(x - 10, y - 10, 30, 30);

        fill(col);
        noStroke();
        ellipse(x + 10, y + 10, 30, 30);

        //circle 2

        let x2 = width / 2 - cos(circ) * r;
        let y2 = height / 2 - sin(circ) * r;

        if (col2 >= 255) {

            sub2 = true;
        }

        if (col2 <= 0) {

            sub2 = false;
        }

        if (sub2 == true) {

            col2 -= 1;
        }

        if (sub2 == false) {

            col2 += 1;
        }



        //if (shapeChance == 2){
        going = true
        c += 1
        shapex = lerp(shapex, mouseX, .1)
        shapey = lerp(shapey, mouseY, .1)
        noStroke()
        fill(age_color)
        circle(shapex, shapey, 3)
        //if (c == 10){
        //going = false
        //}
        //}

        fill(col2);
        noStroke();
        ellipse(x2, y2, 30, 30);

        fill(col2);
        noStroke();
        ellipse(x2 - 10, y2 - 10, 30, 30);

        fill(col2);
        noStroke();
        ellipse(x2 + 10, y2 + 10, 30, 30);

    }

    if (age < 1000) {
        fill(age_color)
        circle(width / 2, height / 2 + 12, 1)
    }
    if (age > 1000) {
        fill(255)
        circle(width / 2, height / 2, 55)
        fill(0)
        circle(width / 2, height / 2, 5)
        if (age > 1020) {
            appear = false
        }
        if (age > 1180) {
            d3 = true
        }
    }

}



/////////////////////////////
//D3
/////////////////////////////



function dim3() {
    beat += 0.1
    rate = map(beat, 0, 500, 0.001, 0.5)
    erratic = map(beat, 0, 500, 90, 700)
    fill(255)
    circle(width / 2, height / 2, 15)
    fill(0)
    pulse = 5 + 10 * sin(beat * rate)
    circle(width / 2, height / 2, pulse)
    circ = circ + (2 * PI / 360);
    let r = noise(frameCount * 0.005);
    r = map(r, 0, 1, 10, erratic);


    //circle 1

    let x = width / 2 + cos(circ) * r;
    let y = height / 2 + sin(circ) * r;


    if (col >= 255) {

        sub = true;
    }

    if (col <= 0) {

        sub = false;
    }

    if (sub == true) {

        col -= 1;
    }

    if (sub == false) {

        col += 1;
    }



    fill(col);
    noStroke();
    ellipse(x, y, 30, 30);

    fill(col);
    noStroke();
    ellipse(x - 10, y - 10, 30, 30);

    fill(col);
    noStroke();
    ellipse(x + 10, y + 10, 30, 30);

    //circle 2

    let x2 = width / 2 - cos(circ) * r;
    let y2 = height / 2 - sin(circ) * r;

    if (col2 >= 255) {

        sub2 = true;
    }

    if (col2 <= 0) {

        sub2 = false;
    }

    if (sub2 == true) {

        col2 -= 1;
    }

    if (sub2 == false) {

        col2 += 1;
    }



    fill(col2);
    noStroke();
    ellipse(x2, y2, 30, 30);

    fill(col2);
    noStroke();
    ellipse(x2 - 10, y2 - 10, 30, 30);

    fill(col2);
    noStroke();
    ellipse(x2 + 10, y2 + 10, 30, 30);

    if (beat > 400) {
        t += 0.1
        accel = accel + 0.0001 * t
        copy(0, 0, width, height, (width - width) - accel, (height - height) - accel, width + accel * 2, height + accel * 2);
        if (accel > 40) {
            theEnd()
        }
    }
}



///////////////////////////////////
//END
///////////////////////////////////



function theEnd() {
    d3 = false
    demen2 = false
    hit = true
    end = true
    newdemen = false
    pre = false
    rippleChance = 0
    noStroke()
    fill(0)
    if (d < 800) {
        circle(width / 2, height / 2, d)
        d += 100
    }
    if (d >= 800) {
        //circle stuff
        circ = circ + (2 * PI / 360);
        let r = noise(frameCount * 0.005);
        r = map(r, 0, 1, 0, 30);

        //let r = noise(frameCount * 0.005);
        //r = map(r,0,1,50,200);

        //circle 1

        let x = width / 2 + cos(circ) * r;
        let y = height / 2 + sin(circ) * r;


        if (col >= 255) {

            sub = true;
        }

        if (col <= 0) {

            sub = false;
        }

        if (sub == true) {

            col -= 1;
        }

        if (sub == false) {

            col += 1;
        }



        fill(col);
        noStroke();
        ellipse(x, y, 30, 30);


        //circle 2

        let x2 = width / 2 - cos(circ) * r;
        let y2 = height / 2 - sin(circ) * r;

        if (col2 >= 255) {

            sub2 = true;
        }

        if (col2 <= 0) {

            sub2 = false;
        }

        if (sub2 == true) {

            col2 -= 1;
        }

        if (sub2 == false) {

            col2 += 1;
        }



        fill(col2);
        noStroke();
        ellipse(x2, y2, 30, 30);




        filter(BLUR, 1)
        copy(0, 0, width, height, (width - width) - 5, (height - height) - 5, width + 10, height + 10);

    }

}

function mousePressed() {
    pre = true
}