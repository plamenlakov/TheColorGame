function getRandomInt(max) { 
    return Math.floor(Math.random() * Math.floor(max));
} 
function getRandomColor() {     //Get a random color string using getRandomInt() function
    return "rgb(" + getRandomInt(255) + ", " + getRandomInt(255) + ", " + getRandomInt(255) + ")"
}
function setSquaresColor() {     //Set random colors to all squares using getRandomColor() function
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = getRandomColor();
    }
}
function init(x) {
    var mode = 0;
    if(x === 3){ mode = x}; //if x = 3 the answer square is one of the first three
    setSquaresColor(); 
    pickedColor = squares[getRandomInt(squares.length - 1 - mode)].style.backgroundColor;  //Pick one random color as answer
    document.querySelector("#guessDisplay").textContent = pickedColor;  //Display the picked color in rgb(x, x, x) format
    document.querySelector("h2").style.backgroundColor = "#303F9F"; //When game is reset the h2 background is switched to default
    resetButton.textContent = "RESET";
    for(var i = 0; i < squares.length; i++){ 
        squares[i].style.opacity = 1;   //When game is reset all squares opacity is turned back on
    }
}

var squares = document.getElementsByClassName("square"); //Get the squares
var resetButton = document.getElementById("reset"); //Get the reset button
var easyButton = document.getElementById("easy"); //Get the easy mode button
var hardButton = document.getElementById("hard"); //Get the hard mode button
var pickedColor; //Define color variable

init(); //Initialize the game

resetButton.addEventListener("click", function(){
    if(easyButton.classList.contains("selected")){
        init(3);
    } else {
        init(); //Reset button re-initializes the game
        for(var i = 3; i < squares.length; i++){
            squares[i].style.display = "initial";
        }
    }
});

easyButton.addEventListener("click", function(){
    init(3);
    this.classList.add("selected");
    hardButton.classList.remove("selected");
    for(var i = 3; i < squares.length; i++){
        squares[i].style.display = "none";
    }
});

hardButton.addEventListener("click", function(){
    init();
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    for(var i = 3; i < squares.length; i++){
        squares[i].style.display = "initial";
    }
});

for(var i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(){
        if(this.style.backgroundColor === pickedColor){
            for(var j = 0; j < squares.length; j++){
                squares[j].style.backgroundColor = pickedColor; //If answer is right make all squares the picked color
            }
            document.querySelector("h2").style.backgroundColor = pickedColor;   //If answer is right make h2 background the picked color
            resetButton.textContent = "PLAY AGAIN?" //If answer is right turn reset button to play again
        } else {
            this.style.opacity = 0; //If answer is right make the square dissapear
        }
    });
}