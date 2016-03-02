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
var addingVector = false;

var artist;
var gabor;
var otodojo;
var myles;

var periode = ['p','e','r','i','o','d','e'];

var fg_col = 0;
var bg_col = 255;

var interval_vector = 100;

var middle_line_top;

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);

  step = width*0.025;
  middle_line_top = height;
  middle_line_top = height*0.3;

  pos_gabor[0] = createVector(progress_gabor, height*0.6);
  pos_maro[0] = createVector(progress_maro, height*0.6);
  pos_myles[0] = createVector(progress_maro, height*0.6);
  background(255);

  var title = addElement('title');
  title.innerHTML = 'MENTION';
  title.setAttribute('href', 'index.html');
  title.style.top = '2%';

  var audio = addElement('audio');
  audio.innerHTML = 'audio';
  audio.setAttribute('href', 'audio.html');

  var audio = addElement('video');
  video.innerHTML = 'video';
  video.setAttribute('href', 'video.html');

  var info = addElement('info');
  info.innerHTML = 'info';
  info.setAttribute('href', 'info.html');
}

function draw(){
  background(bg_col);

  drawFirstLine();
  for(var i = 0; i < pos_gabor.length-1; i++){
    stroke(fg_col);
    strokeWeight(2);
    if(i < pos_gabor.length-2){
      line(pos_gabor[i].x, pos_gabor[i].y, pos_gabor[i+1].x, pos_gabor[i+1].y);
    }else{
      var pos_temp = p5.Vector.lerp(pos_gabor[i], pos_gabor[i+1], lerp_gabor);
      line(pos_gabor[i].x, pos_gabor[i].y, pos_temp.x, pos_temp.y);
    }

    for(var j = 0; j < 5; j++){
      strokeWeight(1);
      stroke(fg_col, (mouseY-j*50-height*0.3));
      fill(fg_col, mouseY-j*100);
      line(pos_gabor[i].x, pos_gabor[i].y-j*05*constrain(sin(millis()*0.001+i*0.1), -10, 10), pos_gabor[i+1].x, pos_gabor[i+1].y-j*10*cos(millis()*0.001+i*0.1+1));
    }
  }

  for(var i = 0; i < pos_maro.length-1; i++){
    stroke(fg_col);
    strokeWeight(2);
    if(i < pos_maro.length-2){
      line(pos_maro[i].x, pos_maro[i].y, pos_maro[i+1].x, pos_maro[i+1].y);
    }else{
      var pos_temp = p5.Vector.lerp(pos_maro[i], pos_maro[i+1], lerp_gabor);
      line(pos_maro[i].x, pos_maro[i].y, pos_temp.x, pos_temp.y);
    }

    for(var j = 0; j < 5; j++){
      strokeWeight(1);
      stroke(fg_col, (mouseY-j*50-height*0.3));
      fill(fg_col, mouseY-j*100);
      line(pos_maro[i].x, pos_maro[i].y-j*05*min(sin(millis()*0.001+i*0.1+1), 10), pos_maro[i+1].x, pos_maro[i+1].y-j*10*cos(millis()*0.001+i*0.1));
    }
  }

  for(var i = 0; i < pos_myles.length-1; i++){
    stroke(fg_col);
    strokeWeight(2);
    if(i < pos_myles.length-2){
      line(pos_myles[i].x, pos_myles[i].y, pos_myles[i+1].x, pos_myles[i+1].y);
    }else{
      var pos_temp = p5.Vector.lerp(pos_myles[i], pos_myles[i+1], lerp_gabor);
      line(pos_myles[i].x, pos_myles[i].y, pos_temp.x, pos_temp.y);
    }


    for(var j = 0; j < 5; j++){
      strokeWeight(1);
      stroke(fg_col, (mouseY-j*50-height*0.3));
      fill(fg_col, mouseY-j*100);
      line(pos_myles[i].x, pos_myles[i].y-j*05*min(sin(millis()*0.001+i*0.1+2), 10), pos_myles[i+1].x, pos_myles[i+1].y-j*4*cos(millis()*0.001+i*0.1));
    }
  }
drawMiddleLine();


  if(drawArtist){

    drawPeriode();
    if(gabor == null){
      gabor = addElement('gabor');
      gabor.innerHTML = 'gabor';
      gabor.setAttribute('href', 'https://soundcloud.com/mesmarecords');
      gabor.setAttribute('id', 'artist');
      gabor.style.top = pos_gabor[i].y;
      gabor.style.left = pos_gabor[i].x+15;
    }

    if(otodojo == null){
      otodojo = addElement('otodojo');
      otodojo.innerHTML = 'otodojo';
      otodojo.setAttribute('href', 'https://soundcloud.com/otodojo');
      otodojo.setAttribute('id', 'artist');
      otodojo.style.top = pos_maro[i].y;
      otodojo.style.left = pos_maro[i].x+15;
      otodojo.style.textAlign = 'right';
    }

    if(myles == null){
      myles = addElement('myles');
      myles.innerHTML = 'myles avery';
      myles.setAttribute('href', 'https://soundcloud.com/mylesavery');
      myles.setAttribute('id', 'artist');
      myles.style.top = pos_myles[i].y;
      myles.style.left = pos_myles[i].x+15;
      myles.style.textAlign = 'right';
    }
  }

  if(addingVector){
    if(lerp_gabor < 1)
      lerp_gabor += lerp_inc;
    else
      addVector();
  }


  noCursor();
  noFill();
  stroke(0);
  ellipse(mouseX, mouseY, 10, 10);
}

