"use strict";
const playBoard = document.getElementById("play-board");
const scoreElement = document.getElementById("Score");
const highScoreElement = document.getElementById("hScore");

let foodX, foodY;
let snakeX = 6, snakeY = 5;
let snakebody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false;
let score = 0;
let setIntervalId ;

let highScore = localStorage.getItem("hScore") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changementDirection = (e) => {
    if (e.key === "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }else if (e.key === "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }else if (e.key === "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }else if (e.key === "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }

}


const changeFoodPosition = () => {

    foodX = Math.floor(Math.random()*15)+1;
    foodY = Math.floor(Math.random()*15)+1;
}

const handleGameover = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Appuyer sur OK pour recommencer");
    location.reload();
}


const initGame = () => {

    if(gameOver) return  handleGameover();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakebody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("hScore", highScore);

        scoreElement.innerText = `Score: ${score}`;

        highScoreElement.innerText = `High Score: ${highScore}`;
        }

    for (let i = snakebody.length - 1; i>0; i--){
        snakebody[i] = snakebody[i- 1];
    }

    snakebody[0]= [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX >= 16 || snakeY <= 0 || snakeY >= 16){
        gameOver = true;
    }
    
    for (let i = 0; i< snakebody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if (i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
            gameOver = true;
        }
       }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changementDirection);