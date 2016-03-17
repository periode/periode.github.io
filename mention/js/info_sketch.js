var statement;
var back;

function setup(){
  var w = windowWidth*0.3;
  var h = 45;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');

  statement = document.getElementById('statement');
  back = document.getElementById('back');
}

function draw(){
  background(noise(millis()*0.01)*255);
}

function displayMenu(){
  statement.setAttribute('class', 'shown');
  back.setAttribute('class', 'shown');
}
