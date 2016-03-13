var dashes = [];
var dash_start;
var dash_end;
var dash_start_time;
var dash_timer;

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);

  dash_start =  createVector(width*0.5, parseInt(document.defaultView.getComputedStyle(title, "").getPropertyValue("height").substring(0, 2))+2);
  dash_end = createVector(width*0.515, parseInt(document.defaultView.getComputedStyle(title, "").getPropertyValue("height").substring(0, 2))+2);
  dash_start_time = millis();
  dash_timer = 50;

}

function draw(){
  background(255);
  drawDashes();
}

function drawDashes(){

  if(millis() - dash_start_time > dash_timer && dash_start.x < width*0.9){
    dash_start.x += width*0.015;
    dash_end.x += width*0.015;

    var d = new Dash(dash_start, dash_end);
    if(Math.random() > 0.3)
      dashes.push(d);
    dash_start_time = millis();
  }

  for(var i = 0; i < dashes.length; i++){
    dashes[i].display();
  }
}
