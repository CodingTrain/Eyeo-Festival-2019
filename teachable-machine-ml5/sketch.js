const modelJson = 'https://storage.googleapis.com/tm-speech-commands/eyeo-sound-test/model.json';
const metadataJson =
  'https://storage.googleapis.com/tm-speech-commands/eyeo-sound-test/metadata.json';

const recognizer = speechCommands.create('BROWSER_FFT', undefined, modelJson, metadataJson);

let featureExtractor;
let classifier;
let video;
let canvas;

function setup() {
  canvas = createCanvas(320, 240);
  video = createCapture(VIDEO, function() {
    console.log('video ready!');
  });
  video.hide();
  video.size(320, 240);
  featureExtractor = ml5.featureExtractor('MobileNet');
  const options = { numLabels: 3 };
  classifier = featureExtractor.classification(options);
  const checkpoint =
    'https://storage.googleapis.com/tm-pro-a6966.appspot.com/eyeo-test-2/model.json';
  classifier.load(checkpoint, function() {
    console.log('model loaded');
    classify();
  });

  loadMyModel();
  async function loadMyModel() {
    await recognizer.ensureModelLoaded();
    const labels = recognizer.wordLabels();
    recognizer.listen(
      async result => {
        console.log(labels[0], result.scores[0]);
        console.log(labels[1], result.scores[1]);
        console.log(labels[2], result.scores[2]);
      },
      {
        probabilityThreshold: 0.5,
        overlapFactor: 0.75
      }
    );
  }
}

// Classify the current frame.
function classify() {
  classifier.classify(canvas, gotResults);
}

function draw() {
  background(0);
  translate(video.width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0);
}

// Show the results
function gotResults(err, results) {
  console.log(results[0].label);
  classify();
}
