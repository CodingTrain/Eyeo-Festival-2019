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
