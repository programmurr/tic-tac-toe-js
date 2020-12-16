// store the gameboard as an array inside of a Gameboard object (gameBoard module)
// players will be stored in objects
// object to control the flow of the game
// displayController module
// player factory

const gameBoard = (function() {
	let cells = [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

	// cache DOM
	const boardCells = document.querySelectorAll('.cell');

	_setupBoard();

	function _setupBoard() {
		for (let i = 0; i < boardCells.length; i++) {
			boardCells[i].textContent = cells[i];
		}
	}

	return { boardCells };
})();
