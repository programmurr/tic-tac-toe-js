const gameBoard = (function() {
	let cells = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
	let winningCombos = [
		[ 1, 2, 3 ],
		[ 4, 5, 6 ],
		[ 7, 8, 9 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 3, 6, 9 ],
		[ 1, 5, 9 ],
		[ 3, 5, 7 ]
	];
	const _resetGame = () => location.reload();

	// cache DOM
	const boardCells = Array.from(document.querySelectorAll('.cell'));
	const resetButton = document.querySelector('#reset');

	// bind click events
	// for cells
	for (let i = 0; i < boardCells.length; i++) {
		boardCells[i].addEventListener('click', takeCell);
	}
	// for buttons
	resetButton.addEventListener('click', _resetGame);

	_setupBoard();

	function _setupBoard() {
		for (let i = 0; i < boardCells.length; i++) {
			boardCells[i].textContent = cells[i];
		}
	}

	function _refreshDisplay(cell) {
		cell.textContent = gameController.activePlayer.playerPiece; // demeter
	}

	function takeCell() {
		if (this.textContent === 'X' || this.textContent === 'O') {
			alert("You can't do that!");
		} else {
			_refreshDisplay(this);
			gameObserver.notifyObservers(this);
		}
	}

	function updateWinCombos(self, cell) {
		self.winningCombos.forEach(function(combo) {
			combo.forEach(function(comboNumber) {
				if (comboNumber == cell.id) {
					const comboIndex = self.winningCombos.indexOf(combo);
					const numberIndex = self.winningCombos[comboIndex].indexOf(comboNumber);
					self.winningCombos[comboIndex][numberIndex] = cell.textContent;
				}
			});
		});
	}

	function updateCells(self, clickedCell) {
		const cellIdNumber = parseInt(clickedCell.id);
		const index = self.cells.indexOf(cellIdNumber);
		self.cells.splice(index, 1);
	}

	const checkOWinner = (cell) => cell === 'O';

	const checkXWinner = (cell) => cell === 'X';

	function winCheck(self) {
		let winCombo = [];
		for (let i = 0; i < self.winningCombos.length; i++) {
			if (self.winningCombos[i].every(checkXWinner) || self.winningCombos[i].every(checkOWinner)) {
				winCombo.push(self.winningCombos[i]);
				return winCombo;
			}
		}
	}

	function drawCheck(self) {
		if (self.cells.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	function update(self, cell) {
		updateWinCombos(self, cell);
		updateCells(self, cell);
		if (typeof winCheck(self) === 'object') {
			alert(`${gameController.nextPlayer.playerName} is the winner!`); // demeter
			_resetGame();
		} else if (drawCheck(self)) {
			alert("It's a draw!");
			_resetGame();
		}
	}

	return { cells, boardCells, winningCombos, update };
})();

gameObserver.addObserver(gameBoard);

// Let players enter their names
// Store name in local storage
// Keep track of score?
// Tidy up code - remove demeter violations
