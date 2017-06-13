const BACKGROUND_COLOR = 'black';
const PERIOD = 30;

const DEFAULT_ALPHA_BASE = 200;
const DEFAULT_ALPHA_DEVIATION = 100;
const DEFAULT_ALPHA_SMOOTH_X = 100;
const DEFAULT_ALPHA_SMOOTH_Y = 100;
const DEFAULT_ALPHA_SMOOTH_T = 800;

class Panel {

  constructor(id) {
    let element = document.getElementById(id);
    this.width = element.width;
    this.height = element.height;
    this.ctx = element.getContext('2d');
    this.img  = this.ctx.getImageData(0, 0, this.width, this.height);
  }

  draw(x, y, r, g, b, a) {
    let index = (Math.round(x) + Math.round(y) * this.width) * 4;//这是个啥
    this.img.data[index + 0] = r;
    this.img.data[index + 1] = g;
    this.img.data[index + 2] = b;
    this.img.data[index + 3] = a;
  }

  // rdraw(radius, angle, r, g, b, a) {
  //   let x = radius * Math.cos(angle);
  //   let y = radius * Math.sin(angle);
  //   this.draw(x, y, r, g, b, a);
  // }

  clear() {
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  flush() {
    this.clear();
    this.ctx.putImageData(this.img, 0, 0);
  }

}


class Color {

  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

}

class Point {

  constructor(x, y, x0, y0, r, a, z) {
    this.x = x;
    this.y = y;
    this.x0 = x0;
    this.y0 = y0;
    this.r = r;
    this.a = a;
    this.z = z; 
  }

}

class Ring {

  constructor(x, y, radius, width, options = {}) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.w = width;

    this.alphaBase = options.alphaBase || DEFAULT_ALPHA_BASE;
    this.alphaDeviation = options.alphaDeviation || DEFAULT_ALPHA_DEVIATION;
    this.alphaSmoothX = options.alphaSmoothX || DEFAULT_ALPHA_SMOOTH_X;
    this.alphaSmoothY = options.alphaSmoothY || DEFAULT_ALPHA_SMOOTH_Y;
    this.alphaSmoothT = options.alphaSmoothT || DEFAULT_ALPHA_SMOOTH_T;
    
    this.p = [];
    this.init();
  }

  setColor(color) {
    this.color = color;
  }

  getAlpha(p) {
    return p.z * this.alphaBase + this.alphaDeviation * noise.perlin3(
      p.x / this.alphaSmoothX,
      p.y / this.alphaSmoothY,
      Date.now() / this.alphaSmoothT
    );
  }

  getGreen() {
    return 255 * (0.5 + noise.perlin3(this.x, this.y, Date.now() / 2000));  
  }

  getBlue() {
    return 170 * (0.8 + noise.perlin3(this.x, this.y, Date.now() / 2000));  
  }

  getRed() {
    return 255 * (0.9 + noise.perlin3(this.x, this.y, Date.now() / 2000));  
  }

  isInside(x, y) {
    let d = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y);
    let r1 = (this.r - this.w);
    let r2 = (this.r + this.w);
    return (d >= r1 * r1) && (d <= r2 * r2);
  }

  init() {

    let x0 = this.x;
    let y0 = this.y;
    let r0 = this.r + this.w;
    let i, j, x, y, r, a, z;

    for (i = 0; i <= 2 * r0; i++) {
      for (j = 0; j <= 2 * r0; j++) {
        x = x0 - this.r - this.w + i;
        y = y0 - this.r - this.w + j;
        if (this.isInside(x, y)) {
          r = Math.sqrt((x0 - x) * (x0 - x) + (y0 - y) * (y0 - y));
          a = (Math.atan2(y, x) + 2 * Math.PI) % (2 * Math.PI);
          z = 1 - Math.abs(r - this.r) / this.w;
          this.p.push(new Point(x, y, this.r * Math.cos(a), this.r * Math.sin(a), r, a, z));  
        }
      }
    }

  }

  draw(panel) {

    
    let p, x, y, c, d;
    let r = this.getRed();
    let g = this.getGreen();
    let b = this.getBlue();
    for (let i = 0; i < this.p.length; i++) {
      p = this.p[i]; 
      d = 30 * (noise.perlin3(p.x0 / 120, p.y0 / 120, Date.now() / 10000) + 0.5);
      x = p.x - Math.cos(p.a) * d;
      y = p.y - Math.sin(p.a) * d;
      c = this.color();
      panel.draw(p.x, p.y, c.r, c.g, c.b, this.getAlpha(p));
    }
    panel.flush();

  }

}


noise.seed(Math.random());

let panel = new Panel('canvas');

let ring1 = new Ring(400, 150, 60, 15, {
  alphaSmoothX: 80,
  alphaSmoothY: 80,
  alphaSmoothT: 600,
  alphaDeviation: 100
});

let ring2 = new Ring(400, 350, 100, 20, {
  alphaSmoothX: 100,
  alphaSmoothY: 100,
  alphaDeviation: 80,
  alphaSmoothT: 700
});

ring1.setColor(() => {
  return new Color(0, 255, 0);
});

ring2.setColor(() => {
  return new Color(0, 255, 0);
});

setInterval(() => {
  ring1.draw(panel);
  ring2.draw(panel);
}, 30);

// let ring1 = new Ring(400, 300, 130, 20, {
//   alphaBase: 200,
//   alphaSmoothX: 120,
//   alphaSmoothY: 120,
//   alphaSmoothT: 900,
//   alphaDeviation: 120
// });


// ring1.setColor(() => {
//   return new Color(0, 255, 0);
// });


// setInterval(() => {
//   ring1.draw(panel);
// }, 30);


