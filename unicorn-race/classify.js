const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/eyeo-trio/model.json';

let classifier;

function startml5() {
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
  }
  classifier.classify(video, gotResults);
}
