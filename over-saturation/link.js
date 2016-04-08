var Link = function(_pos1, _pos2, _col, _i){
  this.pos1_max = _pos1.copy();
  this.pos2_max = _pos2.copy();
  this.pos = createVector((this.pos1_max.x+this.pos2_max.x)*0.5, (this.pos1_max.y+this.pos2_max.y)*0.5);
  this.pos1 = this.pos.copy();
  this.pos2 = this.pos.copy();
  this.val = 0;
  this.inc = 0.1;
  this.col = color(red(_col), blue(_col), green(_col));
  this.index = _i;
  this.alpha = 30;

  this.display = function(){
    stroke(red(this.col), blue(this.col), green(this.col), this.alpha);
    line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

    this.alpha -= 0.05;
    if(this.alpha < 0)
      links.splice(this.index, 1);

    if(this.val < 1){
      this.val += this.inc;

      this.pos1 = p5.Vector.lerp(this.pos, this.pos1_max, this.val);
      this.pos2 = p5.Vector.lerp(this.pos, this.pos2_max, this.val);
    }
  }
}
