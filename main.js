//all js code just draw circles ,svg filter is important code

const canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  colorPallete =
      // ["#00f", "#00a", "#00b", "#00c", "#00d", "#00e"];
      ["rgb(250, 0, 110)", "rgb(200, 0, 50)"]
// ["#f00","#a00","#b00","#c00","#d00","#e00"];
// ["white","#888","yellow","orange","darkorange","darkmagenta","darkgreen","khaki"];
  bluePallete = ["rgb(0,0,255)", "rgb(0,0,220)"]

var width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight,
  src = {
    x: width / 2,
    y: height / 2
  },
  circles = [];
  blues = [];

window.onresize = function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  src.x= width / 2;
  src.y= height / 2;
}

class Circle {
  constructor() {
    this.x = src.x * 2;
    this.y = (src.y / 2) + src.y;
    this.angle = Math.PI * 2 * Math.random();
    var speed=1 + Math.random();
    this.vx = speed* Math.cos(this.angle);
    this.vy = speed* Math.sin(this.angle);

    // this.xr = 6 + 10 * Math.random();
    // this.yr = 2 + 10 * Math.random();
    this.r = 35 + 25 * Math.random()

    this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
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
    this.x = (src.x * 2);
    this.y = src.y / 2;
    // this.angle = Math.PI * 2 * Math.random();
    this.angle = Math.PI;
    var speed=1 + Math.random();
    this.vx = speed* Math.cos(this.angle);
    this.vy = speed* Math.sin(this.angle);

    // this.xr = 6 + 10 * Math.random();
    // this.yr = 2 + 10 * Math.random();
    this.r = 35 + 25 * Math.random()

    this.color = bluePallete[Math.floor(Math.random() * colorPallete.length)];
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
 circles = circles.filter(
    (b) =>
      !(
        b.x + b.r < 0 ||
        b.x - b.r > width ||
        b.y + b.r < 0 ||
        b.y - b.r > height ||
        b.r < 0
      )
  );
  blues = blues.filter(
     (b) =>
       !(
         b.x + b.r < 0 ||
         b.x - b.r > width ||
         b.y + b.r < 0 ||
         b.y - b.r > height ||
         b.r < 0
       )
   );
}

function renderCircles() {
  context.clearRect(0, 0, width, height);

  if (Math.random() > .2)
    circles.push(new Circle());
    blues.push(new Blue());

  for (var i = 0; i < circles.length; i++) {
    var b = circles[i];
    context.fillStyle = b.color;
    context.beginPath();

    context.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
    // context.ellipse(b.x, b.y, b.xr, b.yr, b.angle, 0, 2 * Math.PI);

    context.fill();
    b.update();
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

  removeCircles();
  requestAnimationFrame(renderCircles);
}

renderCircles();

// https://codepen.io/mnmxmx/pen/VjjvEq
