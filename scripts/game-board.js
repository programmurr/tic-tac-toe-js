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
	const boardContainer = document.querySelector('.board-container');
	const boardCells = Array.from(document.querySelectorAll('.cell'));
	const resetGameButton = boardContainer.children[1].children[0];
	const resetNameButton = boardContainer.children[1].children[1];
	let player1Display = boardContainer.children[2].children[0];
	let player2Display = boardContainer.children[2].children[1];

	// bind click events
	// for cells
	for (let i = 0; i < boardCells.length; i++) {
		boardCells[i].addEventListener('click', _takeCell);
	}
	// for buttons
	resetGameButton.addEventListener('click', _resetGame);
	resetNameButton.addEventListener('click', _resetName);

	_setupBoard();
	_displayPlayers();

	function _setupBoard() {
		for (let i = 0; i < boardCells.length; i++) {
			boardCells[i].textContent = cells[i];
		}
	}

	function _displayPlayers() {
		player1Display.textContent = `${playerController.player1.playerName} is '${playerController.player1
			.playerPiece}'`;
		player2Display.textContent = `${playerController.player2.playerName} is '${playerController.player2
			.playerPiece}'`;
	}

	function _resetName() {
		localStorage.clear();
		location.reload();
	}

	function _refreshDisplay(cell) {
		cell.textContent = playerController.activePlayer.playerPiece;
	}

	function _takeCell() {
		if (this.textContent === 'X' || this.textContent === 'O') {
			alert("You can't do that!");
		} else {
			_refreshDisplay(this);
			gameObserver.notifyObservers(this);
		}
	}

	function _updateWinCombos(self, cell) {
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

	function _updateCells(self, clickedCell) {
		const cellIdNumber = parseInt(clickedCell.id);
		const index = self.cells.indexOf(cellIdNumber);
		self.cells.splice(index, 1);
	}

	const _checkOWinner = (cell) => cell === 'O';

	const _checkXWinner = (cell) => cell === 'X';

	function _winCheck(self) {
		let winCombo = [];
		for (let i = 0; i < self.winningCombos.length; i++) {
			if (self.winningCombos[i].every(_checkXWinner) || self.winningCombos[i].every(_checkOWinner)) {
				winCombo.push(self.winningCombos[i]);
				return winCombo;
			}
		}
	}

	function _drawCheck(self) {
		if (self.cells.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	function update(self, cell) {
		_updateWinCombos(self, cell);
		_updateCells(self, cell);
		if (typeof _winCheck(self) === 'object') {
			alert(`${playerController.nextPlayer.playerName} is the winner!`);
			_resetGame();
		} else if (_drawCheck(self)) {
			alert("It's a draw!");
			_resetGame();
		}
	}

	return { cells, boardCells, winningCombos, update };
})();

gameObserver.addObserver(gameBoard);
