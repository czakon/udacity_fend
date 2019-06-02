/*
Todo List:
1. Add some more gems and see if we can get the score to increase.
*/
// Adapted from the Shuffle function in http://stackoverflow.com/a/2450976
function randomX() {
    return Math.random()*5;
}

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=101*x;
    this.y=83*y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Make the top bugs move a little faster so that the pattern randomizes.
    let speed = game.level*101/(1+this.y/83./4);
    let new_x = this.x+speed*dt;

    //Only update the parameters if there is no collision.
    if ((Math.abs(player.x - this.x)>=101/1.5)||(Math.abs(player.y - this.y)>=83/2)
    ) {
        if (new_x>101*5)
            {this.x=-101;
            }
            {this.x+=speed*dt;
            }
    } else {
        if (new_x<=101*5)
        {this.x+=speed*dt;
        }
        game.collision = true;
        game.gameOver = true;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is the game class
var Game = function() {

    this.collision = false;
    this.gameWon = false;
    this.gameOver = false;
    this.startTime = new Date().getTime();
    this.runTimer = true;
    this.level=0;

};

Game.prototype.reset = function() {
    this.collision = false;
    this.gameWon = false;
    this.gameOver = false;
    this.startTime = new Date().getTime();
    this.runTimer = true;
    this.level += 1;
    document.getElementById("level").innerHTML = 'Level: '+this.level;
}
// This is the player class
var Player = function() {

    this.sprite = 'images/char-cat-girl.png';
    this.x=101*2;
    this.y=83*5;

};

Player.prototype.reset = function() {
    this.x=101*2;
    this.y=83*5;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
Player.prototype.handleInput = function(e) {
    // Make sure that the player moves with the key strokes
    // and that it doesn't go over the edge.
    switch(e) {
        case 'left':
            this.x=Math.max(this.x-101,0);
            break;
        case 'right':
            this.x=Math.min(this.x+101,101*4);
            break;
        case 'up':
            this.y = Math.max(this.y-83,0);
            break;
        case 'down':
            this.y = Math.min(this.y+83,83*5);
            break;
    }
    if (this.y===0) {
        game.gameWon = true;
        game.gameOver = true;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(randomX(),0)
                  , new Enemy(randomX(),1)
                  , new Enemy(randomX(),2)
                  , new Enemy(randomX(),3)
                  , new Enemy(randomX(),4)];
var player = new Player();
var game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
document.addEventListener('keyup', function(e) {
    //Only update the players position if there are no collisions.
    if (!game.collision) {player.handleInput(allowedKeys[e.keyCode])};
});
