var bg,bgImg;
var nave,naveImg;
var meteorito,meteoritoImg;
var bala,balaImg;
var balaGroup;
var metGroup;
var score=0;

function preload(){
  
  bgImg = loadImage("fondo.jpg")
  naveImg = loadImage("nave2.png")
  meteoritoImg = loadImage("meteorito1.png")
  balaImg = loadImage("bala.png")
  

}
function setup() {
  createCanvas(windowWidth,windowHeight);

  // Agregando la imagen de fondo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 2.0

nave = createSprite(displayWidth-1500, displayHeight-500, 50, 50);
 nave.addImage(naveImg)
   nave.scale = 0.3
   nave.debug = true
   nave.setCollider("rectangle",0,0,500,500)
  
balaGroup = new Group();
metGroup = new Group();
scoreboard= createElement("h1");
}

function draw() {
  background(0);  

  scoreboard.html("Puntuación: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(keyDown("UP_ARROW")||touches.length>0){
    nave.y = nave.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   nave.y = nave.y+30
  }

  if(keyWentDown("space")){
  
    dead();
    
  }


  if (metGroup.isTouching(nave)) {
    for(var i=0;i<metGroup.length;i++){
      metGroup[i].destroy()
      nave.destroy()
        
  }
  }

  if (metGroup.isTouching(balaGroup)){ 

    
  
    for(var i=0;i<metGroup.length;i++){     
         
     if(metGroup[i].isTouching(balaGroup)){
          metGroup[i].destroy()
          balaGroup.destroyEach()
          score=score+1;
          } 
    }
   }


  
  enemy();

  drawSprites();
}

function enemy(){
  if(frameCount%50===0){

 
    meteorito = createSprite(windowWidth,random(200,600),40,40)

    meteorito.addImage(meteoritoImg)
    meteorito.scale = 0.15
    meteorito.velocityX = -3
    meteorito.debug= true
    meteorito.setCollider("rectangle",0,0,1300,400)
   
    meteorito.lifetime = 700
   metGroup.add(meteorito)
  }
  
}

function dead(){
  bala = createSprite(nave.x+50,nave.y,20,20)
  bala.addImage(balaImg)
  bala.scale = 0.1
  bala.velocityX = 5
  balaGroup.add(bala)
}
