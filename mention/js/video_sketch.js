var periode;
var back;

var color_dir = 1;

var dots = [];
var alphas = [];
var colors = [];
var orig;
var rad;
var theta = 0;

function setup(){
  var w = windowWidth*0.3;
  var h = 45;
  var cnv = createCanvas(w, h);
  cnv.position(0, 0);
  cnv.parent('first');

  periode = document.getElementById('periode');
  back = document.getElementById('back');

  colorMode(HSB, 100);

  orig = createVector(width*0.5, height*0.5);
  rad = createVector(width*0.3, height*0.2);

  setInterval(addDots, 50);
}

function draw(){
  background(255);

  noFill();
  rectMode(CENTER);
  for(var i = 0; i < dots.length; i++){
    // line(orig.x, orig.y, dots[i].x, dots[i].y);
    stroke(hue(colors[i]), saturation(colors[i]), brightness(colors[i])*(min(map(mouseX, 0, width*1, 0.1, 0.5), 0.95)), alphas[i]*(cos(i+millis()*0.0075)+1)*map(mouseX, 0, width*0.5, 0, 1));

    if(alphas[i] < 50)
      alphas[i] += 0.25;

    strokeWeight(1);
    ellipse(dots[i].x, dots[i].y, 2, 2);
    stroke(0, 10);
    line(dots[i].x, dots[i].y, width*0.5, height);
    line(dots[i].x, dots[i].y, width*0.5, 0);
  }


}

function addDots(){
  var p = createVector(orig.x + cos(radians(theta))*(rad.x+random(1)), orig.y + sin(radians(theta))*(rad.y+random(1)));
  var c = color(20, 40, 30);

  if(dots.length < 300){
    dots.push(p);
    alphas.push(0);
    colors.push(c);
    theta += 33;
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
