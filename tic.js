
  (function(){
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const statusDiv = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset');
    let boardState = Array(9).fill(null); // holds 'X' or 'O'
    let currentPlayer = 'X';
    let gameActive = true;

    // Winning combinations (0-based indices)
    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];

    function checkWin(player) {
      return winningCombinations.some(combination => 
        combination.every(index => boardState[index] === player));
    }

    function checkDraw() {
      return boardState.every(cell => cell !== null);
    }

    function updateStatus() {
      if (!gameActive) return;
      statusDiv.textContent = `Current turn: ${currentPlayer}`;
    }

    function endGame(message) {
      statusDiv.textContent = message;
      gameActive = false;
    }

    function handleCellClick(e) {
      const cell = e.target;
      const index = parseInt(cell.dataset.index);

      if (!gameActive || boardState[index] !== null) return;

      boardState[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());

      // Check for win
      if (checkWin(currentPlayer)) {
        endGame(`Player ${currentPlayer} wins!`);
        return;
      }
      // Check for draw
      if (checkDraw()) {
        endGame("It's a draw!");
        return;
      }
      // Switch player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }

    function resetGame() {
      boardState.fill(null);
      currentPlayer = 'X';
      gameActive = true;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
      });
      statusDiv.textContent = 'Current turn: X';
      cells[0].focus(); // Focus first cell for accessibility
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    // Keyboard support: space or enter to place mark
    cells.forEach(cell => {
      cell.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          cell.click();
        }
      });
    });
    resetBtn.addEventListener('click', resetGame);

  })();