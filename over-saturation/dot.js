var Dot = function(_pos, _col, _rad, _index){
  this.index = _index;

  this.closeness = [];
  for(var i = 0; i < dots.length; i++){
    this.closeness[i] = false;
  }

  this.position = _pos.copy();
  this.velocity = createVector(0.2+Math.random(), 0.2+Math.random());
	this.acceleration = createVector(0, 0);
	this.maxForce = 1;
	this.maxVelocity = 1;
	this.wander_angle = 0;
	this.wander_limit = 0.8;
	this.wander_coeff = 0.2;

  this.bounce_coeff = 1.5;
  this.bounce_limit = 5;

  this.seek_coeff = 0.5;
  this.seek_limit = 0.3;

  this.max_rad = 20;


  this.col = color(red(_col), blue(_col), green(_col));
  this.rad = _rad;

  //wander
  this.wander;
  this.wander_change = 0.1;

  this.update = function(){
    this.bounce();
    this.wander();
    this.connectOther();

    var growing = false;
    for(var i = 0; i < this.closeness.length; i++){
      if(this.closeness[i])
        growing = true;
    }

    if(growing){
      // this.rad += 1;
      push();
      translate(this.position.x, this.position.y);
      rotate(random(PI));
      stroke(this.col);
      line(-this.rad*2, 0, this.rad*2, 0);
      pop();
    }else{
      // this.rad--;
    }

    //TODO: zooming out based on the number of particles introduced

    this.rad = constrain(this.rad, 1, this.max_rad);


    this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxVelocity);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
  }

  this.wander = function(){
    var wander_radius = height*0.2;
		var wander_distance = height*0.4;
		var change = 0.5;

		//TODO this would work better with a noise function that would be limited to a small cone at the other end of the aim circle?
		this.wander_angle += random(-change, change);

		//we aim at a particular direction
		var wander_aim = this.velocity.copy();
		wander_aim.normalize();
		wander_aim.mult(wander_distance);
		wander_aim.add(this.position);

		var h = this.velocity.heading();

		wander_edge = createVector(cos(this.wander_angle+h)*wander_radius*0.5, sin(this.wander_angle+h)*wander_radius*0.5);

		var target = wander_aim.add(wander_edge);
		this.seek(target, this.wander_limit, this.wander_coeff);
  }

  this.bounce = function(){
    var target;

		if(this.position.x > width-this.rad)
			target = createVector(this.bounce_coeff, this.velocity.y);

		if(this.position.x < this.rad)
			target = createVector(-this.bounce_coeff, this.velocity.y);

		if(this.position.y > height-this.rad)
			target = createVector(this.velocity.x, this.bounce_coeff);

		if(this.position.y < this.rad)
			target = createVector(this.velocity.x, -this.bounce_coeff);

		if(target != null){
			target.normalize();
			target.mult(this.bounce_coeff);

			var steer = this.velocity.sub(target);
			steer.limit(this.bounce_limit);

			this.apply_force(steer);
		}

    for(var i = 0; i < dots.length; i++){
      if(dots[i] != this){
        var other = dots[i];
        if(this.position.dist(other.position) < (this.rad*0.5 + other.rad*0.5)){
          this.velocity.mult(-1);
        }
      }
    }
  }

  this.seek = function(target, limit, coeff){
    var desired = target.sub(this.position);

    desired.normalize();
    desired.mult(coeff);

    var steer = this.velocity.sub(desired);
    steer.limit(limit);

    this.apply_force(steer);
  }

  this.apply_force= function(f){
    this.acceleration.add(f);
  }

  this.display = function(){
    fill(this.col);
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, 2+this.rad, 2+this.rad);
    pop();

    // stroke(red(this.col), blue(this.col), green(this.col), 30);
    // for(var i = 0; i < dots.length; i++){
    //   line(this.position.x, this.position.y, dots[i].position.x, dots[i].position.y);
    // }
  }

  this.connectOther = function(){
    for(var i = 0; i < dots.length; i++){
      if(dots[i] != this){
        if(this.position.dist(dots[i].position) < width*0.1){
          stroke(0);
          // line(this.position.x, this.position.y, dots[i].position.x, dots[i].position.y);
          if(!this.closeness[i]){
            this.closeness[i] = true;
          }
          links.push(new Link(this.position, dots[i].position, this.col, link_index));
          link_index++;
        }else{
          if(this.closeness[i])
            this.closeness[i] = false;
        }
      }
    }
  }
}
