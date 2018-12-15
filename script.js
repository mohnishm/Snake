

var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var w = 350;
var h = 350;
var score = 0;
var hiscore = 0;
var snake;
var snakeSize = 10;
var food;

var drawModule = (function () { 
  //Defines the snake design
  var bodySnake = function(x, y) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }
  //Draws the snake
  var drawSnake = function() {
    var length = 4;
    snake = [];
    for (var i = length-1; i>=0; i--) {
        snake.push({x:i, y:0});
    }  
  }
  //Defines the fruit design
  var fruit = function(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }
  //creates the fruit
  var createFood = function() {
    food = {
      x: Math.floor(Math.random() * 30),
      y: Math.floor(Math.random() * 30)
    }

    for (var i=0; i<snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;
    
      if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
        food.x = Math.floor(Math.random() * 30);
        food.y = Math.floor(Math.random() * 30);
      }
    }
  }
  //keeps the score
  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'black';
    ctx.font = "20px Helvetica";
    ctx.fillText(score_text, 10, 25);
  }
  //calculates the high score
  var highScore = function() {
    if (hiscore < score){
      hiscore = score;
    }
    var hi_score = "Hi-Score: " + hiscore;
    ctx.fillStyle = 'black';
    ctx.font = "20px Helvetica";
    ctx.fillText(hi_score, 230, 25);
  }
  //checks for collision with boundary
  var checkCollision = function(x, y, array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].x === x && array[i].y === y)
      return true;
    } 
    return false;
  }
  //paints the canvas
  var paint = function(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == 'right') { 
      snakeX++; }
    else if (direction == 'left') { 
      snakeX--; }
    else if (direction == 'up') { 
      snakeY--; 
    } else if(direction == 'down') { 
      snakeY++; }

    if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
        //restart game
        btn.removeAttribute('disabled', true);

        ctx.clearRect(0,0,w,h);
        gameloop = clearInterval(gameloop);
        //game over screen
        var game_over = "Game Over";
        ctx.fillStyle = 'black';
        ctx.font = "40px Helvetica";
        ctx.fillText(game_over, 75, 175);

        var final_score = "Score: " + score;
        ctx.fillText(final_score, 95, 220);
        if (hiscore < score){
          hiscore = score;
        }
        score = 0;

        var hiScore = "Hi-Score: " + hiscore;
        ctx.fillText(hiScore, 70, 265);

        return;          
      }
      
    if(snakeX == food.x && snakeY == food.y) {
      var tail = {x: snakeX, y: snakeY}; //Creates a new head
      score++;
        
      createFood(); //Create new food
      } else {
        var tail = snake.pop(); //pops out the last cell
        tail.x = snakeX; 
        tail.y = snakeY;
      }
      //The snake can now eat the food.
      snake.unshift(tail); //puts back the tail as the first cell

      for(var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y);
      } 
      
      fruit(food.x, food.y); 
      scoreText();
      highScore();
  }

  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 80);
      console.log(this)
  }

  return {init:init};
  }());

  (function (window, document, drawModule, undefined) {

    var btn = document.getElementById('btn');
    btn.addEventListener("click", function(){drawModule.init();});
    
    document.onkeydown = function(event) {

        keyCode = event.keyCode;

        switch(keyCode) {
        
        case 37: 
          if (direction != 'right') {
            direction = 'left';
          }
          console.log('left'); 
          break;

        case 39:
          if (direction != 'left') {
          direction = 'right';
          console.log('right');
          }
          break;

        case 38:
          if (direction != 'down') {
          direction = 'up';
          console.log('up');
          }
          break;

        case 40:
          if (direction != 'up') {
          direction = 'down';
          console.log('down');
          }
          break;
          }
      }
    })(window, document, drawModule);