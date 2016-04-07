var Link = function(_pos1, _pos2, _col, _i){
  this.pos1 = _pos1.copy();
  this.pos2 = _pos2.copy();
  this.col = color(red(_col), blue(_col), green(_col));
  this.index = _i;
  this.alpha = 30;

  this.display = function(){

    // stroke(red(this.col), blue(this.col), green(this.col), this.alpha);
    stroke(255, this.alpha);
    line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

    this.alpha -= 2;
    if(this.alpha < 0)
      links.splice(this.index, 1);
  }
}
