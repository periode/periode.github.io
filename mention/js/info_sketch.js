var statement;
var back;

var lines = [];
var point;
var step;
var scroll = 0;

var color_dir = 1;
var lerp_val = 1;
var lerp_inc = 0.05;

function setup(){
  var w = windowWidth*0.3;
  var h = windowHeight*0.5;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');

  statement = document.getElementById('statement');
  back = document.getElementById('back');

  point = createVector(width*0.025, height*0.025);
  step = random(4, 40);
  setInterval(addLine, 5);
}

function draw(){
  background(lerp(0, 255, lerp_val));

  translate(0, scroll);
  lines.forEach(function(e, i , a){
    e.display();
  });

  lerp_val += lerp_inc*color_dir;
  lerp_val = constrain(lerp_val, 0, 1);
}

function addLine(){
  var p = createVector(point.x, point.y);
  var c = Math.floor(Math.random()*2);
  var l = new Line(p, step, c);
  point.x += step;
  lines.push(l);

  if(point.x > width*0.95){
    point.x = width*0.025;
    point.y += height*0.05;

    if(point.y > height*0.95){
      scroll -= 2.25;
      // point = createVector(width*0.05, height*0.05);
      // w = random(10, 20);
      // lines = [];
    }
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
  statement.style.opacity = 1;
  back.style.opacity = 1;
}

function hideMenu(){
  statement.style.opacity = 0;
  back.style.opacity = 0;
}


var Line = function(_pos, _w, _c){
  this.pos = _pos;
  this.w = _w;
  this.h = height*0.01;
  this.col_coeff = _c;
  this.col = lerp(255, 0, lerp_val);


  this.display = function(){
    this.col = lerp(255, 0, lerp_val);
    stroke(this.col*this.col_coeff);
    line(this.pos.x, this.pos.y, this.pos.x+this.w, this.pos.y);
  }
}
