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

	// bind events
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
		this.textContent = gameController.activePlayer.playerPiece;
		gameObserver.notifyObservers();
	}

	function update(self) {
		console.log(`${self} 'updated'`);
		//
	}

	return { boardCells, update };
})();

gameObserver.addObserver(gameBoard);
