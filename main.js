const canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
redPallete = ["rgb(230, 0, 100)"]
bluePallete = ["rgb(0,0,255)"]

var width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight,
src = {
	x: width / 2,
	y: height / 2
},
reds = [];
blues = [];

window.onresize = function() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	src.x= width / 2;
	src.y= height / 2;
}

class Red {
	constructor() {
		this.x = src.x * 2  +350;
		this.y = (src.y / 2) + src.y + ((Math.random()-0.5)*src.y);
		this.angle = Math.PI + ((Math.random()-0.5)*0.3);
		var speed=1.2 + Math.random()*2.5;
		this.vx = speed* Math.cos(this.angle);
		this.vy = speed* Math.sin(this.angle);
		
		// this.xr = 6 + 10 * Math.random();
		// this.yr = 2 + 10 * Math.random();
		this.r = 85 + 85 * Math.random()
		
		this.color = colorPallete[Math.floor(Math.random() * redPallete.length)];
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		
		// this.xr-= .01;
		// this.yr -= .01;
		// this.r=Math.min(this.yr,this.xr);
		this.r -= .01;
		
	}
}

class Blue {
	constructor() {
		this.x = (src.x * 2) + 350;
		this.y = src.y / 2 + ((Math.random()-0.5)*src.y);
		// this.angle = Math.PI * 2 * Math.random();
		this.angle = Math.PI + (Math.random()-0.5)*0.2;
		var speed=1.2 + Math.random()*3.5;
		this.vx = speed* Math.cos(this.angle);
		this.vy = speed* Math.sin(this.angle);
		
		// this.xr = 6 + 10 * Math.random();
		// this.yr = 2 + 10 * Math.random();
		this.r = 80 + 85 * Math.random()
		
		this.color = bluePallete[Math.floor(Math.random() * bluePallete.length)];
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		
		// this.xr-= .01;
		// this.yr -= .01;
		// this.r=Math.min(this.yr,this.xr);
		this.r -= .01;
		
	}
}

function removeCircles() {
	reds = reds.filter(
		(b) =>
		!(
			b.x + b.r < 0 ||
			b.x - b.r > width+400 ||
			b.y + b.r < 0 ||
			b.y - b.r > height ||
			b.r < 0
		)
	);
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

var bar_height = 0;
function renderCircles() {
	context.clearRect(0, 0, width, height);
	if (Math.random() > 0.97){
		blues.push(new Blue());
	}
	// if (Math.random() > 0.97){
	// 	reds.push(new Red());
	// }
	for (var i = 0; i < reds.length; i++) {
		var r = reds[i];
		context.fillStyle = r.color;
		context.beginPath();
		
		context.arc(r.x, r.y, r.r, 0, Math.PI * 2, false);
		// context.ellipse(b.x, b.y, b.xr, b.yr, b.angle, 0, 2 * Math.PI);
		
		context.fill();
		r.update();
	}
	for (var i = 0; i < blues.length; i++) {
		var b = blues[i];
		context.fillStyle = b.color;
		context.beginPath();
		
		context.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
		// context.ellipse(b.x, b.y, b.xr, b.yr, b.angle, 0, 2 * Math.PI);
		
		context.fill();
		b.update();
	}
	var t_bar_height;
	if (bar_height > 400){
		bar_height = 0;
	}
	if (bar_height > 200){
		t_bar_height = 400 - bar_height;
	} else {
		t_bar_height = bar_height;
	}
	// context.fillStyle= colorPallete[0];
	// context.fillRect(0, src.y*3/2, src.x*2, src.y*2);
	context.fillStyle= bluePallete[0];
	context.fillRect(0, 0, src.x*2, (src.y/2)-50+t_bar_height/2);
	if ((bar_height % 8) == 0){
		let noise=document.getElementById("noise");
		noise.setAttribute("seed",Math.floor(Math.random()*10));
	}
	bar_height++;
	removeCircles();
	requestAnimationFrame(renderCircles);
}

renderCircles();