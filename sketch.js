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
let musicX;
let musicY;
let musicOff;
let musicOn;
let musicSizeX;
let musicSizeY;
let score;
let welcomeX;
let welcomeY;
let welcomeHeight;
let welcomeWidth;
let selectionRatio;
let selectionWidth;
let selectionHeight;
let gameoverX;
let gameoverY;
let gameoverHeight;
let gameoverWidth;

function preload() {
  coneObject = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e644daab429a82149643_TRAFFIC_CONES.png");
  welcomeScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e6444b3e0306b4c23a23_welcome.png");
  outfitSelectionScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e64464aed4b6f4301079_selection.png");
  outfit1 = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e6443df5ab48d5112597_outfit1.png");
  outfit2 = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e644656dfadeef871457_outfit2.png");
  gameScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e64409103cb0440fbd6c_background.png");
  gameoverScreen = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6590e644dbb6f549d6da9277_gameover.png");
  bgmusic = loadSound("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6591c908a055423e4ed74037_Zones.txt");
  musicOff = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6591d97bd026cf5470f73d6e_Asset_1.png");
  musicOn = loadImage("https://uploads-ssl.webflow.com/65794514dea4232af4769843/6591d9845f4bebbe3e77a4da_Asset_4.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  characterWidth = width/12;
  characterHeight = height/3.375;
  gameState = "welcome";
  music = false;
  welcomeX = width/16;
  welcomeY= height/16;
  welcomeHeight = height - height/6;
  welcomeWidth = width/2;
  selectionRatio = (width+height) / 15;
  selectionWidth = width/4.5;
  selectionHeight = height/1.7;
  gameoverX = width/8;
  gameoverY = height/9;
  gameoverHeight = height/1.28;
  gameoverWidth = width/2;
  musicX = width*0.85;
  musicY = height/8;
  musicSizeX = width/10;
  musicSizeY = height/7;
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
    if(mouseX > musicX - musicSizeX && mouseX < musicX + musicSizeX && mouseY > musicY - musicSizeY && mouseY < musicY + musicSizeY){
      if(!music){
        bgmusic.play();
        image(musicOn,musicX,musicY,musicSizeX,musicSizeY);
        music = true;
      }else{
        bgmusic.pause();
        image(musicOff,musicX,musicY,musicSizeX,musicSizeY);
        music = false;
      }
    }
    
    if(mouseX > welcomeWidth - welcomeX && mouseX < welcomeWidth + welcomeX && mouseY > welcomeHeight - welcomeY && mouseY < welcomeHeight + welcomeY){
      gameState = "outfitSelection";
      loop();
    }
  }

  //outfit screen
  else if (gameState === "outfitSelection" && !character) {
    if (mouseX > selectionWidth-selectionRatio && mouseX < selectionWidth + selectionRatio && mouseY > selectionHeight-selectionRatio && mouseY < selectionHeight + selectionRatio) {
      character = outfit2;
      startGame();
      loop();
    } else if (mouseX > width-selectionWidth-selectionRatio-100 && mouseX < width-selectionWidth+selectionRatio-100 && mouseY > height-selectionHeight-selectionRatio && mouseY < height-selectionHeight+selectionRatio) {
      character = outfit1;
      startGame();
      loop();
    }
  }

  //gameover screen
  else if (gameState === "gameOver") {
    if(mouseX > gameoverWidth - gameoverX && mouseX < gameoverWidth + gameoverX && mouseY > gameoverHeight - gameoverY && mouseY < gameoverHeight + gameoverY){
      resetGame();
      loop();
    }
  }
}

function mouseMoved() {
  mouseX = constrain(mouseX, 0, width - 50);
  mouseY = constrain(mouseY, 0, height - 50);
  if(gameState === "welcome"){
    if(mouseX > welcomeWidth - welcomeX && mouseX < welcomeWidth + welcomeX && mouseY > welcomeHeight - welcomeY && mouseY < welcomeHeight + welcomeY
      || mouseX > musicX - musicSizeX && mouseX < musicX + musicSizeX && mouseY > musicY - musicSizeY && mouseY < musicY + musicSizeY){
      cursor("pointer");
    }else{
      cursor(ARROW);
    }
    
  }else if(gameState === "outfitSelection"){
    if (mouseX > selectionWidth-selectionRatio && mouseX < selectionWidth + selectionRatio && mouseY > selectionHeight-selectionRatio && mouseY < selectionHeight + selectionRatio) {
      cursor("pointer");
    }else if (mouseX > width-selectionWidth-selectionRatio-100 && mouseX < width-selectionWidth+selectionRatio-100 && mouseY > height-selectionHeight-selectionRatio && mouseY < height-selectionHeight+selectionRatio) {
      cursor("pointer");
    }else{
      cursor(ARROW);
    }
  }
  else if(gameState === "playing"){
    noCursor();
  }else if(gameState === "gameOver"){
    if(mouseX > gameoverWidth - gameoverX && mouseX < gameoverWidth + gameoverX && mouseY > gameoverHeight && mouseY < gameoverHeight + gameoverY){
      cursor("pointer");
    }else{
      cursor(ARROW);
    }
  }
}

//game pre start screen-------------------------------------------------------------------------------------------------------------------
function welcome(){
  background(welcomeScreen);
  if(music){
    image(musicOn,musicX,musicY,musicSizeX,musicSizeY);
  }else{
    image(musicOff,musicX,musicY,musicSizeX,musicSizeY);
  }
  
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
    cone.speed += width/200000;
    checkCollision(cone);
  }
  
  image(character, mouseX-characterWidth/2, mouseY-characterHeight/2, characterWidth, characterHeight);
}

function createCone(i) {
  return {
    x: width/4*i + width,
    y: random(height)*0.9 + height/10,
    speed: width/100,
  };
}

function displayCone(cone) {
  image(coneObject, cone.x-characterWidth/2, cone.y-characterHeight/2, characterWidth, characterHeight);
}

function moveCone(cone) {
  cone.x -= cone.speed;

  if (cone.x < 0) {
    cone.x = width;
    cone.y = random(height)*0.9 + height/10;
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




