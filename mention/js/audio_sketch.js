var dashes = [];
var dash_start;
var dash_end;
var dash_start_time;
var dash_timer;

var middle_line_top;

var gabor;
var myles;
var otodojo;
var back;

var fg;
var bg;

function setup(){
  var w = windowWidth*0.3;
  var h = 45;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');

  gabor = document.getElementById('gabor');
  myles = document.getElementById('myles');
  otodojo = document.getElementById('otodojo');
  back = document.getElementById('back');

  fg = color(140, 220, 170);
  bg = 255;
}

function draw(){
  background(bg);
  fill(140, 220, 170, 100-map(mouseX, 0, width/2, 0, 100));
  stroke(140, 220, 170, map(mouseX, 0, width/2, 0, 100));
  // noStroke();
  rectMode(CENTER);
  var s = height/0.5;
  var coeff = 0.0005;
  for(var i = 0; i < 10; i++){
    push();
    translate(width/11+i*width/11, height/2);
    rotate(PI/4);
    rect(0, 0, s*noise(i, cos(millis()*coeff)), s*noise(i, cos(millis()*coeff)));
    pop();
    // triangle(cos(millis()*0.001+i)*width/2+width/2, 0, 0, height/2+cos(millis()*0.001)*height/2, width, height/2+sin(millis()*0.001)*height/2);
  }

}

function mouseReleased(){

  if(bg == 255){
    bg = color(140, 220, 170);
    fg = 255;
    displayMenu();
  }else{
    bg = 255;
    fg = color(140, 220, 170);
    hideMenu();
  }

}

function displayMenu(){
  gabor.style.opacity = 1;
  myles.style.opacity = 1;
  otodojo.style.opacity = 1;
  back.style.opacity = 1;
}

function hideMenu(){
  gabor.style.opacity = 0;
  myles.style.opacity = 0;
  otodojo.style.opacity = 0;
  back.style.opacity = 0;
}
