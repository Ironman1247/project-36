var dog, dogImg, happyDog, database, food, foodStock;
var feed, addFood, DogName;
var fedTime, lastFed;
var foodObj;
let input, button, greeting, NameQ, nthg ;

function preload(){
    dogImg = loadImage("sprites/Dog.png");
    happyDog = loadImage("sprites/happydog.png");
}

function setup(){
    database = firebase.database();
    createCanvas(500, 500);

    foodObj = new FoodClass();
    foodStock = database.ref("Food");
    foodStock.on("value",readStock);

    dog = createSprite(350,320,150,150);
    dog.addImage(dogImg);
    dog.scale = 0.15;

    feed = createButton("Feed the Dog");
    feed.position(360, 565);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(460, 565);
    addFood.mousePressed(addFoods);

    /* 
    DogName = createButton("DogName");
    DogName.position(500,555);

    let NameQ = createElement('h4', "Enter Your Pet's Name There ||>>~");
    NameQ.position(460, 475);

    let inp  = createInput();
    inp.position(650, 555);
    inp.size(542,25);
    if(inp.value === null){
        
    NameQ.value("Hi " + inp + "Time To Feed |!+>:~-");
    inp.value('');
    inp.size(0, 0);
    inp.position(-10, -10); */
    
  nthg = []; 

  input = createInput();
  input.position(540, 565);
  input.size(220,15);

  button = createButton('submit');
  button.position(input.x + input.width + 10, 565);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  greeting.position(450, 490);

  textAlign(CENTER);
  textSize(50);
  

  for (var i = 5; i < 500; i=i+10) 
  {
  
  var dot = createSprite(i, 5, 3, 3);
  dot.shapeColor = "White";
  
  }
  for (var i = 5; i < 500; i=i+10) 
  {
  
  var dot1 = createSprite(i, 495, 3, 3);
  dot1.shapeColor = "White";
  
  }
  for (var i = 5; i < 500; i=i+10) 
  {
  
  var dot1 = createSprite(495,i, 3, 3);
  dot1.shapeColor = "White";
  
  }
  for (var i = 5; i < 500; i=i+10) 
  {
  
  var dot1 = createSprite(5,i, 3, 3);
  dot1.shapeColor = "White";
  
  }

}

function  greet(){

    NameQ = input.value();
    if(NameQ === nthg){
        greeting.html = nthg;
        console.log("Hi Friends");   
    }else{
    greeting.html('hello ' + NameQ + ' !');
    input.value('');
    }
}
function draw(){
    background(265, 155, 0);

    fedTime = database.ref("FeedTime");
    fedTime.on("value", function(data){
        lastFed = data.val();
    })

    fill(255);
    textSize(20);
    if(lastFed >= 12){
        text("Last Fed : " + lastFed % 12 + "PM", 125 , 45);
    }else if (lastFed == 0){
        text("Last Fed : 12 AM", 125, 45);
    }else{
        text("Last Fed : " + lastFed + "AM", 125 , 45);
    }

    foodObj.display();

//    greet();

    drawSprites();
}

function readStock(data)
{
    food = data.val();
    console.log(food);
    foodObj.updateFoodStock(food);
}

function feedDog()
{
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock() -1);
    database.ref('/').update({
        Food: foodObj.getFoodStock(),
        FeedTime: hour()
    })
}

function addFoods()
{
    food = food + 1 ;
    database.ref('/').update({
        Food: food
    })
}