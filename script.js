var cursorPosition = [0,0];

function getCursor(event){
    let x = event.clientX;
    let y = event.clientY;
    cursorPosition = [x,y];
}

setInterval(follow_cursor, 1);

function follow_cursor(){
    let square0 = document.getElementById("square0");
    if (square0){
        square0Position = [parseFloat(square0.style.left),parseFloat(square0.style.top)];
        look_at(square0,square0Position,cursorPosition);
        square0.style.left = (square0Position[0]+cursorPosition[0])/2+"px";
        square0.style.top = (square0Position[1]+cursorPosition[1])/2+"px";
    };

    let square1 = document.getElementById("square1");
    if (square1){
        square1Position = [parseFloat(square1.style.left),parseFloat(square1.style.top)];
        look_at(square1,square1Position,square0Position);
        square0ToSquare1 = Math.sqrt(Math.pow(square1Position[0]-square0Position[0],2)+Math.pow(square1Position[1]-square0Position[1],2));
        square1.style.left = square0Position[0]+(square1Position[0]-square0Position[0])/square0ToSquare1*50+"px";
        square1.style.top = square0Position[1]+(square1Position[1]-square0Position[1])/square0ToSquare1*50+"px";
    };

    let square2 = document.getElementById("square2");
    if (square2){
        square2Position = [parseFloat(square2.style.left),parseFloat(square2.style.top)];
        look_at(square2,square2Position,square1Position);
        square1ToSquare2 = Math.sqrt(Math.pow(square2Position[0]-square1Position[0],2)+Math.pow(square2Position[1]-square1Position[1],2));
        square2.style.left = square1Position[0]+(square2Position[0]-square1Position[0])/square1ToSquare2*50+"px";
        square2.style.top = square1Position[1]+(square2Position[1]-square1Position[1])/square1ToSquare2*50+"px";
    };

    let square3 = document.getElementById("square3");
    if (square3){
        square3Position = [parseFloat(square3.style.left),parseFloat(square3.style.top)];
        look_at(square3,square3Position,square2Position);
        square2ToSquare3 = Math.sqrt(Math.pow(square3Position[0]-square2Position[0],2)+Math.pow(square3Position[1]-square2Position[1],2));
        square3.style.left = square2Position[0]+(square3Position[0]-square2Position[0])/square2ToSquare3*50+"px";
        square3.style.top = square2Position[1]+(square3Position[1]-square2Position[1])/square2ToSquare3*50+"px";
    };
}

function look_at(element,position,target){
    element.style.rotate = Math.atan2(target[1]-position[1],target[0]-position[0])+"rad";
}