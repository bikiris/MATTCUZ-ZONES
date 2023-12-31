let character;
let coneObject;
let welcomeScreen;
let cones = [];
let outfit1;
let outfit2;
let gameState;
let outfitSelectionScreen;
let gameScreen;
let characterWidth;
let characterHeight;

function preload() {
  coneObject = loadImage("./assets/TRAFFIC_CONES.png");
  welcomeScreen = loadImage("./assets/welcome.png");
  outfitSelectionScreen = loadImage("./assets/selection.png");
  outfit1 = loadImage("./assets/outfit1.png");
  outfit2 = loadImage("./assets/outfit2.png");
  gameScreen = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  characterWidth = width/12;
  characterHeight = height/6;
  gameState = "welcome";
}

function draw() {
  if(gameState === "welcome"){
    welcome();
  } else if (gameState === "outfitSelection") {
    setupScreen();
  } else if (gameState === "playing") {
    gamePlay();
  } else if (gameState === "gameOver") {
    displayGameOver();
    displayPlayAgainButton();
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
    let sizeX = width/16;
    let sizeY = height/18;
    let newHeight = height - height/7;
    let newWidth = width/2;
    console.log(newHeight);
    console.log(newHeight-sizeY);
    console.log(newHeight+sizeY);
    console.log(newWidth-sizeX);
    console.log(newWidth+sizeX);

    if(mouseX > newWidth - sizeX && mouseX < newWidth + sizeX && mouseY > newHeight - sizeY && mouseY < newHeight + sizeY){
      gameState = "outfitSelection";
    }
     
  }

  //outfit screen
  else if (gameState === "outfitSelection" && !character) {
    let screenRatio = (width+height) / 15;
    let newWidth = width/4.5;
    let newHeight = height/1.7;
    if (mouseX > newWidth-screenRatio && mouseX < newWidth + screenRatio && mouseY > newHeight-screenRatio && mouseY < newHeight + screenRatio) {
      character = outfit1;
      startGame();
    } else if (mouseX > width-newWidth-screenRatio-100 && mouseX < width-newWidth+screenRatio-100 && mouseY > height-newHeight-screenRatio && mouseY < height-newHeight+screenRatio) {
      character = outfit2;
      startGame();
    }
  }

  //gameover screen
  else if (gameState === "gameOver" && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
    mouseY > height / 2 + 50 && mouseY < height / 2 + 100) {
    resetGame();
  }
}

function mouseMoved() {
  mouseX = constrain(mouseX, 0, width - 50);
  mouseY = constrain(mouseY, 0, height - 50);
  if(gameState === "welcome"){
    let sizeX = width/16;
    let sizeY = height/18;
    let newHeight = height - height/7;
    let newWidth = width/2;

    if(mouseX > newWidth - sizeX && mouseX < newWidth + sizeX && mouseY > newHeight - sizeY && mouseY < newHeight + sizeY){
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
  // Instructions
  textSize(20);
}

//gameplay screen---------------------------------------------------------------------------------------------------------------------------
function startGame() {
  cones = []; // Reset cones array
  for (let i = 0; i < 4; i++) {
    let cone = createCone();
    cones.push(cone);
  }
  gameState = "playing";
}


function gamePlay() {
  background(gameScreen);

  for (let cone of cones) {
    displayCone(cone);
    moveCone(cone);
    checkCollision(cone);
  }

  image(character, mouseX-characterWidth/2, mouseY-characterHeight/2, characterWidth, characterHeight);
  circle(mouseX,mouseY,characterWidth,mouseY-characterHeight);
}

function createCone() {
  return {
    x: random(width)+width,
    y: random(height)+height,
    speed: width/50,
  };
}

function displayCone(cone) {
  image(coneObject, cone.x-characterWidth/2, cone.y-characterHeight/2, characterWidth, characterHeight);
  circle(cone.x,cone.y,characterWidth,mouseY-characterHeight);
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
  let minDist = (characterHeight+characterWidth)/2;
  if (d < minDist) {
    gameState = "gameOver";
  }
}

//gameover screen---------------------------------------------------------------------------------------------------------------
function displayGameOver() {
  background(255, 0, 0);
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}

function displayPlayAgainButton() {
  fill(0, 255, 0);
  rect(width / 2 - 100, height / 2 + 50, 200, 50, 10);
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Play Again", width / 2, height / 2 + 75);
}




