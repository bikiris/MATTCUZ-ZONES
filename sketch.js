let character;
let coneObject;
let welcomeScreen;
let cones = [];
let outfit1;
let outfit2;
let gameState;
let outfitSelectionScreen;
let gameScreen;
function preload() {
  coneObject = loadImage("./TRAFFIC_CONES.png");
  welcomeScreen = loadImage("./Artboard_1.png");
  outfitSelectionScreen = loadImage("./Artboard_2.png");
  outfit1 = loadImage("./Asset_2.png");
  outfit2 = loadImage("./Asset_3.png");
  gameScreen = loadImage("./DQPF8MhWAAIMO0u.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = "welcome";
}

function draw() {
  if(gameState === "welcome"){
    welcome();
  }
  else if (gameState === "outfitSelection") {
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
      gameState = "outfitSelection";
  }

  //outfit screen
  if (gameState === "outfitSelection" && !character) {
    if (mouseX > width / 4 && mouseX < width / 4 + 100 && mouseY > height / 2 && mouseY < height / 2 + 100) {
      character = outfit1;
      startGame();
    } else if (mouseX > (3 * width) / 4 - 100 && mouseX < (3 * width) / 4 && mouseY > height / 2 && mouseY < height / 2 + 100) {
      character = outfit2;
      startGame();
    }
  }

  //gameover screen
  if (gameState === "gameOver" && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
    mouseY > height / 2 + 50 && mouseY < height / 2 + 100) {
    resetGame();
  }
}

function mouseMoved() {
  mouseX = constrain(mouseX, 0, width - 50);
  mouseY = constrain(mouseY, 0, height - 50);
}

//game pre start screen-------------------------------------------------------------------------------------------------------------------
function welcome(){
  background(welcomeScreen);

  text("Click anywhere to start", width/2, height/2);
}

//game start screen-----------------------------------------------------------------------------------------------------------------------
function setupScreen() {
  background(outfitSelectionScreen);


  // Instructions
  textSize(20);
  text("Click on an outfit to select", width / 2, (3 * height) / 4);
}

//gameplay screen---------------------------------------------------------------------------------------------------------------------------
function startGame() {
  cones = []; // Reset cones array
  for (let i = 0; i < 4; i++) {
    let cop = createCop();
    cones.push(cop);
  }
  gameState = "playing";
}

function gamePlay() {
  background(gameScreen);

  for (let cop of cones) {
    displayCop(cop);
    moveCop(cop);
    checkCollision(cop);
  }

  image(character, mouseX-50, mouseY-50, 100, 100);
  circle(mouseX,mouseY,90,90);
}

function createCop() {
  return {
    x: random(width),
    y: random(height),
    speed: 16,
  };
}

function displayCop(cop) {
  image(coneObject, cop.x-60, cop.y-60, 130, 130);
  circle(cop.x,cop.y,80,80)
}

function moveCop(cop) {
  cop.x -= cop.speed;

  if (cop.x < 0) {
    cop.x = width;
    cop.y = random(height);
  }
}

function checkCollision(cop) {
  let d = dist(cop.x, cop.y, mouseX, mouseY);
  if (d < 90) {
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




