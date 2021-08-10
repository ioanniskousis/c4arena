class TopBar {
  constructor() {
    this.bar = document.getElementById('topBar');
  }

  play(player, again) {
    if (again) {
      this.bar.innerText = `Column is full - Player ${player} is playing again`;
      this.bar.style.backgroundColor = 'blue';
    } else {
      this.bar.innerText = `Player ${player} is playing`;
      this.bar.style.backgroundColor = 'cadetblue';
    }
    
  }

  gameOver(player) {
    if (player > 0) {
      this.bar.innerText = `Winner is Player ${player}`;
      this.bar.style.backgroundColor = player === 1 ? 'red' : 'orange';
    } else {
      this.bar.innerText = 'Game Is Over without Winner';
      this.bar.style.backgroundColor = 'green';
    }
    
  }
}

export default TopBar;
