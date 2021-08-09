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
}

export default Grid;
