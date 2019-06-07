function setup() {
  noCanvas();
  createButton('generate').mousePressed(generate);
}

function generate() {
  const vector = [];
  for (let i = 0; i < 512; i++) {
    vector[i] = random(-1, 1);
  }

  const inputs = {
    z: vector,
    truncation: 0.5
  };

  httpPost('http://localhost:8000/query', 'json', inputs, function(data) {
    const img = createImg(data.image);
    img.size(128, 128);
    console.log(data);
    const imageData = {
      image64: data.image,
      status: '#RainbowGAN (generated by @RunwayML)'
    };
    httpPost('http://localhost:3001/tweet', 'json', imageData, function(response) {
      console.log(response);
    });
  });
}
