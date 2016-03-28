var dots = [];
var splashes = [];
var links = [];

var dot_index = 0;
var link_index = 0;

var start_time = 0;
var timer = 2000;

var stars = [];

function setup(){
 var cnv = createCanvas(windowWidth, windowHeight);

 for(var i = 0; i < 20; i++){
   stars[i] = createVector(random(width), random(height));
 }
}

function update(){

  if(millis() - start_time > timer && dots.length < 7){
    start_time = millis();
    timer *= 2;
    addDot(createVector(random(width*0.3, width*0.7), random(height*0.3, height*0.7)), color(random(100, 255), random(100, 255), random(100, 255)), 2);
  }

  dots.forEach(function(e, i, a){
    e.update();
  });

  if(links.length > 1000){
    links.splice(0, dots.length);
  }

  if(links.length > 1500){
    links.splice(0, dots.length*2);
  }

  if(links.length > 2500){
    links.splice(0, dots.length*4);
  }
}

function draw(){
  noCursor();
  drawBackground();
  update();

  splashes.forEach(function(e, i, a){
    e.display();
  });

  links.forEach(function(e, i, a){
    e.display();
  });

  dots.forEach(function(e, i, a){
    e.display();
  });

  // debug();
  noFill();
  stroke(100);
  ellipse(mouseX, mouseY, 3, 3);

  if(frameRate() < 2){
    restart();
  }
}

function restart(){
  dots = [];
  links = [];
  splashes = [];
  dots_index = 0;
  timer = 3000;
  start_time = millis();
  for(var i = 0; i < 8; i++){
    stars[i] = createVector(random(width), random(height));
  }
}

function debug(){
  noStroke();
  fill(255);
  // text(frameRate(), 10, 10);
  text(dots.length, 10, 10);
  text(links.length, 10, 30);
  text(splashes.length, 10, 50);
    text(frameRate(), 10, 70);
}

function drawBackground(){
  background(0);
  stroke(255, 10);
  stars.forEach(function(e, i, a){
    push();
    translate(e.x, e.y);
    rotate((i % 2)*HALF_PI);
    line(-4-(i%3), 0, 4+(i%3), 0);
    pop();
  });
}

function addDot(pos, col, size){
  var d = new Dot(pos, col, size, dot_index);
  dots.push(d);
  for(var i = 0; i < dots.length; i++){
    var c = false;
    dots[i].closeness.push(c);
  }
  dot_index++;

  var s = new Splash(pos, col, dot_index);
  splashes.push(s);
}

function mouseReleased(){
  // background(0);
  addDot(createVector(mouseX, mouseY), color(random(100, 255), random(100, 255), random(100, 255)), 2);
}
