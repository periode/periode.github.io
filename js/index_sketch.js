var pos = [];
var pos2 = [];
var progress = 0;
var progress2;
var step;
var drawArtist = false;

var artist;
var gabor;
var otodojo;

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  progress2 = width;

  step = width*0.025;

  pos[0] = createVector(progress, height*0.7);
  pos2[0] = createVector(progress2, height*0.7);
  background(0);

  setInterval(addVector, 50);

  var title = addElement('title');
  title.innerHTML = 'define';
  title.setAttribute('href', 'index.html');
}

function draw(){
  background(0);

  for(var i = 0; i < pos.length-1; i++){
    stroke(255);
    line(pos[i].x, pos[i].y, pos[i+1].x, pos[i+1].y);

    for(var j = 0; j < 5; j++){
      stroke(255, (mouseY-j*50-height*0.5));
      fill(255, mouseY-j*100);
      line(pos[i].x, pos[i].y+j*10, pos[i+1].x, pos[i+1].y+j*10);
    }
  }

  for(var i = 0; i < pos2.length-1; i++){
    stroke(255);
    line(pos2[i].x, pos2[i].y, pos2[i+1].x, pos2[i+1].y);

    for(var j = 0; j < 5; j++){
      stroke(255, (mouseY-j*50-height*0.5));
      fill(255, mouseY-j*100);
      line(pos2[i].x, pos2[i].y-j*10*cos(millis()*0.001+i*0.1), pos2[i+1].x, pos2[i+1].y-j*10*cos(millis()*0.001+i*0.1));
    }
  }

  if(drawArtist && gabor == null){
    console.log(gabor);
    gabor = addElement('gabor');
    gabor.innerHTML = 'gabor';
    gabor.setAttribute('href', 'https://soundcloud.com/mesmarecords');
    gabor.style.top = pos[i].y;
    gabor.style.left = pos[i].x+10;
    gabor.style.color = 'white';
    gabor.style.fontFamily = 'Trebuchet MS';
  }

  if(drawArtist && otodojo == null){
    otodojo = addElement('otodojo');
    otodojo.innerHTML = 'otodojo';
    otodojo.setAttribute('href', 'https://soundcloud.com/otodojo');
    otodojo.style.top = pos2[i].y;
    otodojo.style.left = pos2[i].x-10;
    otodojo.style.textAlign = 'right';
    otodojo.style.color = 'white';
    otodojo.style.fontFamily = 'Trebuchet MS';
  }

  noCursor();
  stroke(255);
  ellipse(mouseX, mouseY, 10, 10);
}

function addVector(){
  if(progress < width*0.45){
    progress += step;
    var v = createVector(progress, height*0.7-noise(millis()*0.0025)*height*0.25);

    progress2 -= step;
    var v2 = createVector(progress2, height*0.7-noise(millis()*0.0025+100)*height*0.25);
    pos2.push(v2);
    pos.push(v);
  }else{
    drawArtist = true;
  }
}

function addElement(str){
  var e = document.createElement('A');
  e.setAttribute('id', str);
  e.style.position = 'absolute';
  document.body.appendChild(e);
  console.log(e);
  return e;
}
