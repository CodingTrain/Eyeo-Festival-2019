let bkg;
let players = [];
let images = [];
let imageClassifier;
let soundClassifier;
let video;

function preload() {
  bkg = loadImage('data/sky_small.png');
  for (let i = 0; i < 4; i++) {
    images[i] = loadImage(`data/player${i}.png`);
  }
  video = createCapture(VIDEO);
  video.size(200, 200);
  const imageModel = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/eyeo-trio/model.json';
  const soundModel = 'https://storage.googleapis.com/tm-speech-commands/eyeo-audience/model.json';
  imageClassifier = ml5.imageClassifier(imageModel);
  soundClassifier = ml5.soundClassifier(soundModel);
}

function setup() {
  let canvas = createCanvas(899, 500);
  imageClassifier.classify(video, gotImageResults);
  soundClassifier.classify(gotSoundResults);
  players[0] = new Player(100, images[0], 'player 1');
  players[1] = new Player(200, images[1], 'player 2');
  players[2] = new Player(300, images[2], 'player 3');
  players[3] = new Player(400, images[3], 'player 4');
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

function gotImageResults(error, results) {
  if (results) {
    const label = results[0].label;
    players[label].move(5);
  }
  imageClassifier.classify(video, gotImageResults);
}

function gotSoundResults(err, results) {
  if (results) {
    if (results[0].label == 'audience') {
      players[3].move(100);
    }
  }
}

function keyPressed() {
  if (key == '1') {
    players[0].move();
  }
}
