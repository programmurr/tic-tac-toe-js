const Player = (name, piece) => {
	const playerName = name;
	const playerPiece = piece;
	return { playerName, playerPiece };
};

const player1 = Player('Player1', 'X');
const player2 = Player('Player2', 'O');
