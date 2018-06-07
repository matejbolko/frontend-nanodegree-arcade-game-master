// Enemies our player must avoid

// enemy constructor (Setting the Enemy initial location and speed)
var Enemy = function (x, y, speed) {
  this.x = x
  this.y = y
  this.speed = speed
  this.sprite = 'images/enemy-bug.png'
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt
  // console.log('x-axis: ' + this.x)
  // console.log('y-axis: ' + this.y)
  // console.log('player-x-axis: ' + player.x)
  // console.log('player-y-axis: ' + player.y)
  // enemy-bug width == 101px

  // colision detection
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  window.ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y)
}

// player constructor
var Player = function (x, y) {
  this.x = x
  this.y = y
  this.sprite = 'images/char-boy.png'
}

// keyboard handling and set bounderies
Player.prototype.handleInput = function (keyPress) {
  if (keyPress === 'left' && this.x > 0) {
    this.x -= 101 // 505/5
  }
  if (keyPress === 'right' && this.x < 400) {
    this.x += 101
  }
  if (keyPress === 'up' && this.y > 0) {
    this.y -= 86 // 606/7
  }
  if (keyPress === 'down' && this.y < 400) {
    this.y += 86
  }
  // finishline - back to start
  if (this.y < 0) {
    setTimeout(function () {
      player.reset()
    }, 500)
  }
}

Player.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
}

Player.prototype.render = function () {
  window.ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y)
}

// put player back to start
Player.prototype.reset = function () {
  this.x = 200
  this.y = 400
  // new Player(200, 400);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 400)
let allEnemies = []
// Player y possibilities (step 86) - 56, 142, 228, 314, 400
allEnemies.push(new Enemy(10, 56, 10))
// allEnemies.push(new Enemy(10, 142, 30))
// allEnemies.push(new Enemy(10, 228, 90))

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }
  player.handleInput(allowedKeys[e.keyCode])
})
