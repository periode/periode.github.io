var Splash = function(_pos, _col, _index){
  this.index = _index;
  this.position = _pos;
  this.col = _col;
  this.rad = 0;
  this.alpha = 100;

  this.display = function(){

    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(red(this.col), green(this.col), blue(this.col), this.alpha*0.25);
    ellipse(0, 0, this.rad*0.9, this.rad*0.9);

    stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
    noFill();
    for(var i = 0; i < 100; i++){
      ellipse(sin(this.rad*0.01+i)*this.rad*0.5, cos(this.rad*0.01+i)*this.rad*0.5, 1, 1);
    }
    pop();


    this.rad+=2;
    this.alpha-= 0.5;

    if(this.alpha < 0)
      splashes.splice(0, 1);
  }
}
