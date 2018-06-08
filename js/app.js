// Enemies our player must avoid
// enemy constructor (Setting the Enemy initial location and speed)

let lives = 4
let level = 0
let score = 0
let allEnemies = []

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
  // which will ensure the game runs at the same speed for all computers.
  this.x += this.speed * dt
  // collision detection
  if (lives === 0) {
    gameOver()
  }
  else if (this.y === player.y && (this.x + 83) > player.x && (this.x) < (player.x + 83)) {
    // console.log('colision')
    document.querySelector('body').style.backgroundColor = '#FF4136'
    player.reset()
    setTimeout(function () {
      document.querySelector('body').style.backgroundColor = '#DDDDDD'
      document.querySelector('body').style.transition = 'all 1s ease-out 0.1s'
    }, 200)
    document.querySelector('body').style.removeProperty('transition')
    let list = document.getElementById('lives')
    list.removeChild(list.childNodes[0])
    list.removeChild(list.childNodes[0])
    lives--
    score = 0
    document.querySelector('#score').innerHTML = `score: ${score}`
  }
}

function GenerateEnemy () {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  let min = 2000
  let max = 5000
  let enemyYPosition = [56, 142, 228]
  var posY = enemyYPosition[Math.floor(Math.random() * enemyYPosition.length)]
  let enemy = new Enemy(-101, posY, Math.random() * 100 + 20 * level)
  allEnemies.push(enemy)
  if (level < 3) {
    setTimeout(GenerateEnemy, Math.random() * (max - min) + min)
  }
  else if (level >= 3 && level < 6) {
    min = 1000
    max = 3000
    setTimeout(GenerateEnemy, Math.random() * (max - min) + min)
  }
  else {
    min = 500
    max = 1000
    // generate aditional enemy to make game harder
    window.setInterval(function () {
      enemy = new Enemy(100, posY, Math.random() * 100)
    }, 2000)
    setTimeout(GenerateEnemy, Math.random() * (max - min) + min)
  }
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
  if (this.y === -30) {
    player.reset()
    level++
    score++
    document.querySelector('#level').innerHTML = `level: ${level}`
    document.querySelector('#score').innerHTML = `score: ${score}`
  }
}

Player.prototype.update = function (dt) {
  if (this.y < -30) {
    this.y = -30
  }
  if (this.y > 400) {
    this.y = 400
  }
  if (this.x < 0) {
    this.x = 0
  }
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

let player = new Player(200, 400)

function gameStart () {
  // generate 3 enemies on start
  let enemyStartPosition = [56, 142, 228]
  enemyStartPosition.forEach(function (posY) {
    let enemy = new Enemy(100, posY, Math.random() * 100)
    allEnemies.push(enemy)
  })
  // randomly generate enemies
  GenerateEnemy()

  document.getElementById('start-menu').style.display = 'none'
  document.getElementById('disable-game').style.display = 'none'
  document.getElementById('end-menu').style.display = 'none'
}

function gameOver () {
  document.getElementById('disable-game').style.display = 'block'
  document.getElementById('end-menu').style.display = 'block'

  document.getElementById('score__score').innerHTML = level

  let restartGame = document.getElementById('end-menu__restart')
  restartGame.addEventListener('click', gameRestart)
}

function gameRestart () {
  document.location.reload()
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let startGame = document.getElementById('start-menu__start')
startGame.addEventListener('click', gameStart)

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
