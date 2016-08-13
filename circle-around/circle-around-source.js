var dots = [];
var splashes = [];
var links = [];

var dot_index = 0;
var link_index = 0;

var start_time = 0;
var timer = 3000;

var stars = [];

var dot_size = 4;

var titleCol = 255;
var targetCol = 255;
var previousCol = targetCol;
var lerpCol = 0;

var greetings = ['مرحبا', 'bonjour', 'hello', 'hallo', 'hola', 'হ্যালো', '你好', 'ahoj', 'kamusta', 'Χαίρετε', 'હેલો', 'שלום', 'slav', 'سلام', 'звать', 'hodi', 'வணக்கம்', 'merhaba', 'ہیلو'];

function setup(){
 var cnv = createCanvas(windowWidth, windowHeight);

 titleCol = color(0, 0, 0);
 targetCol = color(255, 255, 255);
 previousCol = titleCol;

 for(var i = 0; i < 20; i++){
   stars[i] = createVector(random(width), random(height));
 }

 frameRate(35);
}

function update(){

  if(millis() - start_time > timer && dots.length < 7){
    start_time = millis();
    timer *= 1.5;
    addDot(createVector(random(width*0.3, width*0.7), random(height*0.3, height*0.7)), color(random(100, 255), random(100, 255), random(100, 245)), dot_size);
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

  if(dots.length > 10)
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
  fill(titleCol);
  textSize(20);
  textAlign(CENTER);
  text('circle around', width*0.5, height*0.05);

  titleCol = lerpColor(previousCol, targetCol, lerpCol);
  if(lerpCol < 1)
    lerpCol += 0.05;
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
  if(dots.length < 10){
    previousCol = color(red(titleCol), green(titleCol), blue(titleCol));
    targetCol = col;
    lerpCol = 0;

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
}

function mouseReleased(){
  // background(0);
  addDot(createVector(mouseX, mouseY), color(random(100, 255), random(100, 255), random(100, 255)), dot_size);
}

var Dot = function(_pos, _col, _rad, _index){
  this.index = _index;

  this.closeness = [];
  for(var i = 0; i < dots.length; i++){
    this.closeness[i] = false;
  }

  this.greeting_alpha = 255;
  this.greeting = greetings[Math.floor(Math.random()*greetings.length)];

  this.position = _pos.copy();
  this.velocity = createVector(0.2+Math.random(), 0.2+Math.random());
	this.acceleration = createVector(0, 0);
	this.maxForce = 1;
	this.maxVelocity = 1;
	this.wander_angle = 0;
	this.wander_limit = 0.8;
	this.wander_coeff = 0.2;

  this.bounce_coeff = 1.5;
  this.bounce_limit = 5;

  this.seek_coeff = 0.5;
  this.seek_limit = 0.3;

  this.col = color(red(_col), green(_col), blue(_col));
  this.connect_alpha = 0;
  this.rad = _rad;
  this.inner_alpha = 0;
  this.max_inner_alpha = 255;
  this.min_inner_alpha = 0;
  this.alpha = 0;

  this.hadChild = false;
  this.resetChild = 0;
  this.resetChildTimer = 20000;

  //wander
  this.wander;
  this.wander_change = 0.1;

  this.resetChild = function(){
    this.hadChild = false;
  }
}

Dot.prototype.display = function(){
  noFill();

  stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
  fill(red(this.col), green(this.col), blue(this.col), this.inner_alpha);
  push();
  translate(this.position.x, this.position.y);
  ellipse(0, 0, 2+this.rad, 2+this.rad);

  if(this.greeting_alpha > 0){
    textSize(10);
    noStroke();
    fill(red(this.col), green(this.col), blue(this.col), this.greeting_alpha);
    text(this.greeting, 10, 10);
    this.greeting_alpha -= 4;
  }
  pop();
}

Dot.prototype.apply_force= function(f){
  this.acceleration.add(f);
}

Dot.prototype.seek = function(target, limit, coeff){
  var desired = target.sub(this.position);

  desired.normalize();
  desired.mult(coeff);

  var steer = this.velocity.sub(desired);
  steer.limit(limit);

  this.apply_force(steer);
}

Dot.prototype.bounce = function(){
  var target;

  if(this.position.x > width*0.9-this.rad)
    target = createVector(this.bounce_coeff, this.velocity.y);

  if(this.position.x < width*0.1+this.rad)
    target = createVector(-this.bounce_coeff, this.velocity.y);

  if(this.position.y > height*0.9-this.rad)
    target = createVector(this.velocity.x, this.bounce_coeff);

  if(this.position.y < height*0.1+this.rad)
    target = createVector(this.velocity.x, -this.bounce_coeff);

  if(target != null){
    target.normalize();
    target.mult(this.bounce_coeff);

    var steer = this.velocity.sub(target);
    steer.limit(this.bounce_limit);

    this.apply_force(steer);
  }

  for(var i = 0; i < dots.length; i++){
    if(dots[i] != this){
      var other = dots[i];
      if(this.position.dist(other.position) < (this.rad*0.5 + other.rad*0.5)){
        this.velocity.mult(-1);
      }
    }
  }
}

Dot.prototype.update = function(){
  this.bounce();
  this.wander();
  this.connectOther();

  var growing = false;
  for(var i = 0; i < this.closeness.length; i++){
    if(this.closeness[i])
      growing = true;
  }

  if(growing){
    if(this.inner_alpha < this.max_inner_alpha)
      this.inner_alpha += 7.5;
    if(this.connect_alpha < 150)
    this.connect_alpha += 5;
  }else{
    if(this.connect_alpha > 0)
      this.connect_alpha -= 5;

      if(this.inner_alpha > this.min_inner_alpha)
      this.inner_alpha -= 10;
  }

  if(this.connect_alpha > 5){
    push();
    translate(this.position.x, this.position.y);
    noFill();
    strokeWeight(1);
    rotate(millis()*0.0005);

    for(var i = 0; i < 360; i+=30){
      stroke(red(this.col), green(this.col), blue(this.col), this.connect_alpha*abs(cos(radians(i+millis()*0.01))));
      line(cos(radians(i))*this.rad*4, sin(radians(i))*this.rad*4, cos(radians(i))*this.rad*6*abs(cos(i+millis()*0.005)), sin(radians(i))*this.rad*6*abs(cos(i+millis()*0.005)));
    }

    pop();
  }

  if(this.hadChild && millis() - this.resetChild > this.resetChildTimer){
    this.hadChild = false;
    this.resetChildTimer *= 1.15;
  }

  if(this.alpha < 255)
    this.alpha += 5;

  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxVelocity);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}

Dot.prototype.wander = function(){
  var wander_radius = height*0.2;
  var wander_distance = height*0.4;
  var change = 0.5;

  //TODO this would work better with a noise function that would be limited to a small cone at the other end of the aim circle?
  this.wander_angle += random(-change, change);

  //we aim at a particular direction
  var wander_aim = this.velocity.copy();
  wander_aim.normalize();
  wander_aim.mult(wander_distance);
  wander_aim.add(this.position);

  var h = this.velocity.heading();

  wander_edge = createVector(cos(this.wander_angle+h)*wander_radius*0.5, sin(this.wander_angle+h)*wander_radius*0.5);

  var target = wander_aim.add(wander_edge);
  this.seek(target, this.wander_limit, this.wander_coeff);
}

Dot.prototype.connectOther = function(){
  for(var i = 0; i < dots.length; i++){
    if(dots[i] != this){
      if(this.position.dist(dots[i].position) < width*0.1){
        stroke(red(this.col), blue(this.col), green(this.col), 30);
        // line(this.position.x, this.position.y, dots[i].position.x, dots[i].position.y);
        if(!this.closeness[i]){
          this.closeness[i] = true;
        }

        if(frameCount % 2 == 0){
          links.push(new Link(this.position, dots[i].position, this.col, link_index));
          link_index++;
        }


        if(this.position.dist(dots[i].position) < width*0.05 && !this.hadChild && !dots[i].hadChild && dots.length < 30){
          addDot(createVector(this.position.x+10, this.position.y+10), color(random(100, 255), random(100, 255), random(100, 255)), dot_size);

          this.hadChild = true;
          dots[i].hadChild = true;
          this.resetChild = millis();
          dots[i].resetChild = millis();
        }
      }else{
        if(this.closeness[i])
          this.closeness[i] = false;
      }
    }
  }
}

var Link = function(_pos1, _pos2, _col, _i){
  this.pos1_max = _pos1.copy();
  this.pos2_max = _pos2.copy();
  this.pos = createVector((this.pos1_max.x+this.pos2_max.x)*0.5, (this.pos1_max.y+this.pos2_max.y)*0.5);
  this.pos1 = this.pos.copy();
  this.pos2 = this.pos.copy();
  this.val = 0;
  this.inc = 0.1;
  this.col = color(red(_col), blue(_col), green(_col));
  this.index = _i;
  this.alpha = 30;

}

Link.prototype.display = function(){
  stroke(red(this.col), blue(this.col), green(this.col), this.alpha);
  line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

  this.alpha -= 0.05;
  if(this.alpha < 0)
    links.splice(this.index, 1);

  if(this.val < 1){
    this.val += this.inc;

    this.pos1 = p5.Vector.lerp(this.pos, this.pos1_max, this.val);
    this.pos2 = p5.Vector.lerp(this.pos, this.pos2_max, this.val);
  }
}

var Splash = function(_pos, _col, _index){
  this.index = _index;
  this.position = _pos;
  this.col = _col;
  this.rad = 0;
  this.alpha = 140;
  this.inner_rad_coeff = random(0.5, 0.85);
  this.ray_num = parseInt(random(30, 60));
}

Splash.prototype.display = function(){

  push();
  translate(this.position.x, this.position.y);
  noStroke();
  fill(red(this.col), green(this.col), blue(this.col), this.alpha*1);


  stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
  noFill();
  for(var i = 0; i < TWO_PI; i+=TWO_PI/this.ray_num){
    ellipse(sin(this.rad*0.01+i)*this.rad*0.5, cos(this.rad*0.01+i)*this.rad*0.5, 1, 1);
    line(0, 0, sin(this.rad*0.01+i)*this.rad*0.5*this.inner_rad_coeff, cos(this.rad*0.01+i)*this.rad*0.5*this.inner_rad_coeff);
  }
  pop();


  this.rad+=4;
  this.alpha-= 1.0;

  if(this.alpha < 0)
    splashes.splice(0, 1);
}
