"use strict";
const playBoard = document.querySelector(".play-board"); //constant qui recupere "playBoard"
const scoreElement = document.querySelector(".score"); //constant qui recupere "score"
const highScoreElement = document.querySelector(".hScore");//constant qui recupere "hScore"

let foodX, foodY; // declaration des variables pour la pomme
let snakeX = 6, snakeY = 5; // declaration des variables pour le snake
let snakebody = []; 
let velocityX = 0, velocityY = 0; // deplacement du snake
let gameOver = false; 
let score = 0;
let setIntervalId ;

let highScore = localStorage.getItem("hScore") || 0;    // recuperation de la valeur en local 
highScoreElement.innerText = `High Score: ${highScore}`; // remplacer le high score html par le js

const changementDirection = (e) => {  // fonction pour les changements de direction
    if (e.key === "ArrowUp"){
        if(velocityY == 1)   // pour empecher de ce déplacer à l'opposer 
            return;
        velocityX = 0;
        velocityY = -1;   // déplacement vers le haut
    }else if (e.key === "ArrowDown"){
        if(velocityY == -1) // pour empecher de ce déplacer à l'opposer 
            return;
        velocityX = 0;
        velocityY = 1; // déplacement vers le bas
    }else if (e.key === "ArrowLeft"){
        if(velocityX == 1) // pour empecher de ce déplacer à l'opposer 
        return
        velocityX = -1; // déplacement vers la gauche
        velocityY = 0;
    }else if (e.key === "ArrowRight"){
        if(velocityX == -1) // pour empecher de ce déplacer à l'opposer 
        return
        velocityX = 1; // déplacement vers la droite
        velocityY = 0;
    }

}


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*16)+1;
    foodY = Math.floor(Math.random()*16)+1;
    for (let i = 0; i < snakebody.length ; i++) {
        if(foodX === snakebody[i][0] && foodY === snakebody[i][1]){       
        foodX = Math.floor(Math.random()*16)+1;
        foodY = Math.floor(Math.random()*16)+1;
        }
    }
}

const handleGameover = () => {   //fonction game over
    clearInterval(setIntervalId);
    alert("Game Over! Appuyer sur OK pour recommencer"); // pop up alerte
    location.reload(); // recharge de la page
}


const initGame = () => { // initation de du jeu

    if(gameOver) return  handleGameover();   // si gameover = true donc ça exécute la fontion handleGameover

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // cela rajoute un div "class food" dans le html

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

    if(snakeX <= 0 || snakeX >=16 || snakeY <= 0 || snakeY >= 16){
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


foodX = Math.floor(Math.random()*15)+1;
foodY = Math.floor(Math.random()*15)+1;
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changementDirection);