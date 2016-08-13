var Square = function(_x, _y, _w, _h){
	this.pos = createVector(_x, _y);
	this.width = _w;
	this.height = _h;
	this.red = color(195, 50, 50);
	this.blue = color(50, 50, 195);
	this.colval = 0.5;
	this.colinc = 0.1;
	this.col = lerpColor(this.red, this.blue, this.colval);

	this.fillalpha = 10;
	this.strokealpha = 10;

	this.update = function(){
		// this.strokealpha = 10;
		for(var i = 0; i < individuals.length; i++){
			var o = individuals[i];
			var p = individuals[i].getPos();
			if(p.x > this.pos.x && p.x < this.pos.x + this.width && p.y > this.pos.y && p.y < this.pos.y + this.height){
				// this.strokealpha += 3;

				if(o.getType() > 0.5 && this.colval < 1)
					this.colval += this.colinc;
				if(o.getType() < 0.5 && this.colval > 0)
					this.colval -= this.colinc;

				if(this.fillalpha < 255)
				this.fillalpha += 3;
			}else{
				if(this.strokealpha > 10)
					this.strokealpha -= 0.025;

				if(this.fillalpha > 10)
					this.fillalpha -= 0.01;
			}
		}

		this.col = lerpColor(this.red, this.blue, this.colval);
	}

	this.display = function(){
		rectMode(CORNER);
		stroke(0, this.strokealpha);
		var c = color(red(this.col), green(this.col), blue(this.col), this.fillalpha);
		fill(c);
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}