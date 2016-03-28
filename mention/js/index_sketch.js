var showMenu = false;

var menu_audio;
var menu_video;
var menu_info;

var pos_gabor = [];
var pos_maro = [];
var pos_myles = [];

var lerp_inc = 0.1;
var lerp_gabor = 0;


var progress_gabor = 0;
var progress_maro = 0;
var progress_myles = 0;

var step;
var drawArtist = false;
var addingVector = true;

var artist;
var gabor;
var otodojo;
var myles;

var periode = ['p','e','r','i','o','d','e'];
var periode_position = [];
var periode_alpha = [0, 0, 0, 0, 0, 0, 0];
var current_alpha = 0;

var dashes = [];
var dash_start;
var dash_end;
var dash_start_time;
var dash_timer;

var fg_col = 0;
var bg_col = 255;

var single = true;

var fg_col;
var bg_col;

var lerp_val = 1;
var lerp_inc = 0.05;

var coeff = 0.0025;
var inc;
function setup(){
  var w = windowWidth*0.3;
  var h = windowHeight*0.5;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');


  menu_audio = document.getElementById('audio');
  menu_video = document.getElementById('video');
  menu_info = document.getElementById('info');

  var t = createVector(1, height*random(0.2, 0.7));

  dashes[0] = new Dash(createVector(1, 0), t, 'down');
  dashes[1] = new Dash(createVector(1, height), t, 'up');

  fg_target = 0;
  bg_target = 255;

  fg_col = color(255, 120, 120);
  bg_col = color(255, 255, 255);

  color_dir = 1;
  inc = Math.floor(random(10, 30));
  strokeCap(SQUARE);
}

window.onmousemove = function(){
  coeff = mouseX*0.000005;
}

function draw(){
  background(255);
  noStroke();
  fill(lerpColor(fg_col, bg_col, lerp_val));
  ellipse(width*0.5, height*0.5, height, height);
noFill();
strokeWeight(2);

for(var i = 0; i < width; i+=inc){
  strokeWeight((cos(i*0.02)+2)*3);
  stroke(lerpColor(bg_col, fg_col, lerp_val));
  line(i+cos(i+millis()*coeff)*10, noise(i)*50, i+cos(i+millis()*coeff)*10, height-noise(i)*50);
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

function displayMenu(){
  menu_audio.style.opacity = 1;
  menu_video.style.opacity = 1;
  menu_info.style.opacity = 1;
}

function hideMenu(){
  menu_audio.style.opacity = 0;
  menu_video.style.opacity = 0;
  menu_info.style.opacity = 0;
}
