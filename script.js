var cursorPosition = [0, 0];
var squaresPosition = [];
const minAngle = 75;
const bodyRange = 50;
var squareNumber = 20;

var squares = [];
for ( let i=0; i<squareNumber; i++) {
    let square = document.createElement("div");
    square.style.position = "absolute";
    square.style.height = "10px";
    square.style.width = "10px";
    square.style.top = "0";
    square.style.left = "0";
    square.style.backgroundColor = "white";
    square.id = `square${i}`;
    body.appendChild(square);
    squares.push(square);
};

document.addEventListener("mousemove", getCursor);

function getCursor(e) {
    let x = e.clientX;
    let y = e.clientY;
    cursorPosition = [x, y];
}

setInterval(follow_cursor, 1);

function follow_cursor() {
    if (squares) {
        squares.forEach(function updateSquare(element, index) {
            squaresPosition[index] = [parseFloat(element.style.left), parseFloat(element.style.top)];
            if (index == 0) {
                look_at(element, squaresPosition[index], cursorPosition)
                element.style.left = cursorPosition[0] + "px";
                element.style.top = cursorPosition[1] + "px";
            } else {
                look_at(element, squaresPosition[index], squaresPosition[index - 1])
                let lenght = Math.sqrt((squaresPosition[index][0] - squaresPosition[index - 1][0])**2 + ((squaresPosition[index][1] - squaresPosition[index - 1][1])**2));
                element.style.left = squaresPosition[index - 1][0] + (squaresPosition[index][0] - squaresPosition[index - 1][0]) / lenght * bodyRange + "px";
                element.style.top = squaresPosition[index - 1][1] + (squaresPosition[index][1] - squaresPosition[index - 1][1]) / lenght * bodyRange + "px";

                if (squaresPosition[index + 1]) {
                    angleConstraint(index)
                }
            }
        })
    }
}

function angleConstraint(index) {
    let vectorA = [squaresPosition[index-1][0]-squaresPosition[index][0], squaresPosition[index-1][1]-squaresPosition[index][1]];
    let normA = Math.sqrt(vectorA[0]**2 + vectorA[1]**2);
    let vectorB = [squaresPosition[index + 1][0] - squaresPosition[index][0], squaresPosition[index+1][1] - squaresPosition[index][1]];
    let normB = Math.sqrt(vectorB[0]**2 + vectorB[1]**2);
    let vectorAB = [squaresPosition[index + 1][0] - squaresPosition[index - 1][0], squaresPosition[index+1][1] - squaresPosition[index-1][1]];
    let normAB = Math.sqrt(vectorAB[0]**2 + vectorAB[1]**2);
    let preAcos = (1 / 2 * (normAB**2 - normA**2 - normB**2) / (normA * normB));
    let currentAngle = (preAcos+1)*90;
    if (currentAngle < minAngle) {
        let deltaAngle = (minAngle-currentAngle) *(Math.PI/180);
        deltaAngle *= Math.sign(vectorA[0]*vectorB[1]-vectorA[1]*vectorB[0]);
        let newVectorB = [Math.cos(deltaAngle)*vectorB[0]+(-Math.sin(deltaAngle))*vectorB[1] , Math.sin(deltaAngle)*vectorB[0]+(Math.cos(deltaAngle))*vectorB[1]];
        squares[index+1].style.left = squaresPosition[index][0]+newVectorB[0]+"px";
        squares[index+1].style.top = squaresPosition[index][1]+newVectorB[1]+"px";
    }
}

function look_at(element, position, target) {
    element.style.rotate = Math.atan2(target[1] - position[1], target[0] - position[0]) + "rad";
}

function grow() {
    console.log("growing");
    let square = document.createElement("div");
    square.style.position = "absolute";
    square.style.height = "10px";
    square.style.width = "10px";
    square.style.top = "0";
    square.style.left = "0";
    square.style.backgroundColor = "white";
    square.id = `square${squareNumber}`;
    body.appendChild(square);
    squares.push(square);
    squareNumber++;
}

//setInterval(spawn_apple, 2000);

function spawn_apple() {
    console.log("test");
    let apple = document.createElement("div");
    apple.style.position = "absolute";
    apple.style.height = "20px";
    apple.style.width = "20px";
    apple.style.top = Math.random()*window.innerHeight+"px";
    apple.style.left = Math.random()*window.innerWidth+"px";
    apple.style.backgroundColor = "red";
    body.appendChild(apple);
}