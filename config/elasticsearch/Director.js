const Director = require("../../models/Director");
try {
  Director.createMapping((err, mapping) => {
    if (err) {
      console.log("Director Mapping Error: ", err);
    } else {
      console.log("Director Mapping Successful");
    }
  });
} catch (err) {
  console.log("Director Mapping Error: ", err);
}

let stream = Director.synchronize();

let count = 0;

stream.on("data", () => {
  count++;
});

stream.on("close", () => {
  console.log(`Index ${count} documents - Director`);
});

stream.on("error", err => {
  console.log("Director data stream error: ", err);
});
