const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 32;


speedUp = false;
const grass = new Image();
grass.src = "img/grass.png";

const appleImg = new Image();
appleImg.src = "img/apple.png";

const mineImg = new Image();
mineImg.src = "img/mine.png";

const mushroomImg = new Image();
mushroomImg.src = "img/mushroom.png";



let end = new Audio();
let eat = new Audio();
let miau = new Audio();



eat.src = "audio/eat.mp3";
miau.src = "audio/miau.mp3";
end.src = "audio/end.mp3";



let snake = [];


snake[0] = {
    x : 9 * box,
    y : 10 * box

};



let mine = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
let apple = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
let mushroom = {
    x : Math.floor(Math.random()*17*1) * box,
    y : Math.floor(Math.random()*15+3) * box
}




let score = 0;
let speed = 1;
let basespeed = 100;
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
                d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";

    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";

    }else if(key == 40 && d != "UP"){
        d = "DOWN";

    }
}


function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}



function draw(){

    ctx.drawImage(grass,0,0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "black" : "orange";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
     }

    ctx.drawImage(mineImg, mine.x, mine.y);
    ctx.drawImage(appleImg, apple.x, apple.y);

    setInterval(function(){
    ctx.drawImage(mushroomImg, mushroom.x, mushroom.y);
   },30000);



    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

  
    if(snakeX == apple.x && snakeY == apple.y){
        score++;
        speedUp = false;
        eat.play();
        apple = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    
    }else{
    
        snake.pop();
    }
    if (score % 5 == 0 && score!=0 && !speedUp) {
        console.log(speed);
        speed *= 1.25;
        speedUp = true;
        if (score >= 100) return
        let game= setInterval(draw,basespeed/speed);
    }


     if(snakeX == mine.x && snakeY == mine.y){
        clearInterval(game);
        miau.play();
        window.setTimeout(function(){
         location.reload();
        } ,1000);
    }

       if(snakeX == mushroom.x && snakeY == mushroom.y){
        clearInterval(game);
        end.play();
        window.setTimeout(function(){
         location.reload();
        } ,1000);
    }




    let newHead = {
        x : snakeX,
        y : snakeY
    }



    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        end.play();
        window.setTimeout(function(){
         location.reload();
        } ,1000);

    }




    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score,2*box,2.2*box);
}



    let game = setInterval(draw, basespeed);
