import Grid from './grid.js';
import Ball from './Ball.js';

let grid = null;
let player = 1;

window.addEventListener('load', () => {
  grid = new Grid();
  grid.setup();
  
  const allBallPositions = document.getElementsByClassName('ball-position-container');
  for (let i = 0; i < allBallPositions.length; i++) {
    const ballPosition = allBallPositions[i];
    ballPosition.addEventListener('click', (e) => {
      const column = e.currentTarget.getAttribute('column');
      createNewBall(player, column);
      player = (player === 1 ? 2 : 1);
    })
  }

});


function createNewBall(player, column) {
  
  const ball = new Ball(player, column);
  let row = -1;

  for (let r = 5; r > -1; r--) {
    const bp = grid.ballPositions[r][column];
    if (!bp.hasBall) {
      const box = bp.element.getBoundingClientRect();
      ball.element.style.left = `${box.left}px`;
      ball.element.style.top = `${box.top}px`;
      bp.hasBall = true;
      bp.player = player;
      row = r;
      break;
    }
  }
  if (row > -1) {
    checkWinner(player, row, column);
  };
  
}

function checkWinner(player, row, column) {

}