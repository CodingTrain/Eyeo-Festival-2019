class Player {
  constructor(y, img) {
    this.x = 0;
    this.y = y;
    this.img = img;
    this.r = 90;
  }

  move() {
    this.x += 1;
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
let sky;

function preload() {
  for (let i = 0; i < 4; i++) {
    images[i] = loadImage(`data/player${i}.png`);
  }
  sky = loadImage('sky_small.png');
}

const modelJson = 'https://storage.googleapis.com/tm-speech-commands/2019-05-30-2-45-51/model.json';
const metaDataJson =
  'https://storage.googleapis.com/tm-speech-commands/2019-05-30-2-45-51/metadata.json';
const recognizer = speechCommands.create('BROWSER_FFT', undefined, modelJson, metaDataJson);

let video, classifier;

async function listen() {
  await recognizer.ensureModelLoaded();
  console.log(recognizer.wordLabels());
  recognizer.listen(
    result => {
      console.log(result);
      if (result.scores[0] > 0.5) {
        players[3].move();
      }
    },
    {
      includeSpectrogram: true,
      probabilityThreshold: 0.75,
      overlapFactor: 0.5 // probably want between 0.5 and 0.75. More info in README
    }
  );
}
let canvas;

function setup() {
  canvas = createCanvas(889, 500);
  video = createCapture(VIDEO);
  video.size(320, 240);
  let fe = ml5.featureExtractor('MobileNet');
  classifier = fe.classification();
  const checkpoint =
    'https://storage.googleapis.com/tm-pro-a6966.appspot.com/eyeo-test-4/model.json';

  classifier.load(checkpoint, function() {
    classifier.classify(video, gotResult);
  });
  listen();

  players[0] = new Player(150, images[0]);
  players[1] = new Player(250, images[1]);
  players[2] = new Player(350, images[2]);
  players[3] = new Player(450, images[3]);
}

function gotResult(error, results) {
  let label = results[0].label;
  console.log(label);
  if (label == '1') {
    players[0].move();
  } else if (label == '2') {
    players[1].move();
  } else if (label == '3') {
    players[2].move();
    // } else if (label == '4') {
    //   players[3].move();
    // }
  }
  classifier.classify(video, gotResult);
}
// function keyPressed() {
//   if (key == '1') {
//     players[0].move();
//   } else if (key == '2') {
//     players[1].move();
//   } else if (key == '3') {
//     players[2].move();
//   } else if (key == '4') {
//     players[3].move();
//   }
// }

function draw() {
  imageMode(CORNER);
  image(sky, 0, 0);
  for (let p of players) {
    p.show();
    if (p.win()) {
      console.log('WIN');
    }
  }
}

function mousePressed() {
  const base64data = canvas.elt.toDataURL();
  const data = {
    image64: base64data.substring(22, base64data.length)
  };
  httpPost('http://localhost:3000/tweet', 'json', data, function(response) {
    console.log(response);
  });
}
