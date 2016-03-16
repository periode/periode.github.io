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
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);

  step = width*0.025;
  middle_line_top = height;
  middle_line_top = height*0.3;

  starting_point = height*0.8;

  menu_audio = document.getElementById('audio');
  menu_video = document.getElementById('video');
  menu_info = document.getElementById('info');
  document.getElementById('title').style.top = height*0.05;

  menu_audio.style.display = 'none';
  menu_video.style.display = 'none';
  menu_info.style.display = 'none';
}

function draw(){
  background(bg_col);

  drawInitialSketch();

//TODO: do the sketch for the home page
// TODO: remove letters from MENTION
// TODO: add other fontface
// TODO: switch menu class so that they fade in
// TODO: define center canvas

//
//   for(var i = 0; i < pos_gabor.length-1; i++){
//     stroke(fg_col);
//     strokeWeight(2);
//     if(i < pos_gabor.length-2){
//       line(pos_gabor[i].x, pos_gabor[i].y, pos_gabor[i+1].x, pos_gabor[i+1].y);
//     }else{
//       var pos_temp = p5.Vector.lerp(pos_gabor[i], pos_gabor[i+1], lerp_gabor);
//       line(pos_gabor[i].x, pos_gabor[i].y, pos_temp.x, pos_temp.y);
//     }
//
//   if(i > 0){
//     for(var j = 0; j < 5; j++){
//       strokeWeight(1);
//       stroke(fg_col, (mouseY-j*50-height*0.3));
//       fill(fg_col, mouseY-j*100);
//       line(pos_gabor[i-1].x, pos_gabor[i-1].y-j*05*constrain(sin(millis()*0.001+i*0.1), -10, 10), pos_gabor[i].x, pos_gabor[i].y-j*10*cos(millis()*0.001+i*0.1+1));
//     }
//   }
//
//   }
//
//   for(var i = 0; i < pos_maro.length-1; i++){
//     stroke(fg_col);
//     strokeWeight(2);
//     if(i < pos_maro.length-2){
//       line(pos_maro[i].x, pos_maro[i].y, pos_maro[i+1].x, pos_maro[i+1].y);
//     }else{
//       var pos_temp = p5.Vector.lerp(pos_maro[i], pos_maro[i+1], lerp_gabor);
//       line(pos_maro[i].x, pos_maro[i].y, pos_temp.x, pos_temp.y);
//     }
//
//     if(i > 0){
//       for(var j = 0; j < 5; j++){
//         strokeWeight(1);
//         stroke(fg_col, (mouseY-j*50-height*0.3));
//         fill(fg_col, mouseY-j*100);
//         line(pos_maro[i].x, pos_maro[i].y-j*05*min(sin(millis()*0.001+i*0.1+1), 10), pos_maro[i+1].x, pos_maro[i+1].y-j*10*cos(millis()*0.001+i*0.1));
//       }
//     }
//   }
//
//   for(var i = 0; i < pos_myles.length-1; i++){
//     stroke(fg_col);
//     strokeWeight(2);
//     if(i < pos_myles.length-2){
//       line(pos_myles[i].x, pos_myles[i].y, pos_myles[i+1].x, pos_myles[i+1].y);
//     }else{
//       var pos_temp = p5.Vector.lerp(pos_myles[i], pos_myles[i+1], lerp_gabor);
//       line(pos_myles[i].x, pos_myles[i].y, pos_temp.x, pos_temp.y);
//     }
//
//   if(i > 0){
//     for(var j = 0; j < 5; j++){
//       strokeWeight(1);
//       stroke(fg_col, (mouseY-j*50-height*0.3));
//       fill(fg_col, mouseY-j*100);
//       line(pos_myles[i].x, pos_myles[i].y-j*05*min(sin(millis()*0.001+i*0.1+2), 10), pos_myles[i+1].x, pos_myles[i+1].y-j*4*cos(millis()*0.001+i*0.1));
//     }
//   }
//
//   }
// drawMiddleLine();
//
//
//   if(drawArtist){
//
//     drawPeriode();
//
//     if(gabor == null){
//       gabor = addElement('gabor');
//       gabor.innerHTML = 'gabor';
//       gabor.setAttribute('href', 'https://soundcloud.com/mesmarecords');
//       gabor.setAttribute('id', 'artist');
//       gabor.style.top = pos_gabor[i].y;
//       gabor.style.left = pos_gabor[i].x+15;
//     }
//
//     if(otodojo == null){
//       otodojo = addElement('otodojo');
//       otodojo.innerHTML = 'otodojo';
//       otodojo.setAttribute('href', 'https://soundcloud.com/otodojo');
//       otodojo.setAttribute('id', 'artist');
//       otodojo.style.top = pos_maro[i].y;
//       otodojo.style.left = pos_maro[i].x+15;
//       otodojo.style.textAlign = 'right';
//     }
//
//     if(myles == null){
//       myles = addElement('myles');
//       myles.innerHTML = 'myles avery';
//       myles.setAttribute('href', 'https://soundcloud.com/mylesavery');
//       myles.setAttribute('id', 'artist');
//       myles.style.top = pos_myles[i].y;
//       myles.style.left = pos_myles[i].x+15;
//       myles.style.textAlign = 'right';
//     }
//   }
//
//   if(addingVector){
//     if(lerp_gabor < 1)
//       lerp_gabor += lerp_inc;
//     else
//       addVector();
//   }


  // noCursor();
  // noFill();
  // stroke(0);
  // ellipse(mouseX, mouseY, 10, 10);
}

