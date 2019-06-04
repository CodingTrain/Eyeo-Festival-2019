const modelJson = 'https://storage.googleapis.com/tm-speech-commands/eye-test-happy/model.json';
const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/eyeo-test-yining/model.json';

let soundClassifier;
let imageClassifier;
let video;
let canvas;
let resultsP1;
let resultsP2;

function preload() {
  video = createCapture(VIDEO);
  //video.hide();
  video.size(320, 240);
  soundClassifier = ml5.soundClassifier(modelJson);
  imageClassifier = ml5.imageClassifier(checkpoint);
}

function setup() {
  noCanvas();
  //canvas = createCanvas(320, 240);
  resultsP1 = createP('...');
  resultsP2 = createP('...');
  //  Classify the current video frame.
  classifyImage();
  // Classify the sound from microphone in real time
  soundClassifier.classify(gotSoundResults);
}

// Classify the current frame.
function classifyImage() {
  imageClassifier.classify(video, gotImageResults);
}

// function draw() {
//   background(0);
//   translate(video.width, 0);
//   scale(-1.0, 1.0);
//   image(video, 0, 0);
// }

// Show the results
function gotImageResults(err, results) {
  resultsP1.html('Image Label: ' + results[0].label + ' Confidence: ' + results[0].confidence);
  classifyImage();
}

// A function to run when Sound Classifier get any errors and the results
function gotSoundResults(err, results) {
  resultsP2.html('Sound Label: ' + results[0].label + ' Confidence: ' + results[0].confidence);
}
