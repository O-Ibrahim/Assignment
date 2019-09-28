const Movie = require("../../models/Movie");

Movie.createMapping((err, mapping) => {
  if (err) {
    console.log("Movie Mapping Error: ", err);
  } else {
    console.log("Movie Mapping Successful");
  }
});

let stream = Movie.synchronize();
let count = 0;

stream.on("data", () => {
  count++;
});

stream.on("close", () => {
  console.log(`Index ${count} documents - Movie`);
});

stream.on("error", err => {
  console.log("Movie data stream error: ", err);
});
