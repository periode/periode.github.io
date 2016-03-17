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
}

function draw(){
  background(noise(millis()*0.001)*255);
}

function displayMenu(){
  gabor.setAttribute('class', 'shown');
  myles.setAttribute('class', 'shown');
  otodojo.setAttribute('class', 'shown');
  back.setAttribute('class', 'shown');
}
