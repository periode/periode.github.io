var Dash = function(_start, _end){
  this.start = _start.copy();
  this.end = _end.copy();

  this.display = function(){
    strokeWeight(2);
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}
