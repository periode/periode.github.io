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

var frame;

var fg;
var bg;
var lerp_val = 1;
var lerp_inc = 0.05;
var color_dir = 1;

var theta_inc;
var shape_num;


function setup(){
  var w = windowWidth*0.3;
  var h = windowHeight*0.5;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');

  gabor = document.getElementById('gabor');
  myles = document.getElementById('myles');
  otodojo = document.getElementById('otodojo');
  back = document.getElementById('back');
  frame = document.getElementById('frame');

  theta_inc = random(0.3, 0.8);
  shape_num = parseInt(random(20, 100));

  fg = color(140, 220, 170, 100);
  bg = color(255, 255, 255, 100);
}

function draw(){
  // background(lerpColor(fg, bg, lerp_val));
  background(255);
  fill(lerpColor(fg, bg, lerp_val));
  // noFill();
  stroke(lerpColor(bg, fg, lerp_val));
  rectMode(CENTER);
  var s = height*0.25;
  var coeff = 0.0005;
  for(var i = 1; i < shape_num; i++){
    push();
    translate(width/2, height/2);
    rotate(PI/4+constrain(map(mouseX, 0, width, 0, PI), 0, PI)+i);
    beginShape();
    scale(0.5+cos(i*millis()*0.000025));
    for(var theta = 0; theta < TWO_PI; theta += theta_inc){
      vertex(sin(theta)*i, cos(theta)*i);
    }
    endShape(CLOSE);
    // rect(0, 0, s*noise(i, cos(millis()*coeff)), s*noise(i, cos(millis()*coeff)));
    // rotate(-HALF_PI*0.5);
    // noStroke();
    // fill(255);
    // rect(0, 0, s*noise(i, cos(millis()*coeff)), s*noise(i, cos(millis()*coeff)));
    pop();
  }

  lerp_val += lerp_inc*color_dir;
  lerp_val = constrain(lerp_val, 0, 1);
}

function mouseReleased(){
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    toggleFade();
  }
}

function toggleFade(){
  if(color_dir == 1){
    displayMenu();
    color_dir = -1;
  }else{
    hideMenu();
    color_dir = 1;
  }
}

function showGabor(){
  frame.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/19124160&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
  if(frame.style.visibility != 'visible')
    frame.style.visibility = 'visible';
}

function showMyles(){
  frame.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/22203774&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
  if(frame.style.visibility != 'visible')
    frame.style.visibility = 'visible';
}

function showOtodojo(){
  frame.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/2912448&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
  if(frame.style.visibility != 'visible')
    frame.style.visibility = 'visible';
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
  // back.style.opacity = 0;
}
