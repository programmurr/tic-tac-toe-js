const gameBoard = (function(player) {
	let cells = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
	const winningCombos = [
		[ 1, 2, 3 ],
		[ 4, 5, 6 ],
		[ 7, 8, 9 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 3, 6, 9 ],
		[ 1, 5, 9 ],
		[ 3, 5, 7 ]
	];

	// cache DOM
	const boardCells = Array.from(document.querySelectorAll('.cell'));

	// bind click events to cells
	for (let i = 0; i < boardCells.length; i++) {
		boardCells[i].addEventListener('click', takeCell);
	}

	_setupBoard();

	function _setupBoard() {
		for (let i = 0; i < boardCells.length; i++) {
			boardCells[i].textContent = cells[i];
		}
	}

	function takeCell() {
		if (this.textContent === 'X' || this.textContent === 'O') {
			alert("You can't do that!");
		} else {
			this.textContent = gameController.activePlayer.playerPiece;
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

	function update(self, cell) {
		updateWinCombos(self, cell);
		// win check - scan all win combos - if all are same piece then active player is winner
		// draw check - scan board - if no integers left - draw
	}

	return { boardCells, winningCombos, update };
})();

gameObserver.addObserver(gameBoard);
