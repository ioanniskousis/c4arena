class BallPosition {
  constructor(row, column) {
    this.row = row;
    this.column = column;

    this.container = document.createElement('div');
    this.container.className = 'ball-position-container';
    this.container.style.left = `${column * 80}px`;
    this.container.style.top = `${row * 80}px`;

    this.container.setAttribute('row', row);
    this.container.setAttribute('column', column);
    

    this.element = document.createElement('div');
    this.element.className = 'ball-position';

    this.container.appendChild(this.element);

    document.getElementById('board').appendChild(this.container);

    this.hasBall = false;

    this.player = 0;
  }
}

export default BallPosition;
