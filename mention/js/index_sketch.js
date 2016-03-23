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

var fg_target;
var bg_target;

var coeff = 0.0025;
var inc;
function setup(){
  var w = windowWidth*0.3;
  var h = 45;
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
  color_dir = 1;
  inc = Math.floor(random(10, 30));
}

window.onmousemove = function(){
  coeff = mouseX*0.000005;
}

function draw(){
  background(bg_target);

strokeWeight(2);

for(var i = 0; i < width; i+=inc){
  strokeWeight((cos(i*0.02)+2)*3);
  stroke(255, 120, 120);
  line(i+cos(i+millis()*coeff)*10, 0, i+cos(i+millis()*coeff)*10, height);
}

fg_target = min(max(fg_target - 10*color_dir, 0), 255);
bg_target = min(max(bg_target + 10*color_dir, 0), 255);

// TODO: remove letters from MENTION
// TODO: define center canvas
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
  menu_audio.style.opacity = 1;
  menu_video.style.opacity = 1;
  menu_info.style.opacity = 1;
}

function hideMenu(){
  menu_audio.style.opacity = 0;
  menu_video.style.opacity = 0;
  menu_info.style.opacity = 0;
}
