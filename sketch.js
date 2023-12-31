let character;
let coneObject;
let welcomeScreen;
let cones = [];
let outfit1;
let outfit2;
let gameState;
let outfitSelectionScreen;
let gameScreen;
let gameoverScreen;
let characterWidth;
let characterHeight;
let bgmusic;
let music;
let score;

function preload() {
  coneObject = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e644daab429a82149643_TRAFFIC_CONES.png");
  welcomeScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e6444b3e0306b4c23a23_welcome.png");
  outfitSelectionScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e64464aed4b6f4301079_selection.png");
  outfit1 = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e6443df5ab48d5112597_outfit1.png");
  outfit2 = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e644656dfadeef871457_outfit2.png");
  gameScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e64409103cb0440fbd6c_background.png");
  gameoverScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e644dbb6f549d6da9277_gameover.png");
  bgmusic = loadSound("https://cdn.discordapp.com/attachments/1164579381864321134/1190854716993847346/Zones.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  characterWidth = width/12;
  characterHeight = height/3.375;
  gameState = "welcome";
  music = false;
}

function draw() {
  if(gameState === "welcome"){
    welcome();
    noLoop();
  } else if (gameState === "outfitSelection") {
    setupScreen();
    noLoop();
  } else if (gameState === "playing") {
    gamePlay();
  } else if (gameState === "gameOver") {
    displayGameOver();
    noLoop();
  }
}

function resetGame() {
  character = null;
  gameState = "welcome";
}

//mouse event handler---------------------------------------------------------------------------------------------------------------
function mouseClicked() {
  //welcome screen
  if(gameState === "welcome"){
    if(!music){
      bgmusic.loop();
      music = true;
    }
    let sizeX = width/16;
    let sizeY = height/16;
    let newHeight = height - height/6;
    let newWidth = width/2;

    if(mouseX > newWidth - sizeX && mouseX < newWidth + sizeX && mouseY > newHeight - sizeY && mouseY < newHeight + sizeY){
      gameState = "outfitSelection";
      loop();
    }
  }

  //outfit screen
  else if (gameState === "outfitSelection" && !character) {
    let screenRatio = (width+height) / 15;
    let newWidth = width/4.5;
    let newHeight = height/1.7;
    if (mouseX > newWidth-screenRatio && mouseX < newWidth + screenRatio && mouseY > newHeight-screenRatio && mouseY < newHeight + screenRatio) {
      character = outfit2;
      startGame();
      loop();
    } else if (mouseX > width-newWidth-screenRatio-100 && mouseX < width-newWidth+screenRatio-100 && mouseY > height-newHeight-screenRatio && mouseY < height-newHeight+screenRatio) {
      character = outfit1;
      startGame();
      loop();
    }
  }

  //gameover screen
  else if (gameState === "gameOver") {
    let sizeX = width/8;
    let sizeY = height/9;
    let newHeight = height/1.28;
    let newWidth = width/2;
    if(mouseX > newWidth - sizeX && mouseX < newWidth + sizeX && mouseY > newHeight - sizeY && mouseY < newHeight + sizeY){
      resetGame();
      loop();
    }
  }
}

function mouseMoved() {
  mouseX = constrain(mouseX, 0, width - 50);
  mouseY = constrain(mouseY, 0, height - 50);
  if(gameState === "welcome"){
    let sizeX = width/16;
    let sizeY = height/16;
    let newHeight = height - height/6;
    let newWidth = width/2;
    if(mouseX > newWidth - sizeX && mouseX < newWidth + sizeX && mouseY > newHeight - sizeY && mouseY < newHeight + sizeY){
      cursor("pointer");
    }else{
      cursor(ARROW);
    }
  }else if(gameState === "playing"){
    noCursor();
  }else if(gameState === "gameOver"){
    let sizeX = width/8;
    let sizeY = height/9;
    let newHeight = height/1.28;
    let newWidth = width/2;
    if(mouseX > newWidth - sizeX && mouseX < newWidth + sizeX && mouseY > newHeight && mouseY < newHeight + sizeY){
      cursor("pointer");
    }else{
      cursor(ARROW);
    }
  }
}

//game pre start screen-------------------------------------------------------------------------------------------------------------------
function welcome(){
  background(welcomeScreen);
}

//game start screen-----------------------------------------------------------------------------------------------------------------------
function setupScreen() {
  background(outfitSelectionScreen);
}

//gameplay screen---------------------------------------------------------------------------------------------------------------------------
function startGame() {
  cones = []; // Reset cones array
  for (let i = 0; i < 4; i++) {
    let cone = createCone(i+1);
    cones.push(cone);
  }
  gameState = "playing";
  score = 0;
  setInterval(()=>{
    score++;
  },1000);
}


function gamePlay() {
  background(gameScreen);
  textSize(50);
  text(score, width/2, height/2);
  for (let cone of cones) {
    displayCone(cone);
    moveCone(cone);
    checkCollision(cone);
  }
  
  image(character, mouseX-characterWidth/2, mouseY-characterHeight/2, characterWidth, characterHeight);
}

function createCone(i) {
  return {
    x: width/4*i + width,
    y: random(height),
    speed: width/65,
  };
}

function displayCone(cone) {
  image(coneObject, cone.x-characterWidth/2, cone.y-characterHeight/2, characterWidth, characterHeight);
}

function moveCone(cone) {
  cone.x -= cone.speed;

  if (cone.x < 0) {
    cone.x = width;
    cone.y = random(height);
  }
}

function checkCollision(cone) {
  let d = dist(cone.x, cone.y, mouseX, mouseY);
  let minDist = (characterHeight+characterWidth)/3;
  if (d < minDist) {
    gameState = "gameOver";
  }
}

//gameover screen---------------------------------------------------------------------------------------------------------------
function displayGameOver() {
  background(gameoverScreen);
}




