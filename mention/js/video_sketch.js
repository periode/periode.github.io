var periode;
var back;

var color_dir = 1;

var pos = [];

function setup(){
  var w = windowWidth*0.3;
  var h = 45;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');

  periode = document.getElementById('periode');
  back = document.getElementById('back');

  for(var i = 0; i < 3; i++){
    pos[i] = [random(width), random(width), random(height), random(height)];
  }
}

function draw(){
  background(255);
  // beginShape();
  // vertex(width/2, width/2, height/2, height/2);
  // for(var i = 0; i < pos.length; i++){
  //   quadraticVertex(pos[i][0], pos[i][1], pos[i][2], pos[i][3]);
  // }
  // endShape();
  noStroke();
  for(var i = 0; i < 10; i++){
    fill(120, 180, 240, map(mouseX, 0, width, 10, 180));
    push();
    translate(map(mouseY, 0, height*0.5, 1, 3)*i+width*0.1, height/2);
    rotate(millis()*0.001*i);
    scale(0.1);
    arc(0, height, width, height*3, 0, -TWO_PI);
    pop();
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
  periode.style.opacity = 1;
  back.style.opacity = 1;
}

function hideMenu(){
  periode.style.opacity = 0;
  back.style.opacity = 0;
}
