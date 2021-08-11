import Grid from './grid.js';
import Ball from './ball.js';
import ControlBar from './controlBar.js';
import TopBar from './topBar.js';

let grid = null;
let player = 1;
let controlBar = null;
let gameOver = false;
let topBar = null;
let winStart = null;
let winEnd = null;

window.addEventListener('load', () => {
  topBar = new TopBar();
  topBar.play(1);
  grid = new Grid();
  grid.setup();

  controlBar = new ControlBar();
  controlBar.play(1);

  const allBallPositions = document.getElementsByClassName('ball-position-container');
  for (let i = 0; i < allBallPositions.length; i++) {
    allBallPositions[i].addEventListener('click', (e) => {
      dropBall(allBallPositions[i]);
    });
  }

  document.getElementById('restartButton').addEventListener('click', (e) => {
    restart();
    document.getElementById('restartButton').style.visibility = 'hidden';
  });

});

function dropBall(ballPosition) {
  if (gameOver) return;
  const column = parseInt(ballPosition.getAttribute('column'), 10);
  if (grid.ballPositions[0][column].player > 0) {
    topBar.play(player, true);
    return;
  }

  createNewBall(player, column);
  player = (player === 1 ? 2 : 1);
  if (!gameOver) {
    controlBar.play(player);

    topBar.play(player);
    checkEndOfGame();  
  }
}

function createNewBall(player, column) {
  let row = -1;

  for (let r = 5; r > -1; r--) {
    const bp = grid.ballPositions[r][column];
    if (bp.player === 0) {
      const ball = new Ball(bp, player);
      window.setTimeout(function() {
        ball.element.style.top = '0';
        ball.element.style.opacity = '1';
      }, 10);
      bp.player = player;
      row = r;
      break;
    }
  }

  if (row > -1) {
    if (checkWinner(player, row, column)) {
      controlBar.gameOver();
      topBar.gameOver(player);
      gameOver = true;
      
      window.setTimeout(function() {
        drawWinnerLine();
      }, 10);
    }
  };
  
}

function drawWinnerLine() {
  const svgLayer = document.getElementById('svgLayer');
  svgLayer.style.visibility = 'visible';
  
  const parentRect = winStart.container.parentNode.getBoundingClientRect();
  const rectStart = winStart.container.getBoundingClientRect();
  const rectEnd = winEnd.container.getBoundingClientRect();
  const shift = rectStart.width / 2.0;
  
  const lineStartX = rectStart.left - parentRect.left + shift;
  const lineStartY = rectStart.top - parentRect.top + shift;
  const lineEndX = rectEnd.left - parentRect.left + shift;
  const lineEndY = rectEnd.top - parentRect.top + shift;
  
  // const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  // line.setAttribute('x1', lineStartX);
  // line.setAttribute('y1', lineStartY);
  // line.setAttribute('x2', lineEndX);
  // line.setAttribute('y2', lineEndY);
  // line.setAttribute('stroke', 'black');
  // line.setAttribute('stroke-width', '5');
  
  // svgLayer.innerHTML = '';
  // svgLayer.appendChild(line);

  svgLayer.innerHTML = `<line class="winLine" x1="${lineStartX}" y1="${lineStartY}" x2="${lineEndX}" y2="${lineEndY}" />`;

}

function clearWinnerLine() {

  document.getElementById('svgLayer').style.visibility = 'hidden';
}

function restart() {
  clearWinnerLine();
  var allBalls = document.getElementsByClassName('ball');
  while(allBalls.length > 0){
    allBalls[0].parentNode.removeChild(allBalls[0]);
  }

  document.getElementById('restartButton').style.visibility = 'hidden';

  grid.restart();
  topBar.play(player);
  controlBar.play(player);
  gameOver = false;
}

function checkWinner(player, row, column) {
  let playerBalls = 1;

  if (checkWinnerInColumn(player, playerBalls, row, column)) {
    return true;
  }
  if (checkWinnerInRow(player, playerBalls, row, column)) {
    return true;
  }
  if (checkWinnerInDiagonalLeft(player, playerBalls, row, column)) {
    return true;
  }
  if (checkWinnerInDiagonalRight(player, playerBalls, row, column)) {
    return true;
  }
  return false;
}

function checkWinnerInColumn(player, pballs, row, column) {
  winStart = grid.ballPositions[row][column];

  let r = row + 1;
  while (r < 6) {
    const ballContainer = grid.ballPositions[r][column];
    if (ballContainer.player == player) {
      pballs += 1;
      winEnd = ballContainer;
    } else {
      break;
    }
    r += 1;
  }

  return pballs >= 4;
}

function checkWinnerInRow(player, pballs, row, column) {
  winStart = grid.ballPositions[row][column];

  let c = column - 1;
  while (c > -1) {
    const ballContainer = grid.ballPositions[row][c];
    if (ballContainer.player == player) {
      pballs += 1;
      winStart = ballContainer;
    } else {
      break;
    }
    c -= 1;
  }
  winEnd = grid.ballPositions[row][column];

  c = column + 1
  while (c < 7) {
    const ballContainer = grid.ballPositions[row][c];
    if (ballContainer.player == player) {
      pballs += 1;
      winEnd = ballContainer;
    } else {
      break;
    }
    c += 1;
  }

  return pballs >= 4;
}

function checkWinnerInDiagonalLeft(player, pballs, row, column) {
  winStart = grid.ballPositions[row][column];

  let c = column - 1;
  let r = row - 1;
  while (r > -1 && c > -1) {
    const ballContainer = grid.ballPositions[r][c];
    if (ballContainer.player == player) {
      pballs += 1;
      winStart = ballContainer;
    } else {
      break;
    }
    r -= 1;
    c -= 1;
  }
  winEnd = grid.ballPositions[row][column];

  r = row + 1
  c = column + 1
  while (r < 6 && c < 7) {
    const ballContainer = grid.ballPositions[r][c];
    if (ballContainer.player == player) {
      pballs += 1;
      winEnd = ballContainer;
    } else {
      break;
    }
    r += 1;
    c += 1;
  }

  return pballs >= 4;
}

function checkWinnerInDiagonalRight(player, pballs, row, column) {
  winStart = grid.ballPositions[row][column];

  let c = column - 1;
  let r = row + 1;
  while (r < 6 && c > -1) {
    const ballContainer = grid.ballPositions[r][c];
    if (ballContainer.player == player) {
      pballs += 1;
      winStart = ballContainer;
    } else {
      break;
    }
    r += 1;
    c -= 1;
  }
  winEnd = grid.ballPositions[row][column];

  r = row - 1
  c = column + 1
  while (r > -1 && c < 7) {
    const ballContainer = grid.ballPositions[r][c];
    if (ballContainer.player == player) {
      pballs += 1;
      winEnd = ballContainer;
    } else {
      break;
    }
    r -= 1;
    c += 1;
  }

  return pballs >= 4;
}

function checkEndOfGame() {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (grid.ballPositions[r][c].player === 0) {
        return;
      }
    }
  }

  controlBar.gameOver();
  gameOver = true;
  topBar.gameOver(0);
}