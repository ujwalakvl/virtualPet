//Create variables here
var dog, happyDog, database, foodStock, foodS;
var dogImg, happyDogImg;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("brown");
  stroke("green");
  text("Food Remaining: " +foodS,170,200)
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 100,50);
}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

