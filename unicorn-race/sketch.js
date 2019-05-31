async function listen() {
  // more documentation available at
  // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
  const modelJson = 'https://storage.googleapis.com/tm-speech-commands/eyeo-audience/model.json';
  const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/eyeo-audience/metadata.json';

  const recognizer = speechCommands.create('BROWSER_FFT', undefined, modelJson, metadataJson);

  await recognizer.ensureModelLoaded();
  console.log(recognizer.wordLabels());

  recognizer.listen(
    result => {
      console.log(result.scores[2]);
      if (result.scores[2] > 0.02) {
        players[3].move(100);
      }
    },
    {
      includeSpectrogram: true,
      probabilityThreshold: 0.4,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.5 // probably want between 0.5 and 0.75. More info in README
    }
  );
}

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
    //fill(255);
    //ellipse(this.x,this.y,50);
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
      const vector = [];
      for (let i = 0; i < 512; i++) {
        vector[i] = random(-1, 1);
      }

      const inputs = {
        z: vector,
        truncation: 0.5
      };

      console.log(`${this.name} has won!`);

      httpPost('http://localhost:8000/query', 'json', inputs, response => {
        console.log(response);
        let img = createImg(response.image);
        img.size(128, 128);

        const tweet = {
          image64: response.image,
          status: `${this.name} has won! #eyeotest`
        };

        httpPost('http://localhost:3001/tweet', 'json', tweet, response => {
          console.log(response);
        });
      });
    }
  }
}

let bkg;
let players = [];
let images = [];

const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/eyeo-trio/model.json';

function preload() {
  bkg = loadImage('data/sky_small.png');
  for (let i = 0; i < 4; i++) {
    images[i] = loadImage(`data/player${i}.png`);
  }
}

let classifier;
let video;

function setup() {
  createCanvas(899, 500);
  video = createCapture(VIDEO);
  listen();
  players[0] = new Player(100, images[0], 'YG');
  players[1] = new Player(200, images[1], 'YINING');
  players[2] = new Player(300, images[2], 'JENNA');
  players[3] = new Player(400, images[3], 'audience');
  let fe = ml5.featureExtractor('MobileNet');
  classifier = fe.classification();
  classifier.load(checkpoint, function() {
    console.log('model loaded');
    classifier.classify(video, gotResults);
  });
}

function gotResults(error, results) {
  if (results) {
    const label = results[0].label;
    players[label].move(5);
    //console.log(results[0].label + 1);
  }

  classifier.classify(video, gotResults);
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
