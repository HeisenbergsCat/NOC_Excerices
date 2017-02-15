function Pointer(pointer_rad) {
  this.position = createVector(mouseX, mouseY);
  this.radius = pointer_rad;

  this.update = function() {
    this.position.x = mouseX;
    this.position.y = mouseY;
  }

  this.render = function() {
    stroke(0,255,255);
    noFill();
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.radius);
    point(this.position.x, this.position.y);
  }
}
