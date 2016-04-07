var Splash = function(_pos, _col, _index){
  this.index = _index;
  this.position = _pos;
  this.col = _col;
  this.rad = width*0.1;
  this.sc = 0;
  this.alpha = 250;

  this.sides = parseInt(random(10, 25));
  this.offset = [];
  this.max_offset = [];
  for(var i = 0; i < this.sides; i++){
    this.offset[i] = 0;
    this.max_offset[i] = random(1, 3);
  }
  this.inc = 360/this.sides;

  this.display = function(){

    push();
    translate(this.position.x, this.position.y);
    scale(this.sc);
    noFill();
    noStroke();
    // stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
    fill(red(this.col), green(this.col), blue(this.col), this.alpha);

    // ellipse(0, 0, this.rad*0.9, this.rad*0.9);
    for(var j = 0; j < 1; j += 0.25){
    beginShape();
    for(var i = 0; i <= this.sides; i++){
      curveVertex(cos(radians(i*this.inc))*this.rad*0.5*this.offset[i]*j, sin(radians(i*this.inc))*this.rad*0.5*this.offset[i]*j);
      if(this.offset[i] < this.max_offset[i])
        this.offset[i] += 0.03;
    }
    curveVertex(cos(radians(this.inc))*this.rad*0.5*this.offset[1]*j, sin(radians(this.inc))*this.rad*0.5*this.offset[1]*j);
    endShape(CLOSE);
  }

    // stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
    // noFill();
    // for(var i = 0; i < 100; i++){
    //   ellipse(sin(this.rad*0.01+i)*this.rad*0.5, cos(this.rad*0.01+i)*this.rad*0.5, 1, 1);
    // }
    pop();



    if(this.alpha > 50){
      this.sc+=0.015;
      this.alpha-= 2;
    }else{
      this.alpha -= 0.01;
    }


    if(this.alpha < 0)
      splashes.splice(0, 1);
  }
}
