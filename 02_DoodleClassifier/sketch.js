const CLASSES = 3;
const IMAGE_SIZE = 784;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let catsData;
let trainsData;
let rainbowsData;

let data;
let model;

function preload() {
  catsData = loadBytes('data/cats1000.bin');
  trainsData = loadBytes('data/trains1000.bin');
  rainbowsData = loadBytes('data/rainbows1000.bin');
}

function setup() {
  createCanvas(280, 280);
  let total = (catsData.bytes.length + rainbowsData.bytes.length + trainsData.bytes.length) / IMAGE_SIZE;
  data = new DoodleData(total);
  data.load(catsData.bytes, CAT);
  data.load(rainbowsData.bytes, RAINBOW);
  data.load(trainsData.bytes, TRAIN);
  data.shuffle();

  model = new Classifier();
  // model.train(data);

  background(255);

  let trainButton = select('#train');
  // let epochCounter = 0;
  trainButton.mousePressed(function() {
    model.train(data);
  });

  // let testButton = select('#test');
  // testButton.mousePressed(function() {});

  // let guessButton = select('#guess');
  // guessButton.mousePressed(function() {
  //   let inputs = [];
  //   let img = get();
  //   img.resize(28, 28);
  //   img.loadPixels();
  //   for (let i = 0; i < len; i++) {
  //     let bright = img.pixels[i * 4];
  //     inputs[i] = (255 - bright) / 255.0;
  //   }
  //
  //   let guess = nn.predict(inputs);
  //   // console.log(guess);
  //   let m = max(guess);
  //   let classification = guess.indexOf(m);
  //   if (classification === CAT) {
  //     console.log("cat");
  //   } else if (classification === RAINBOW) {
  //     console.log("rainbow");
  //   } else if (classification === TRAIN) {
  //     console.log("train");
  //   }
  //
  //   //image(img, 0, 0);
  // });

  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(255);
  });
}

function draw() {
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
