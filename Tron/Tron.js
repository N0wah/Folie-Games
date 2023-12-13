
const SCL = 5;

var player1, player2;

function setup() {
  createCanvas(1000, 1000);

  frameRate(10);
  

  player1 = new Bike(50 / SCL, height / 2 / SCL, 1, 0, color("#0000FF"));
  player2 = new Bike((width - 50) / SCL, height / 2 / SCL, -1, 0, color("#FF0000"));
}

function draw() {
  background(51);

	handlePlayers();
}


function handlePlayers() {


	player1.update();
	player2.update();


	player1.draw();
	player2.draw();


	if ((player1.collidesWith(player2.trail) && player2.collidesWith(player1.trail)) ||
		(player1.collidesWith(player1.trail) && player2.collidesWith(player2.trail)) ||
		(player1.collidesWithBounds() && player2.collidesWithBounds()))	{

		endGame("Draw!");
	} else if (player1.collidesWith(player2.trail) ||
		player1.collidesWithBounds() || player1.collidesWith(player1.trail)) {

		endGame("Red wins!");
	} else if (player2.collidesWith(player1.trail) ||
		player2.collidesWithBounds() || player2.collidesWith(player2.trail)) {

		endGame("Blue wins!");
	}
}

/*
 * player1 = Z, Q, S, & D
 * player2 = UP, LEFT, DOWN, & RIGHT
 */
function keyPressed() {

  switch (keyCode) {

    case 37:
      player2.setVelocity(createVector(-1, 0));
      break;

    case 38:
      player2.setVelocity(createVector(0, -1));
      break;

    case 39:
      player2.setVelocity(createVector(1, 0));
      break;

    case 40:
      player2.setVelocity(createVector(0, 1));
      break;

    case 81:
      player1.setVelocity(createVector(-1, 0));
      break;

    case 90:
      player1.setVelocity(createVector(0, -1));
      break;

    case 68:
      player1.setVelocity(createVector(1, 0));
      break;

    case 83:
      player1.setVelocity(createVector(0, 1));
      break;

  }
}

function endGame(winner) {

  noStroke();
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text(winner, width / 2, height / 2);
  noLoop();
}