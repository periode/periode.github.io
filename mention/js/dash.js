var Dash = function(_start, _end, _dir){
  this.start = _start.copy();
  this.current = _start.copy();
  this.end = _end.copy();
  this.dir = _dir;
  this.added = false;

  this.val = 0;
  this.inc = 0.05;

  // this.display = function(){
  //   strokeWeight(1);
  //   stroke(0);
  //   line(this.start.x, this.start.y, this.current.x, this.current.y);
  //
  //   if(this.val < 1)
  //     this.val += this.inc;
  //   else{
  //     if(!this.added){
  //       if(this.dir == 'up' || this.dir == 'down'){
  //         addNewDash(this.end.copy(), 'side');
  //       }else if(this.dir == 'side'){
  //         addNewDash(this.end.copy(), 'up');
  //       }
  //
  //       this.added = true;
  //     }
  //   }
  //
  //   this.current = p5.Vector.lerp(this.start, this.end, this.val);
  // }
}

Dash.prototype.display = function(){
  strokeWeight(1);
  stroke(0);
  line(this.start.x, this.start.y, this.current.x, this.current.y);

  if(this.val < 1)
    this.val += this.inc;
  else{
    if(!this.added){
      if(this.dir == 'up' || this.dir == 'down'){
        addNewDash(this.end.copy(), 'side');
      }else if(this.dir == 'side'){
        addNewDash(this.end.copy(), 'up');
      }

      this.added = true;
    }
  }

  this.current = p5.Vector.lerp(this.start, this.end, this.val);
}
