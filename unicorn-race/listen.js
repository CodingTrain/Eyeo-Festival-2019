async function listen() {
  const modelJson = 'https://storage.googleapis.com/tm-speech-commands/eyeo-audience/model.json';
  const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/eyeo-audience/metadata.json';
  const recognizer = speechCommands.create('BROWSER_FFT', undefined, modelJson, metadataJson);
  await recognizer.ensureModelLoaded();
  console.log(recognizer.wordLabels());
  recognizer.listen(
    result => {
      console.log(result.scores[1]);
      if (result.scores[1] > 0.1) {
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
