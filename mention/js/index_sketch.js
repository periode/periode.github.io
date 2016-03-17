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
}

function draw(){
  background(255);

for(var i = 0; i < dashes.length; i++){
  dashes[i].display();
}

//TODO: do the sketch for the home page
// TODO: remove letters from MENTION
// TODO: define center canvas
}

function addNewDash(_orig, _dir){
  if(_dir == 'side'){
    dashes.push(new Dash(_orig, createVector(_orig.x+width*random(0.08, 0.1), _orig.y)), 'side');
  }else if(_dir == 'up' || _dir == 'down'){
    // dashes.push(new Dash(_orig, createVector(_orig.x, 0)), 'up');
    // dashes.push(new Dash(_orig, createVector(_orig.x, height)), 'down');
  }
}

function displayMenu(){
  menu_audio.setAttribute('class', 'shown');
  menu_video.setAttribute('class', 'shown');
  menu_info.setAttribute('class', 'shown');
}
