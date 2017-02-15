function Liquid(posx, posy, w, h, c) {
	this.posx = posx;
	this.posy = posy;
	this.w = w;
	this.h = h;
	this.c = 0.5;

	this.render = function() {
		noStroke();
		fill(50, 50, 255);
		rect(this.posx, this.posy, this.w, this.h);
	}
}
