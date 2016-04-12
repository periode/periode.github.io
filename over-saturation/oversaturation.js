var dots = [];
var splashes = [];
var links = [];

var dot_index = 0;
var link_index = 0;

var start_time = 0;
var timer = 3000;

var stars = [];

var dot_size = 4;

var greetings = ['مرحبا', 'bonjour', 'hello', 'hallo', 'hola', 'হ্যালো', '你好', 'ahoj', 'kamusta', 'Χαίρετε', 'હેલો', 'שלום', 'slav', 'سلام', 'звать', 'hodi', 'வணக்கம்', 'merhaba', 'ہیلو'];

function setup(){
 var cnv = createCanvas(windowWidth, windowHeight);

 for(var i = 0; i < 20; i++){
   stars[i] = createVector(random(width), random(height));
 }

 frameRate(35);
}

function update(){

  if(millis() - start_time > timer && dots.length < 7){
    start_time = millis();
    timer *= 1.5;
    addDot(createVector(random(width*0.3, width*0.7), random(height*0.3, height*0.7)), color(random(100, 255), random(100, 255), random(100, 255)), dot_size);
  }

  dots.forEach(function(e, i, a){
    e.update();
  });
// fill(255);
  if(links.length > 1000){
    // text('removing', 100, 100);
    links.splice(0, 10);
  }else if(links.length > 1500){
    links.splice(0, 100);
  }else if(links.length > 2500){
    links.splice(0, 200);
  }

  if(dots.length > 15)
    dots.splice(0, 1);
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
  // noFill();
  // stroke(100);
  // ellipse(mouseX, mouseY, 3, 3);

  if(frameRate() < 2){
    restart();
  }

  drawTitle();
}

function drawTitle(){
  noStroke();
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text('circle around', width*0.5, height*0.05);
}

function restart(){
  // dots = [];
  links = [];
  // splashes = [];
  // dots_index = 0;
  // timer = 3000;
  // start_time = millis();
  // for(var i = 0; i < 8; i++){
  //   stars[i] = createVector(random(width), random(height));
  // }
}

function debug(){
  noStroke();
  fill(0, 200, 0);
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
  addDot(createVector(mouseX, mouseY), color(random(100, 255), random(100, 255), random(100, 255)), dot_size);
}