function drawFirstLine(){
  strokeWeight(2);
  var h = parseInt(document.defaultView.getComputedStyle(title, "").getPropertyValue("height").substring(0, 2))+2;

  var end = createVector(max(width*0.45, width*0.45+tan(millis()*0.001)*width*0.1), h);
  line(width*0.45, h, end.x, end.y);

  if(end.x > width && !addingVector){
    // setInterval(addVector, interval_vector);
    addingVector = true;
  }
}

function drawMiddleLine(){
  strokeWeight(1);
  stroke(0);
  for(var i = -1; i < 2; i++){
    line(width*0.5+i*5, height, width*0.5+i*2, middle_line_top);
  }
  textSize(24);
  textAlign(RIGHT);
  text('sound ', width*0.5, middle_line_top);
  textAlign(LEFT);
  text('  visuals', width*0.5, middle_line_top);
  textAlign(CENTER);
  text('  electronic', width*0.5, middle_line_top*0.85);

  if(middle_line_top > height*0.3)
    middle_line_top-= 20;

}

function drawPeriode(){
  fill(0);
  noStroke();
  textSize(16);
  for(var i = 0; i < periode.length; i++){
    fill(0);
    noStroke();
    text(periode[i], width*0.75+i*10, height*0.5+cos(millis()*0.001+map(i, 0, periode.length, 0, PI))*height*0.2);
    stroke(fg_col, (mouseY-i*30-height*0.3));
    line(width*0.75+i*10, height, width*0.75+i*10, height*0.55+cos(millis()*0.001+map(i, 0, periode.length, 0, PI))*height*0.2)
  }
}

function addVector(){
  if(progress_gabor < width*0.3){
    progress_gabor += step;
    var v = createVector(progress_gabor, height*0.55-noise(millis()*0.0005)*height*0.25);
    lerp_gabor = 0;

    progress_maro += step;
    var v2 = createVector(progress_maro, height*0.65-noise(millis()*0.0005+100)*height*0.25);

    progress_myles +=  step;
    var v3 = createVector(progress_myles, height*0.75-noise(millis()*0.0005+200)*height*0.25);


    pos_gabor.push(v);
    pos_maro.push(v2);
    pos_myles.push(v3);
  }else{
    drawArtist = true;
  }
}

function addElement(str){
  var e = document.createElement('A');
  e.setAttribute('id', str);
  e.style.position = 'absolute';
  document.body.appendChild(e);
  return e;
}
