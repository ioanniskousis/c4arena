import BallPosition from './ballPosition.js';

class Grid {
  constructor() {
    this.ballPositions = new Array(6);
  }

  setup() {
    for (let r = 0; r < 6; r++) {
      this.ballPositions[r] = new Array(7);
      for (let c = 0; c < 7; c++) {
        this.ballPositions[r][c] = new BallPosition(r, c);

      }
    }
  }

  restart() {
    for (let r = 0; r < this.ballPositions.length; r++) {
      for (let c = 0; c < this.ballPositions[r].length; c++) {
        this.ballPositions[r][c].player = 0;
      }
    }
  }
}

export default Grid;
