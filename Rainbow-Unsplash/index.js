const Unsplash = require('unsplash-js').default;
const fetch = require('node-fetch');
global.fetch = fetch;
const fs = require('fs');
require('dotenv').config();

let all = [];

const unsplash = new Unsplash({
  applicationId: process.env.API_KEY,
  secret: process.env.API_SECRET
});

async function download(url, name) {
  const response = await fetch(url);
  const dest = fs.createWriteStream(`./images/regular/${name}.png`);
  response.body.pipe(dest);
}

getAll();
async function getAll() {
  for (let i = 1; i < 328; i++) {
    //let i = 300;
    try {
      const response = await unsplash.search.photos('rainbow', i, 20);
      const json = await response.json();
      const photos = json['results'];
      for (let j = 0; j < photos.length; j++) {
        // await download(photos[j].links.download, photos[j].id);
        await download(photos[j].urls.regular, photos[j].id);
      }
      // fs.writeFileSync(`pages/data_${i}.json`, JSON.stringify(json, null, 2));
      all = all.concat(json.results);
      console.log('success' + i);
    } catch (error) {
      //console.log(error);
      console.log('error' + i);
    }
    // await delay(500);
  }
  console.log(all.length);
  //fs.writeFileSync('data_all.json', JSON.stringify(all));
}

// function delay(duration) {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       resolve();
//     }, duration);
//   });
// }
