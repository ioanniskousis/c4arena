class Ball {
  constructor(ballPosition, player) {
    this.element = document.createElement('div');
    this.element.className = 'ball ' + (player === 1 ? 'red' : 'orange');

    ballPosition.element.appendChild(this.element);
  }
}

export default Ball;
