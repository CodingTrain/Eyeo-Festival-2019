class Player {
  constructor(y, img) {
    this.x = 0;
    this.y = y;
    this.img = img;
    this.r = 90;
  }

  move() {
    this.x += this.r / 4;
  }

  show() {
    // fill(255);
    // ellipse(this.x, this.y, this.r);
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.r, this.r);
  }

  win() {
    return this.x > width;
  }
}
const players = [];
const images = [];

function preload() {
  for (let i = 0; i < 4; i++) {
    images[i] = loadImage(`data/player${i}.png`);
  }
}

function setup() {
  createCanvas(600, 500);
  players[0] = new Player(150, images[0]);
  players[1] = new Player(250, images[1]);
  players[2] = new Player(350, images[2]);
  players[3] = new Player(450, images[3]);
}

function keyPressed() {
  if (key == '1') {
    players[0].move();
  } else if (key == '2') {
    players[1].move();
  } else if (key == '3') {
    players[2].move();
  } else if (key == '4') {
    players[3].move();
  }
}

function draw() {
  background(0);
  for (let p of players) {
    p.show();
    if (p.win()) {
      console.log('WIN');
    }
  }
}
