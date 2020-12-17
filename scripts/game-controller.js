const gameController = (function(player1, player2) {
	let activePlayer = player1;
	let nextPlayer = player2;

	return { activePlayer, nextPlayer };
})(player1, player2);
