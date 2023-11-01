
var trex ,trex_running, nuv, groundImg, nuvem, score, grupoCacto, grupoNuvem;
var play = 1;
var end = 0;
var estado = play;
// carregar imagens, sons, modelos
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png");
  nuv = loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")

}

// preparar a configuração inicial
function setup(){
  createCanvas(600,200);
  
  //crie um sprite de trex

  trex = createSprite(60,160,40,80);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;

  ground = createSprite(300,190,600,20);
  invisibleGround = createSprite(300,198,600,10);
  ground.addImage("ground",groundImg)
  ground.velocityX=-2;

  invisibleGround.visible= false;
  score = 0;

  grupoCacto = new Group()
  grupoNuvem = new Group()
}

function draw(){
  background("white");
  drawSprites();

  text("Pontos: "+score,500,50)

  if(estado === play){
    score = Math.round(frameCount/30);
    if(keyDown("space") && trex.y > 150){
      trex.velocityY = -20;
    }
    if(frameCount%50 === 0){
      spawnCloud();
    }
    if(frameCount%60 === 0){
      spawnObstacle();
    }  

  }
  else if(estado === end){
    ground.velocityX=0
    grupoCacto.setVelocityXEach(0)
    grupoNuvem.setVelocityXEach(0)
  } 


  
  trex.velocityY += 2;
  trex.collide(invisibleGround);


  if(ground.x<0){
    ground.x = ground.width/2;
  }

  console.log(frameCount)

 
  if(grupoCacto.isTouching(trex)){
    estado = end
  }
  

}

function spawnObstacle(){
  var obstacle = createSprite(620, 170 , 10, 50);
  obstacle.velocityX = -5;
  var rand = Math.round(random(1,6))
  switch(rand){
    case 1: obstacle.addImage(o1);
    break;
    case 2: obstacle.addImage(o2);
    break;
    case 3: obstacle.addImage(o3);
    break;
    case 4: obstacle.addImage(o4);
    break;
    case 5: obstacle.addImage(o5);
    break;
    case 6: obstacle.addImage(o6);
    break;
    default: break;
  }
  obstacle.scale=0.5;
  obstacle.lifetime=350;

  grupoCacto.add(obstacle)
  
}

function spawnCloud(){
  y = Math.round(random(30,80))
  nuvem = createSprite(650,y,50,50);
  nuvem.addImage("nuvem",nuv)
  nuvem.velocityX = -2;

  nuvem.depth = trex.depth
  trex.depth = trex.depth+1

  nuvem.lifetime = 350;

  grupoNuvem.add(nuvem)

}

if(1=="1"){
  console.log('1=="1"')
}
if(1==="1"){
  console.log('1==="1"')
}