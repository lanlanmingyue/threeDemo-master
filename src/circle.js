var BACKGROUND_COLOR='black';
class Panel {
	constructor(id) {
	  var target=document.getElementById(id);
	  this.width=target.width;
	  this.height=target.height;
	  this.ctx = target.getContext('2d'); 
    this.img  = this.ctx.getImageData(0, 0, this.width, this.height);
	}
	draw(x, y, r, g, b, a) {
    var index = (Math.round(x) + Math.round(y) * this.width) * 4;
    this.img.data[index + 0] = r;
    this.img.data[index + 1] = g;
    this.img.data[index + 2] = b;
    this.img.data[index + 3] = a;
  }
  clear() {
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  flush() {
    this.clear();
    this.ctx.putImageData(this.img, 0, 0);
  }
}
//设置颜色函数
class Color{
	constructor(r,g,b) {
	  this.r=r;
	  this.g=g;
	  this.b=b;
	}
}
//设置圆点
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


var panel = new Panel('canvas');
panel.flush();
panel.draw(200,200);