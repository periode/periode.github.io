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
var lerp_val = 1;
var lerp_inc = 0.05;
var color_dir = 1;


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
  bg = color(255, 255, 255);
}

function draw(){
  // background(lerpColor(fg, bg, lerp_val));
  background(255);
  fill(lerpColor(fg, bg, lerp_val));
  stroke(lerpColor(bg, fg, lerp_val));
  rectMode(CENTER);
  var s = height/0.5;
  var coeff = 0.0005;
  for(var i = 0; i < 10; i++){
    push();
    translate(width/11+i*width/11, height/2);
    rotate(PI/4);
    rect(0, 0, s*noise(i, cos(millis()*coeff)), s*noise(i, cos(millis()*coeff)));
    pop();
  }

  lerp_val += lerp_inc*color_dir;
  lerp_val = constrain(lerp_val, 0, 1);
}

function mouseReleased(){
  if(color_dir == 1){
    displayMenu();
  }else{
    hideMenu();
  }
  color_dir *= -1;
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
