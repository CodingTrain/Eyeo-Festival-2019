class Player {
  constructor(y) {
    this.x = 0;
    this.y = y;
  }

  move() {
    this.x += 50;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 50);
  }

  win() {
    return this.x > width;
  }
}
const players = [];

function setup() {
  createCanvas(600, 500);
  players[0] = new Player(150);
  players[1] = new Player(250);
  players[2] = new Player(350);
  players[3] = new Player(450);
}

function keyPressed() {
  if (key == '1') {
    players[0].move();
  } else if (key == '2') {
    players[1].move();
  } else if (key == '3') {
    players[2].move();
  } else if (key == '4') {
    players[2].move();
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
