var cursorPosition = [0, 0];
var squaresPosition = [];
const constraintAngle = 45;

document.addEventListener("mousemove", getCursor);

function getCursor(e) {
    let x = e.clientX;
    let y = e.clientY;
    cursorPosition = [x, y];
}


setInterval(follow_cursor, 1);


function follow_cursor() {
    squares = [square0, square1, square2, square3, square4, square5];
    if (squares) {
        squares.forEach(function updateSquare(element, index) {
            squaresPosition[index] = [parseFloat(element.style.left), parseFloat(element.style.top)];
            if (index == 0) {
                look_at(element, squaresPosition[index], cursorPosition)
                element.style.left = cursorPosition[0]+"px";
                element.style.top = cursorPosition[1]+"px";
            } else {
                look_at(element, squaresPosition[index], squaresPosition[index - 1])
                lenght = Math.sqrt(Math.pow(squaresPosition[index][0] - squaresPosition[index - 1][0], 2) + (Math.pow(squaresPosition[index][1] - squaresPosition[index - 1][1], 2)));
                element.style.left = squaresPosition[index - 1][0] + (squaresPosition[index][0] - squaresPosition[index - 1][0]) / lenght * 50 + "px";
                element.style.top = squaresPosition[index - 1][1] + (squaresPosition[index][1] - squaresPosition[index - 1][1]) / lenght * 50 + "px";
            
                if (squaresPosition[index+1]) {
                    currentAngle = getAngle(index)
                    if (currentAngle > constraintAngle){
                        
                    }
                }
            }
        })
    }
}

function getAngle(index){
    vectorA = [squaresPosition[index-1][0]-squaresPosition[index][0],squaresPosition[index-1][1]-squaresPosition[index][1]];
    normA = Math.sqrt(Math.pow(vectorA[0],2)+Math.pow(vectorA[1],2));
    vectorB = [squaresPosition[index+1][0]-squaresPosition[index][0],squaresPosition[index+1][1]-squaresPosition[index][1]];
    normB = Math.sqrt(Math.pow(vectorB[0],2)+Math.pow(vectorB[1],2));
    vectorAB = [squaresPosition[index-1][0]-squaresPosition[index+1][0],squaresPosition[index-1][1]-squaresPosition[index+1][1]];
    normAB = Math.sqrt(Math.pow(vectorAB[0],2)+Math.pow(vectorAB[1],2));
    preAcos = (1/2*(Math.pow(normAB,2)-Math.pow(normA,2)-Math.pow(normB,2))/(normA*normB));
    currentAngle = Math.acos(preAcos)*(180/Math.PI);
    console.log(currentAngle);
    return currentAngle;
}


function look_at(element, position, target) {
    element.style.rotate = Math.atan2(target[1] - position[1], target[0] - position[0]) + "rad";
}
