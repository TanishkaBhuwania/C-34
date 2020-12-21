var hypnoticBall;
var database,position,hypnoticBallPosition

function setup(){
    //create data base abd save it
    database = firebase.database()
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //ref()is used to refer to a location inside the data base 
    hypnoticBallPosition = database.ref('ball/position')
    //on ()is a listner keeps listneind to the changes of the valus inside the data base,if the value changes call read position function 
    //if read position has some problem call show error
    hypnoticBallPosition.on('value',readPosition,showError)
}

function draw(){
    background("white");
    //draw the ball or write  to the data base only when posotion is available
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
   
}
//write the new posotion of the ball to the data base
//set()is used to set a new value inside the database
function writePosition(x,y){
   // ball.x = ball.x + x;
   database.ref ('ball/position').set({
       'x':position.x + x,
        'y':position.y + y
})
}
//read the position of the ball from the database
//val()is used to extract values from the data 
function readPosition(data){
position = data.val()
hypnoticBall.x = position.x
hypnoticBall.y = position.y
}

function showError(){
    console.log("error in reading the values")
}
