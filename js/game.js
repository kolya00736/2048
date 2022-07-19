var keyListener = function(event){keyboardEvent(event)};
var board, score;

newGame();

function newGame() {
	document.addEventListener('keydown', keyListener);
	
	score = 0;
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];
	
	setCell(); setCell(); 
	setHTML();
}

function keyboardEvent(event) {
	switch (event.keyCode) {
		case 37: // Left
			for (var row = 0; row < board.length; row++) {
				for (var j = 0; j < 3; j++) {
					for (var i = 0; i < 3; i++) {
						if (board[row][i] == 0) {
							board[row][i] = board[row][i] + board[row][i + 1];
							board[row][i + 1] = 0;
						} else if (board[row][i] == board[row][i + 1] && board[row][i] != 0) {
							board[row][i] = board[row][i] + board[row][i + 1];
							board[row][i + 1] = 0;
							j++;
							score += board[row][i];
						}
					}
				}
			}
			break;
		case 39: // Right
			for (var row = 0; row < board.length; row++) {
				for (var j = 0; j < 3; j++) {
					for (var i = 3; i > 0; i--) {
						if (board[row][i] == 0) {
							board[row][i] = board[row][i] + board[row][i - 1];
							board[row][i - 1] = 0;
						} else if (board[row][i] == board[row][i - 1] && board[row][i] != 0) {
							board[row][i] = board[row][i] + board[row][i - 1];
							board[row][i - 1] = 0;
							j++;
							score += board[row][i];
						}
					}
				}
			}
			break;
		case 38: // Up
			for (var col = 0; col < board.length; col++) {
				for (var j = 0; j < 3; j++) {
					for (var i = 0; i < 3; i++) {
						if (board[i][col] == 0) {
							board[i][col] = board[i][col] + board[i + 1][col];
							board[i + 1][col] = 0;
						} else if (board[i][col] == board[i + 1][col] && board[i][col] != 0) {
							board[i][col] = board[i][col] + board[i + 1][col];
							board[i + 1][col] = 0;
							j++;
							score += board[i][col];
						}
					}
				}
			}
			break;
		case 40: // Down
			for (var col = 0; col < board.length; col++) {
				for (var j = 0; j < 3; j++) {
					for (var i = 3; i > 0; i--) {
						if (board[i][col] == 0) {
							board[i][col] = board[i][col] + board[i - 1][col];
							board[i - 1][col] = 0;
						} else if (board[i][col] == board[i - 1][col] && board[i][col] != 0) {
							board[i][col] = board[i][col] + board[i - 1][col];
							board[i - 1][col] = 0;
							j++;
							score += board[i][col];
						}
					}
				}
			}
			break;
		default:
			return;
	}

	checkCells();
}

function checkCells() {
	var count = 0;
	for(var i = 0; i < board.length; i++) {
		for(var j = 0; j < board.length; j++) {
			if (board[i][j] == 0) count++;
		}
	}

	if (count != 0) setCell();
	
	setHTML();
}

function setCell() {
	var i, j;
	do {
		i = getCell(); j = getCell();
	} while (board[i][j] != 0)

	board[i][j] = getValue();
}

function setHTML() {
	document.getElementById('score').innerHTML = "Score: " + score;

	var id = -1;
	for(var i = 0; i < board.length; i++) {
		for(var j = 0; j < board.length; j++) {
			id++;
			if (board[i][j] != 0)
				document.getElementById(id).innerHTML = board[i][j];
			else
				document.getElementById(id).innerHTML = null;

			setColor(id, board[i][j]);
			
			if (board[i][j] == 2048) gameWin();
		}
	}
}

function getCell() {
	return Math.floor(Math.random() * 4);
}

function getValue() {
	return Math.random() < 0.9 ? 2 : 4;
}

function gameOver() {
	//document.getElementById('score').innerHTML = 'Game Over! Try again';
	//document.removeEventListener('keydown', keyListener);
}

function gameWin() {
	document.getElementById('score').innerHTML = 'You win!';
	document.removeEventListener('keydown', keyListener);
}

function setColor(id, value) {
	switch (value) {
		case 0:
			document.getElementById(id).style.color = '#cac1b5';
			document.getElementById(id).style.background = '#cac1b5';
			break;
		case 2:
			document.getElementById(id).style.color = '#776e65';
			document.getElementById(id).style.background = '#eee4da';
			break;
		case 4:
			document.getElementById(id).style.color = '#776e65';
			document.getElementById(id).style.background = '#ede0c8';
			break;
		case 8:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#f2b179';
			break;
		case 16:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#f59563';
			break;
		case 32:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#f67c5f';
			break;
		case 64:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#f65e3b';
			break;
		case 128:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#edcf72';
			break;
		case 256:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#edcc61';
			break;
		case 512:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#edc850';
			break;
		case 1024:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#edc53f';
			break;
		case 2048:
			document.getElementById(id).style.color = '#f9f6f2';
			document.getElementById(id).style.background = '#edc22e';
			break;
	}
}