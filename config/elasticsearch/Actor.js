const Actor = require("../../models/Actor");
Actor.createMapping((err, mapping) => {
  if (err) {
    console.log("Actor Mapping Error: ", err);
  } else {
    console.log("Actor Mapping Successful");
  }
});

let stream = Actor.synchronize();
let count = 0;

stream.on("data", () => {
  count++;
});

stream.on("close", () => {
  console.log(`Index ${count} documents - Actor`);
});

stream.on("error", err => {
  console.log("Actor data stream error: ", err);
});
