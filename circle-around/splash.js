var Splash = function(_pos, _col, _index){
  this.index = _index;
  this.position = _pos;
  this.col = _col;
  this.rad = 0;
  this.alpha = 140;
  this.inner_rad_coeff = random(0.5, 0.85);
  this.ray_num = parseInt(random(30, 60));
}

Splash.prototype.display = function(){

  push();
  translate(this.position.x, this.position.y);
  noStroke();
  fill(red(this.col), green(this.col), blue(this.col), this.alpha*1);


  stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
  noFill();
  for(var i = 0; i < TWO_PI; i+=TWO_PI/this.ray_num){
    ellipse(sin(this.rad*0.01+i)*this.rad*0.5, cos(this.rad*0.01+i)*this.rad*0.5, 1, 1);
    line(0, 0, sin(this.rad*0.01+i)*this.rad*0.5*this.inner_rad_coeff, cos(this.rad*0.01+i)*this.rad*0.5*this.inner_rad_coeff);
  }
  pop();


  this.rad+=4;
  this.alpha-= 1.0;

  if(this.alpha < 0)
    splashes.splice(0, 1);
}
