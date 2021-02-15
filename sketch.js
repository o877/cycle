var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);

background = createSprite(600,150,1200,300);
background.addImage(pathImg);
  
redCG = new Group();
pinkCG = new Group();
yellowCG = new Group();
  
mainCyclist = createSprite(80,100,40,40);
mainCyclist.addAnimation("running",mainRacerImg1);
mainCyclist.addAnimation("collided",mainRacerImg2);
mainCyclist.scale=0.06
  
gameOver= createSprite(600,150,40,40);
gameOver.addImage(gameOverImg);
gameOver.scale=0.8;
gameOver.visible=false;
  
mainCyclist.debug=false;
mainCyclist.setCollider("circle",0,0,700);
}

function draw() {
 background.velocityX=-5
 if (background.x<0){
     background.x = background.width/2
     }
  
   drawSprites();
  
  fill("white");
  textSize(20);
  text("Distance: "+ distance,1000,50);
  
 if (gameState === PLAY){
      distance = distance + Math.round(getFrameRate()/60);
      background.velocityX = -(6+3*distance/100);
    
      mainCyclist.y = World.mouseY 
   
      edges= createEdgeSprites();
      mainCyclist.collide(edges);
   
      if (keyDown("space")){
          cycleBell.play();
          }
    
      redCyclist();
      pinkCyclist();
      yellowCyclist();
   
   if (mainCyclist.isTouching(yellowCG)){
     mainCyclist.changeAnimation("collided",mainRacerImg2);
     player3.changeAnimation("knock",oppYellow2Img);
     
     redCG.destroyEach();
     pinkCG.destroyEach();
    
     gameState = END;
   }
   
   if (mainCyclist.isTouching(pinkCG)){
     mainCyclist.changeAnimation("collided",mainRacerImg2);
     player2.changeAnimation("down",oppPink2Img);
     
     redCG.destroyEach();
     yellowCG.destroyEach();
    
     gameState = END;
   }
    
   if (mainCyclist.isTouching(redCG)){
     mainCyclist.changeAnimation("collided",mainRacerImg2);
     player1.changeAnimation("felt",oppRed2Img);
     
     yellowCG.destroyEach();
     pinkCG.destroyEach();
       
     gameState = END;
       }
 
      } 
  else if(gameState === END) {
      background.velocityX=0;
    
      gameOver.visible=true;
      fill("white");
      textSize(20);
      text("Press UP arrow to restart",500,200);
      
      
      redCG.setVelocityXEach(0);
      pinkCG.setVelocityXEach(0);
      yellowCG.setVelocityXEach(0);
    
      redCG.setLifetimeEach(-1);
      pinkCG.setLifetimeEach(-1);
      yellowCG.setLifetimeEach(-1);
    
    if (keyDown("UP_ARROW") && gameState === END){
        reset();
        }
      }
 
}

function reset(){
  gameState = PLAY;
  
  mainCyclist.changeAnimation("running", mainRacerImg1);
  
  redCG.destroyEach();
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  gameOver.visible=false;
  
  distance = 0;
}

function redCyclist(){
  if (frameCount%160 === 0){
      player1 = createSprite(1200,Math.round(random(70,250)));
      player1.addAnimation("red opponent",oppRed1Img);
      player1.addAnimation("felt",oppRed2Img);
      player1.scale=0.06
      player1.velocityX=-2;
      player1.lifetime=600
      player1.velocityX = -(6 +3* distance/100);
      redCG.add(player1);
      }
}

function pinkCyclist(){
  if (frameCount%320 === 0){
      player2 = createSprite(1200,Math.round(random(70,250)));
      player2.addAnimation("pink opponent",oppPink1Img);
      player2.addAnimation("down",oppPink2Img);
      player2.scale=0.06
      player2.velocityX=-4;
      player2.lifetime=300
      player2.velocityX = -(6 +3* distance/120);
      pinkCG.add(player2);
  }
}

function yellowCyclist(){
  if (frameCount%240 === 0){
      player3 = createSprite(1200,Math.round(random(70,250)));
      player3.addAnimation("yellow opponent",oppYellow1Img);
      player3.addAnimation("knock",oppYellow2Img);
      player3.scale=0.06
      player3.velocityX=-3;
      player3.lifetime=400
      player3.velocityX = -(6 +3* distance/80);
      yellowCG.add(player3);
  }
}