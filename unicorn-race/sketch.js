let bkg;
let players = [];
let images = [];

function preload() {
  bkg = loadImage('data/sky_small.png');
  for (let i = 0; i < 4; i++) {
    images[i] = loadImage(`data/player${i}.png`);
  }
}

let video;

function setup() {
  createCanvas(899, 500);
  video = createCapture(VIDEO);
  listen();
  players[0] = new Player(100, images[0], 'YG');
  players[1] = new Player(200, images[1], 'YINING');
  players[2] = new Player(300, images[2], 'JENNA');
  players[3] = new Player(400, images[3], 'audience');
  startml5();
}
function draw() {
  background(0);
  imageMode(CORNER);
  image(bkg, 0, 0);

  for (let p of players) {
    p.show();
    p.win();
  }
}

function keyPressed() {
  if (key == '1') {
    players[0].move();
  }
}
