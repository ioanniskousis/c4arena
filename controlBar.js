class ControlBar {
  constructor() {
    const bar = document.getElementById('controlBar');

    this.leftBall = document.createElement('div');
    this.leftBall.className = 'playerIndex red';

    this.rightBall = document.createElement('div');
    this.rightBall.className = 'playerIndex orange';

    this.restartButton = document.createElement('input');
    this.restartButton.type = 'button';
    this.restartButton.id = 'restartButton';
    this.restartButton.value = 'Restart';

    bar.appendChild(this.leftBall);
    bar.appendChild(this.restartButton);
    bar.appendChild(this.rightBall);

  }

  play(player) {
    this.leftBall.style.visibility = (player === 1) ? 'visible' : 'hidden';
    this.rightBall.style.visibility = (player === 2) ? 'visible' : 'hidden';
    
  }

  gameOver() {
    this.restartButton.style.visibility = 'visible';
  }
}

export default ControlBar;
