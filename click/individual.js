var Individual = function(_rad, _pos, _index){
	this.index = _index;
	//appearance
	this.rad = 4;
	this.spread = 200;
	this.personalspace = _rad;
	this.pop = parseInt(random(7, 13));
	this.red = color(195, 50, 50);
	this.blue = color(50, 50, 195);

	if(Math.random() > 0.5)
		this.accepted = 0;
	else
		this.accepted = 1;

	this.col = lerpColor(this.red, this.blue, this.accepted);
	this.alpha = 0;

	//position and movement
	this.pos = _pos;
	this.velocity = createVector(0.2+Math.random(), 0.2+Math.random());
	this.acceleration = createVector(0, 0);
	this.maxForce = 1;
	this.maxVelocity = 1;
	this.coeffVelocity = 0.1;
	this.wander_angle = 0;
	this.wander_limit = 0.8;
	this.wander_coeff = 0.2;

	this.bounce_coeff = 1.5;
	this.bounce_limit = 5;

	this.seekother_coeff = 0.025;
	this.seekother_limit = 0.45;
	this.seekother_min = this.rad*1.5;

	this.avoidother_coeff = -0.0005;
	this.avoidother_limit = 0.5;

	this.changeradius = height*0.3;
	this.changeratio = 0.0001;

	this.update = function(){
		this.bounce();
		this.wander();
		this.seekOther();
		this.influence();

		this.col = lerpColor(this.red, this.blue, this.accepted);

		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxVelocity);
		this.pos.add(this.velocity);
		this.acceleration.mult(0);

		if(this.alpha < 100)
			this.alpha += 5;
	}

	this.influence = function(){
		for(var i = 0; i < individuals.length; i++){
			var other = individuals[i];
			if(this.pos.dist(other.getPos()) < this.changeradius){
				if(other.getType() < 0.5)
					this.accepted -= this.changeratio;
				else
					this.accepted += this.changeratio;
			}
		}
	}

	this.drawInfluence = function(){
		noFill();

		for(var i = 0; i < 4; i++){
			var c = color(red(this.col), green(this.col), blue(this.col), i*20);
			stroke(c);
			ellipse(this.pos.x, this.pos.y, this.changeradius-i*10, this.changeradius-i*10);
		}
	}

	this.applyForce = function(f){
		this.acceleration.add(f);
	}

	this.display = function(){
		noFill();
		stroke(color(red(this.col), green(this.col), blue(this.col), this.alpha));
		fill(color(red(this.col), green(this.col), blue(this.col), this.alpha));
		strokeWeight(1);

		push();

		translate(this.pos.x, this.pos.y);
		rotate(this.velocity.heading());

		for(var i = 0; i < this.pop; i++){
			var x = noise(millis()*0.0005, this.index+i)*this.spread;
			var y = noise(this.index+i, millis()*0.0005)*this.spread;
			var r = (this.rad+cos(millis()*0.005+i*10));

			ellipse(constrain(x, 0, width), constrain(y, 0, height), r, r);

			if(i < 9 && random(1) > 0.925)
				line(x, y, noise(millis()*0.0005, this.index+i+1)*this.spread, noise(this.index+i+1, millis()*0.0005)*this.spread);
		}

		pop();

	}

	this.bounce = function(){
		var target;

		if(this.pos.x > width)
			target = createVector(this.bounce_coeff, this.velocity.y);

		if(this.pos.x < 0)
			target = createVector(-this.bounce_coeff, this.velocity.y);

		if(this.pos.y > height)
			target = createVector(this.velocity.x, this.bounce_coeff);

		if(this.pos.y < 0)
			target = createVector(this.velocity.x, -this.bounce_coeff);

		if(target != null){
			target.normalize();
			target.mult(this.bounce_coeff);

			var steer = this.velocity.sub(target);
			steer.limit(this.bounce_limit);

			this.applyForce(steer);
		}


		// for(var i = 0; i < individuals.length; i++){
		// 	if(individuals[i] != this){
		// 		var other = individuals[i];
		// 		if(this.pos.dist(other.getPos()) < (this.rad*0.5 + other.getRad()*0.5)){
		// 			this.velocity.mult(-1);
		// 		}
		// 	}
		// }
	}

	this.seek = function(target, limit, coeff){
		var desired = target.sub(this.pos);

		desired.normalize();
		desired.mult(-coeff);

		var steer = this.velocity.sub(desired);
		steer.limit(limit);

		this.applyForce(steer);
	}

	this.wander = function(){
		var wander_radius = height*0.15;
		var wander_distance = height*0.45;
		var change = 0.5;

		//TODO this would work better with a noise function that would be limited to a small cone at the other end of the aim circle?
		this.wander_angle += random(-change, change);

		//we aim at a particular direction
		var wander_aim = this.velocity.copy();
		wander_aim.normalize();
		wander_aim.mult(wander_distance);
		wander_aim.add(this.pos);

		var h = this.velocity.heading();

		wander_edge = createVector(cos(this.wander_angle+h)*wander_radius*0.5, sin(this.wander_angle+h)*wander_radius*0.5);

		var target = wander_aim.add(wander_edge);
		this.seek(target, this.wander_limit, this.wander_coeff);

		// stroke(255, 0, 0, 80);
		// noFill();
		// ellipse(wander_aim.x, wander_aim.y, wander_radius, wander_radius);
		// fill(0, 80);
		// stroke(0, 80);
		// line(this.pos.x, this.pos.y, wander_aim.x, wander_aim.y);
		// ellipse(wander_edge.x+wander_aim.x, wander_edge.y+wander_aim.y, 10, 10);
	}

	this.seekOther = function(){

		var t = this.getClosestSimilar();

		if(t != null && this.pos.dist(t) > this.rad*4)
			this.seek(t, this.seekother_limit, this.seekother_coeff);


		var o = this.getClosestDifferent();

		if(o != null)
			this.seek(o, this.avoidother_limit, this.avoidother_coeff);
	}

	this.getClosestSimilar = function(){
		var min = 10000;
		var closest = 5;
		for(var i = 0; i < individuals.length; i++){
			if(i != this.index){
				if(this.pos.dist(individuals[i].getPos()) < min && abs(this.accepted - individuals[i].getType()) < 0.5){
					min = this.pos.dist(individuals[i].getPos());
					closest = i;
				}else{
					closest = null;
				}
			}
		}

		if(closest != null){
			var p = individuals[closest].getPos().copy();
			return p;
		}else{
			return null;
		}

		// line(this.pos.x, this.pos.y, p.x, p.y);


	}

	this.getClosestDifferent = function(){
		var min = 10000;
		var closest = 5;
		for(var i = 0; i < individuals.length; i++){
			if(i != this.index){
				if(this.pos.dist(individuals[i].getPos()) < min && abs(this.accepted - individuals[i].getType()) > 0.5){
					min = this.pos.dist(individuals[i].getPos());
					closest = i;
				}else{
					closest = null;
				}
			}
		}

		if(closest != null){
			var p = individuals[closest].getPos().copy();
			// line(this.pos.x, this.pos.y, p.x, p.y);
			return p;
		}else{
			return null;
		}
	}

	this.getPos = function(){
		return this.pos;
	}

	this.getRad = function(){
		return this.rad;
	}

	this.getType = function(){
		return this.accepted;
	}
}
