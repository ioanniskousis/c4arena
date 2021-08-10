class Ball {
  constructor(ballPosition, player, column) {
    this.column = column;

    this.element = document.createElement('div');
    this.element.className = 'ball ' + (player === 1 ? 'red' : 'orange');

    ballPosition.element.appendChild(this.element);

    this.player = 0;
  }
}

export default Ball;
