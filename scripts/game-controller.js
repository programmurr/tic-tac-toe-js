const gameController = (function(player1, player2) {
	let activePlayer = player1;
	let nextPlayer = player2;

	function switchPlayer(self) {
		[ self.activePlayer, self.nextPlayer ] = [ self.nextPlayer, self.activePlayer ];
	}

	function update(self) {
		switchPlayer(self);
	}

	return { activePlayer, nextPlayer, update };
})(player1, player2);

gameObserver.addObserver(gameController);