function drawInitialSketch(){
  fill(255);
  stroke(0);
  rect(width*0.2, height*0.05, width*0.3, height*0.15);
}

function displayMenu(){
  menu_audio.style.display = 'inline';
  menu_video.style.display = 'inline';
  menu_info.style.display = 'inline';
}

function drawDashes(){

  if(millis() - dash_start_time > dash_timer){
    if(dash_start.x < width*0.9){
      dash_start.x += width*0.015;
      dash_end.x += width*0.015;

      var d = new Dash(dash_start, dash_end);
      if(Math.random() > 0.3)
        dashes.push(d);
    }else{
      dashes = [];
      dash_start =  createVector(width*0.15, parseInt(document.defaultView.getComputedStyle(title, "").getPropertyValue("height").substring(0, 2))+2);
      dash_end = createVector(width*0.165, parseInt(document.defaultView.getComputedStyle(title, "").getPropertyValue("height").substring(0, 2))+2);
    }

    dash_start_time = millis();
  }

  for(var i = 0; i < dashes.length; i++){
    dashes[i].display();
  }
}

function drawMiddleLine(){
  strokeWeight(1);
  stroke(0);
  for(var i = -1; i < 2; i++){
    line(width*0.5+i*5, height, width*0.5+i*2, middle_line_top);
  }

  if(middle_line_top > height*0.3)
    middle_line_top-= 20;

}

function drawPeriode(){
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  for(var i = 0; i < periode.length; i++){
    fill(fg_col, 255*periode_alpha[i]);
    noStroke();
    periode_position[i] = createVector(width*0.75+i*10, starting_point*0.8+cos(millis()*0.001+map(i, 0, periode.length, 0, PI))*height*0.15);
    text(periode[i], periode_position[i].x, periode_position[i].y);
    stroke(fg_col, (mouseY-i*30-height*0.1)*periode_alpha[i]);
    noFill();
    line(width*0.75+i*10, height, width*0.75+i*10, starting_point*0.8+cos(millis()*0.001+map(i, 0, periode.length, 0, PI))*height*0.15)
  }

  if(periode_alpha[current_alpha] < 1){
    periode_alpha[current_alpha]+=0.15;
  }else{
    if(current_alpha < periode_alpha.length)
      current_alpha++;
  }

  var highest = height;
  var lowest = 0;
  for(var i = 0; i < periode_position.length; i++){
    if(periode_position[i].y < highest){
      highest = periode_position[i].y;
    }

    if(periode_position[i].y > lowest){
      lowest = periode_position[i].y;
    }
  }

console.log('low',lowest);
console.log('high',highest);
  if(mouseX > periode_position[0].x && mouseX < periode_position[periode.length-1].x){
    if(mouseY < lowest && mouseY > highest){
      line(periode_position[0].x, highest, periode_position[periode.length-1].x, lowest);
      line(periode_position[0].x, lowest, periode_position[periode.length-1].x, highest);
    }

  }
}

function handlePeriodeClick(){
  var highest = height;
  var lowest = 0;
  for(var i = 0; i < periode_position.length; i++){
    if(periode_position[i].y < highest){
      highest = periode_position[i].y;
    }

    if(periode_position[i].y > lowest){
      lowest = periode_position[i].y;
    }
  }

  if(mouseX > periode_position[0].x && mouseX < periode_position[periode.length-1].x){
    if(mouseY > highest && mouseY < lowest)
      window.open('https://vimeo.com/pierredepaz');
  }
}

function addVector(){
  if(progress_gabor < width*0.3){
    progress_gabor += step;
    var v = createVector(progress_gabor, (starting_point*0.9)-noise(millis()*0.0005)*height*0.25);
    lerp_gabor = 0;

    progress_maro += step;
    var v2 = createVector(progress_maro, (starting_point*1.0)-noise(millis()*0.0005+100)*height*0.25);

    progress_myles +=  step;
    var v3 = createVector(progress_myles, (starting_point*1.1)-noise(millis()*0.0005+200)*height*0.25);


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

function touchStarted(){
  if(drawArtist)
    handlePeriodeClick();


  return false;
}
