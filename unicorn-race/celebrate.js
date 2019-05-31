function celebrate(name) {
  const vector = [];
  for (let i = 0; i < 512; i++) {
    vector[i] = random(-1, 1);
  }

  const inputs = {
    z: vector,
    truncation: 0.5
  };

  console.log(`${name} has won!`);

  httpPost('http://localhost:8000/query', 'json', inputs, response => {
    console.log(response);
    let img = createImg(response.image);
    img.size(128, 128);

    const tweet = {
      image64: response.image,
      status: `${name} has won! #eyeotest`
    };

    httpPost('http://localhost:3001/tweet', 'json', tweet, response => {
      console.log(response);
    });
  });
}
