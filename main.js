const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const redPallete = ["rgb(230, 0, 100)"];
const bluePallete = ["rgb(0,0,255)"];
const noiseNames = ["noise1.png","noise2.png","noise3.png","noise4.png"];
var noiseIndex = 0;


var width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight,
src = {
	x: width / 2,
	y: height / 2
},
blues = [];
var bar_height = 0;

// Handle resize
window.onresize = function() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	src.x= width / 2;
	src.y= height / 2;
}

// Blue circle class, initialised to random values
class Blue {
	constructor() {
		this.x = (src.x * 2) + 350;
		this.y = src.y / 2 + ((Math.random()-0.5)*src.y);
		this.angle = Math.PI + (Math.random()-0.5)*0.2;
		var speed=2.8 + Math.random()*6.5;
		this.vx = speed* Math.cos(this.angle);
		this.vy = speed* Math.sin(this.angle);
		this.r = 80 + 85 * Math.random()
		this.color = bluePallete[Math.floor(Math.random() * bluePallete.length)];
	}
	// Update position
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.r -= .01;
	}
}

// Remove circles outside of screen (plus extra on right side to allow new circles
function removeCircles() {
	blues = blues.filter(
		(b) =>
		!(
			b.x + b.r < 0 ||
			b.x - b.r > width+400 ||
			b.y + b.r < 0 ||
			b.y - b.r > height ||
			b.r < 0
		)
	);
}

// Draw the circles
function renderCircles() {
	// Clear screen
	context.clearRect(0, 0, width, height);
	// Randomly decide whether to push new
	if (Math.random() > 0.94){
		blues.push(new Blue());
	}
	// Draw the circles
	for (var i = 0; i < blues.length; i++) {
		var b = blues[i];
		context.fillStyle = b.color;
		context.beginPath();
		context.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);		
		context.fill();
		b.update();
	}
	// Draw a bar of blue at the top
	var t_bar_height;
	if (bar_height > 400){
		bar_height = 0;
	}
	if (bar_height > 200){
		t_bar_height = 400 - bar_height;
	} else {
		t_bar_height = bar_height;
	}
	context.fillStyle= bluePallete[0];
	context.fillRect(0, 0, src.x*2, (src.y/2)-50+t_bar_height/2);
	if ((bar_height % 8) == 0){
		let oldNoise = document.getElementById("noise"+(noiseIndex+1));
		noiseIndex = (noiseIndex + 1) % noiseNames.length;
		let newNoise = document.getElementById("noise"+(noiseIndex+1));
		newNoise.style.setProperty("display", "block");
		oldNoise.style.setProperty("display", "none");
	}
	bar_height++;
	removeCircles();
	requestAnimationFrame(renderCircles);
}

// Initialise
function init(){
	const initNumber = 15;
	var minX = 50;
	var maxX = width;
	for (var i = 0; i < initNumber; i++){
		var b = new Blue();
		b.x = minX + (Math.random() * (maxX - minX));
		blues.push(b); 
	}
	renderCircles();
}

document.onload = init();