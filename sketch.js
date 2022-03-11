var tower , towerPicture ;
var ghost , ghostImg;
var invisibleBlock;
var gameState="play";

function preload () {
towerPicture=loadImage("tower.png");
doorImage=loadImage("door.png");
climberImg=loadImage("climber.png");
ghostImg=loadImage("ghost-standing.png");
}

function setup () {
createCanvas (600,600);
tower=createSprite(300,300);
tower.addImage(towerPicture);
tower.velocityY = 2;
doorsGroup= new Group();
climbersGroup= new Group();
ghost=createSprite(300,250);
ghost.addImage(ghostImg);
ghost.scale=0.5;
invisibleBlocksGroup= new Group();
  
}

function draw () {
  if (gameState==="play") {

  if (tower.y>600){
      tower.y=300;
      }
  
  if (keyDown("left_arrow")){
      ghost.x=ghost.x-3;
      }
  
  if (keyDown("right_arrow")){
      ghost.x=ghost.x+3;
      }
  
  if (keyDown("space")) {
      ghost.velocityY=-4;
     
      }
  
     ghost.velocityY=ghost.velocityY+0.8;
  
  if  (climbersGroup.isTouching(ghost)) {
     ghost.velocityY=0; 
  }
  
  doors();
    if (invisibleBlocksGroup.isTouching(ghost) || ghost.y>600) {
        ghost.destroy();
        gameState="end";
        }
  
  drawSprites();
  }
  if (gameState==="end"){
   stroke("yellow");
    fill("green");
    textSize(30);
    text("Game Over",250,250);
  }
}

function doors () {
  
 if (frameCount % 200 === 0) {
   door=createSprite(300,0);
  door.addImage(doorImage);
   door.velocityY=2;
   door.x=Math.round(random(120,400))
   door.lifetime=300;
   doorsGroup.add(door);
   climber=createSprite(300,50);
   climber.addImage(climberImg);
   climber.velocityY=2;
   climber.x=door.x;
   climber.lifetime=300;
   climbersGroup.add(climber);
   ghost.depth=door.depth;
   ghost.depth+=1;
   invisibleBlock=createSprite(300,55);
   invisibleBlock.width=climber.width;
   invisibleBlock.height=2;
   invisibleBlock.visible=false;
   invisibleBlock.x=door.x;
   invisibleBlock.velocityY=2;
   invisibleBlocksGroup.add(invisibleBlock);
 }
  
  
}