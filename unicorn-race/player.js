class Player {
  constructor(y, img, name) {
    this.y = y;
    this.img = img;
    this.r = 100;
    this.x = this.r / 2;
    this.name = name;
    this.hasWon = false;
  }

  show() {
    // fill(255);
    // ellipse(this.x,this.y,50);
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.r, this.r);
    textSize(64);
    fill(255);
    noStroke();
    text(this.name, this.x + this.r / 2, this.y);
  }

  move(amount) {
    this.x += amount;
  }

  win() {
    if (this.x > width && !this.hasWon) {
      this.hasWon = true;
      celebrate(this.name);
    }
  }
}
