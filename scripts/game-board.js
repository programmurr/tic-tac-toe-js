// store the gameboard as an array inside of a Gameboard object (gameBoard module)
// players will be stored in objects
// object to control the flow of the game
// displayController module
// player factory

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
	for (let i = 0; i < boardCells.length - 1; i++) {
		boardCells[i].addEventListener('click', takeCell(player));
	}

	_setupBoard();
	_render();

	function _setupBoard() {
		for (let i = 0; i < boardCells.length; i++) {
			boardCells[i].textContent = cells[i];
		}
	}

	function _render() {
		// refresh board
		// emit board changed event
	}

	function takeCell(player) {
		// console.log(player);
		// console.log(this);
		this.textContent = player.playerPiece;
	}

	return { boardCells };
})(gameController.activePlayer);
