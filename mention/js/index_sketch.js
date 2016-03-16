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

var interval_vector = 100;

var middle_line_top;
var starting_point;

function setup(){
  var w = windowWidth*0.3;
  var h = 45;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');


  menu_audio = document.getElementById('audio');
  menu_video = document.getElementById('video');
  menu_info = document.getElementById('info');
  // document.getElementById('title').style.top = height*0.05;
}

function draw(){
  background(255);

  line(0, 0, width, height);

//TODO: do the sketch for the home page
// TODO: remove letters from MENTION
// TODO: add other fontface
// TODO: switch menu class so that they fade in
// TODO: define center canvas
}

function drawInitialSketch(){
  fill(255);
  stroke(0);
  rect(width*0.2, height*0.05, width*0.3, height*0.15);
}

function displayMenu(){
  menu_audio.setAttribute('class', 'shown');
  menu_video.setAttribute('class', 'shown');
  menu_info.setAttribute('class', 'shown');
}
