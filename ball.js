class Ball {
  constructor(player, column) {
    this.column = column;

    this.element = document.createElement('div');
    this.element.className = 'ball ' + (player === 1 ? 'red' : 'orange');

    document.body.appendChild(this.element);

    this.player = 0;
  }
}

export default Ball;
