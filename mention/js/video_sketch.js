var periode;
var back;
var videos = [];

var color_dir = 1;

var dots = [];
var alphas = [];
var colors = [];
var orig;
var rad;
var theta = 0;

var lerp_val = 1;
var lerp_inc = 0.025;

function setup(){
  var w = windowWidth*0.3;
  var h = windowHeight*0.5;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');

  periode = document.getElementById('periode');
  back = document.getElementById('back');
  videos = document.getElementsByClassName('videos');

  colorMode(HSB, 100);

  orig = createVector(width*0.5, height*0.5);
  rad = createVector(width*0.3, height*0.2);

  setInterval(addDots, 50);
  rectMode(CENTER);
}

function draw(){
  background(255);
  fill(lerp(0, 255, lerp_val));
  noStroke();
  push();
  translate(width*0.5, height*0.5);
  rotate(HALF_PI*0.5);
  rect(0, 0, width*0.5, width*0.5);
  pop();

  noFill();
  rectMode(CENTER);
  push();
  translate(width*0.5, height*0.5);
  rotate(lerp(PI, 0, lerp_val*lerp_val));
  for(var i = 0; i < dots.length; i++){
    // line(orig.x, orig.y, dots[i].x, dots[i].y);
    stroke(lerp(255, 0, lerp_val), 10+alphas[i]*(cos(i+millis()*0.0075)+1)*0.25);
    line(dots[i].x, dots[i].y, 0, lerp(-height*0.25, height*0.25, lerp_val));
    line(dots[i].x, dots[i].y, 0, lerp(height*0.25, -height*0.25, lerp_val));

    if(alphas[i] < 50)
      alphas[i] += 0.25;

    strokeWeight(1);
    stroke(lerp(255, 0, lerp_val), 10+alphas[i]*(cos(i+millis()*0.0075)+1)*map(mouseX, 0, width, 0, 0.25));
    ellipse(dots[i].x, dots[i].y, 1, 1);

  }
  pop();

  lerp_val += lerp_inc*color_dir;
  lerp_val = constrain(lerp_val, 0, 1);
}

function addDots(){
  var p = createVector(cos(radians(theta))*(rad.x+random(1)), sin(radians(theta))*(rad.y+random(1)));
  var c = color(20, 40, 30);

  if(dots.length < 90){
    dots.push(p);
    alphas.push(0);
    colors.push(c);
    theta += 33;
  }

}

function mouseReleased(){
  if(color_dir == 1){
    console.log('change');
    displayMenu();
    color_dir = -1;
  }else{
    hideMenu();
    color_dir = 1;
  }
}

function displayMenu(){
  periode.style.opacity = 1;
  for(var i = 0; i < videos.length; i++){
    videos[i].style.opacity = 1;
  }
  back.style.opacity = 1;
}

function hideMenu(){
  periode.style.opacity = 0;
  for(var i = 0; i < videos.length; i++){
    videos[i].style.opacity = 0;
  }
  // back.style.opacity = 0;
}
