(function () {
  var score;
  var squaresPlayed;
  var currentSquareIndex;
  var gameOverEl;
  var scoreEl;
  var gameSquares = ['green-square', 'red-square', 'blue-square', 'yellow-square'];

  function addClickListeners() {
    gameSquares.map(function(square) {
      document.getElementById(square).addEventListener('click', clickListener);
    });
  }

  function removeClickListeners() {
    gameSquares.map(function(square) {
      document.getElementById(square).removeEventListener('click', clickListener);
    });
  }

  function playSquare(square) {
    var squareEl = document.getElementById(square);
    
    squareEl.classList.remove('not-playing');
    squareEl.classList.add('playing');
  }

  function clickListener(event) {
    this.classList.add('square-active');

    if(event.target.id === squaresPlayed[currentSquareIndex]) {
      currentSquareIndex++;

      if(currentSquareIndex >= squaresPlayed.length) {
        updateScore();
        setTimeout(function() {
          gameLoop();
        }, 1500);
      }
    } else {
      removeClickListeners();
      gameOverEl.classList.add('game-over');
    }
  }

  function stopPlaying(event) {
    this.classList.remove('playing');
    this.classList.remove('square-active');
    this.classList.add('not-playing');
  }

  function updateScore() {
    score += 100;
    scoreEl.innerHTML = 'Score: ' + score;
  }

  function gameLoop() {
    currentSquareIndex = 0;
    removeClickListeners();

    var nextSquare = gameSquares[Math.floor(Math.random() * gameSquares.length)];
    squaresPlayed.push(nextSquare);
    
    for(var i=0; i<squaresPlayed.length; i++) {
      (function(index, currentSquare) {
        setTimeout(function() {
          playSquare(currentSquare);
          
          if(index+1 === squaresPlayed.length) {
            addClickListeners();
          }
        }, 750*index);
      })(i, squaresPlayed[i]);
    }
  }

  function startGame() {
    score = 0;
    squaresPlayed = [];
    gameOverEl.classList.remove('game-over');
    scoreEl.innerHTML = 'Score: ' + score;
    gameLoop();
  }

  function initializeGame() {
    gameOverEl = document.getElementById('game-over');
    scoreEl = document.getElementById('score');

    gameSquares.map(function(square) {
      document.getElementById(square).addEventListener('transitionend', stopPlaying);
    });

    document.getElementById('start-button').addEventListener('click', function(event) { startGame(); });
  }

  initializeGame();
})();