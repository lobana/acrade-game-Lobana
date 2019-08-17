//Score rest
  let score = 0;

   document.getElementById('score').innerHTML = score;

// Enemies rest
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()* 5) + 1);
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  this.x += this.speed;
  if(this.x > 505) {
    this.x = -100;
  }
};

Enemy.prototype.reset = function(){ //This resets the bugs 
  this.x = x;
  this.speed = Math.floor((Math.random()* 50) + 5);
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player rest
var Player = function(x, y) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 400;
};
//This checks for the collision between enemy and player and also alerts them if they reach the water and resets the game.
Player.prototype.update = function() {
  this.checkCollisions();

  if(this.y < 20){
    
   score += 10;
        
          updateView('you win! score: ' + score);
    this.reset();
  }
};
//Update funktion
 function updateView(string) {
    document.getElementById('score').innerHTML = score;
    
    
    if(string) { M.toast({html: string}); }
  }

//Draws the the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player movement keys
Player.prototype.handleInput = function(keyPress){
  if(keyPress === 'left' && this.x > 0){
    this.x -= 100;
  } else if (keyPress === 'right' && this.x < 400) {
    this.x += 100;
  } else if(keyPress === 'up' && this.y > 0){
    this.y -= 85;
  } else if(keyPress === 'down' && this.y < 380){
    this.y += 80;
  }
};

//This checks for collisions between player and allEnemies.
Player.prototype.checkCollisions = function() {
  for (i = 0; i < allEnemies.length; i++) {
    if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
      this.reset();

    }

  }
};

//THis resets the player if there is a collission or if the game is won
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(-100,60);
var bug2 = new Enemy(-50,145);
var bug3 = new Enemy(-50,225);
var bug4 = new Enemy(-50,225);

var allEnemies = [bug1, bug2, bug3,bug4];

var player = new Player(200,300);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
