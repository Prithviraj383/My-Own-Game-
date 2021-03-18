var ufo,rocket,bullet,space;
var ufo1Image,ufo2Image,hugeSpaceshipImage,rocketImage,bulletImage,spaceImage;
var rand;
var bg2;
var bg3;
var ufoGroup,bulletGroup;
var gameState="Start";
var gameState="END";
var score=0;
var timer=0;

function preload(){

    ufo1Image=loadImage("ufo1.png");
    ufo2Image=loadImage("ufo2.png");
    rocketImage=loadImage("Rocket.png");
    hugeSpaceshipImage=loadImage("hugeufo.png");
    bulletImage=loadImage("bullet.png");
    spaceImage=loadImage("Space1.png");
    bg2=loadImage("StartPage.png");
    bg3=loadImage("bg3.jpeg");
}

function setup(){

    createCanvas(displayWidth,displayHeight);



    rocket=createSprite(displayWidth/2,displayHeight-100,0,0);
    rocket.addImage(rocketImage);
    rocket.scale=.1;


    ufoGroup=new Group();
    bulletGroup=new Group();

}

function draw(){


    if(gameState==="Start"){
        background(bg2);
        score=0;
        textSize(30);
        fill("orange");
        text("PRESS SPACE TO START THE GAME",displayWidth/2-270,displayHeight/2+200);
        if(keyDown("space")){
            gameState="PLAY";
        }
    }

    
    else if(gameState==="PLAY"){

        background(spaceImage);
        textSize(30);
        fill("white");
        text("Score:"+score,200,200);
        timer=setInterval(function(){timer=timer+1},1000);
        text("TimeLimit:"+timer,400,200);
        console.log(score);

        if(timer<2000 && score>5){
            gameState="END";
        }
        if(timer>2000&&score<5){
            gameState="Lose";
        }
    if(ufoGroup.isTouching(bullet)){
        score=score+3;
        ufoGroup.destroyEach();
        bullet.destroy();
    }

    if(keyDown("space")){
        var bullet_shoot=Bullet();
        bullet_shoot.addImage(bulletImage);
        bullet.x=rocket.x;
        bullet.y=rocket.y;
    }

    if(keyDown(RIGHT_ARROW)){
        rocket.x=rocket.x+4;
    }

    if(keyDown(LEFT_ARROW)){
        rocket.x=rocket.x-4;
    }
    console.log(frameCount);
    console.log(rand);

    spawnUfos();
    drawSprites();
}
else if(gameState==="END"){
    background(bg3);
    fill("white");
    textSize(30);
    text("Score:"+score,200,200);

    textSize(100);
    fill("white");
    text("YOU WIN",displayWidth/2-200,displayHeight/2);
    fill("pink");
    textSize(50);
    text("Press R to Restart",displayWidth/2-165,displayHeight/2+80);
    if(keyDown("r")){
        gameState="Start";
    }
}
else if(gameState==="Lose"){
    background(bg3);
    fill("white");
    textSize(30);
    text("Score:"+score,200,200);

    textSize(100);
    fill("white");
    text("YOU LOST",displayWidth/2-200,displayHeight/2);
    fill("pink");
    textSize(50);
    text("Press R to Restart",displayWidth/2-165,displayHeight/2+80);
    if(keyDown("r")){
        gameState="Start";
    }
}
}
function Bullet(){
    bullet=createSprite(displayWidth/2,displayHeight-100,0,0);
    bullet.scale=.3;
    bullet.velocityY=-2;
    bulletGroup.add(bullet);
    return bullet;
}



function spawnUfos(){
    if(frameCount%80===0){
    ufo=createSprite(random(400,1600),displayHeight/100,0,0);

     rand=Math.round(random(1,3));

    switch(rand){
        case 1:ufo.addImage(ufo1Image);
        break;

        case 2:ufo.addImage(ufo2Image);
        break;

        case 3:ufo.addImage(hugeSpaceshipImage);
        break;

        default:break;
    }
    ufo.velocityY=(3+score/5);
    ufo.scale=.3;
    ufoGroup.add(ufo);
    }
}