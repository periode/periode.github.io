var population = 1;
var individuals = [];
var squares = [];
var canseek = false;

var roboto;

function preload(){
	// roboto = loadFont("https://fonts.googleapis.com/css?family=Roboto+Mono");
}


function setup(){
	var cnv = createCanvas(windowWidth, windowHeight);
	population = 0;

	//create individuals
	for(var i = 0; i < population; i++){
		var r = 5+Math.random()*20;
		if(i == 0)
			var p = createVector(random(r, width-r), random(r, height-r));
		else
			var p = getStartingPosition();

		individuals[i] = new Individual(r, p, i);
	}

	rows = 20;
	cols = 35;
	xstep = width/cols;
	ystep = height/rows;
	//create squares
	i = 0;
	for(var x = 0; x < width; x += xstep){
		for(var y = 0; y < height; y += ystep){
			squares[i] = new Square(x, y, xstep, ystep);
			i++;
		}
	}

	add_virus();
}

function update_virus(){
	for(var i = 0; i < squares.length; i++){
		squares[i].update();
	}

	for(var i = 0; i < individuals.length; i++){
		individuals[i].update();
	}
}

function draw(){
	background(255);


	update_virus();

	for(var i = 0; i < squares.length; i++){
		squares[i].display();
	}
	for(var i = 0; i < individuals.length; i++){
		individuals[i].display();
	}

	if(p5.Vector.dist(individuals[0].pos, createVector(mouseX, mouseY)) < 100){
		textFont("Roboto Mono");
		fill(0);
		noStroke();
		text('click to add viruses', mouseX, mouseY);
	}
}

function drawBorder(){
	rectMode(CENTER);
	stroke(0);
	noFill();
	for(var i = 0; i < 4; i++){
		rect(width*0.5, height*0.5, width*(0.999-i*0.005), height*(0.999-i*0.008));
	}
}

function getStartingPosition(){
	var r = 50+Math.random()*20;
	var p = createVector(random(r, width-r), random(r, height-r));
	p = createVector(width*0.5, height*0.5);

	var isAlone = true;
	for(var i = 0; i < individuals.length; i++){
		if(p.dist(individuals[i].getPos()) < (r + individuals[i].getRad())*0.55)
			isAlone = false;
	}

	if(isAlone) //if they're colliding
		return p;
	else
		return getStartingPosition();
}

function add_virus(){
	var r = 5+Math.random()*20;
	var p = getStartingPosition();

	individuals.push(new Individual(r, p, population-1));
}

function update_virus_speed(data){
	for(var i = 0; i < individuals.length; i++){
		individuals[i].coeffVelocity = data;
	}
}

function mouseReleased(){
	add_virus();
	return true;
}
