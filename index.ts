class TicTacToe {
    board: (string | null)[][];
    currentPlayer: string;
    gameStatus: string;
    boardElement: HTMLElement;
    statusElement: HTMLElement;

    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.currentPlayer = 'X';
        this.gameStatus = 'Playing';
        this.boardElement = document.getElementById('board')!;
        this.statusElement = document.getElementById('status')!;

        this.initializeBoard();
        this.updateStatus();
    }

    initializeBoard() {
        this.boardElement.innerHTML = '';
        this.board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.addEventListener('click', () => this.handleClick(rowIndex, colIndex));
                this.boardElement.appendChild(cellElement);
            });
        });
    }

    handleClick(rowIndex: number, colIndex: number) {
        if (this.board[rowIndex][colIndex] || this.gameStatus !== 'Playing') return;

        this.board[rowIndex][colIndex] = this.currentPlayer;
        this.updateBoard();
        if (this.checkWin()) {
            this.gameStatus = `${this.currentPlayer} Wins!`;
        } else if (this.isBoardFull()) {
            this.gameStatus = 'Draw!';
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
        this.updateStatus();
    }

    updateBoard() {
        Array.from(this.boardElement.children).forEach((cellElement, index) => {
            const rowIndex = Math.floor(index / 3);
            const colIndex = index % 3;
            cellElement.textContent = this.board[rowIndex][colIndex];
            if (this.board[rowIndex][colIndex]) {
                cellElement.classList.add('disabled');
            }
        });
    }

    updateStatus() {
        this.statusElement.textContent = this.gameStatus === 'Playing'
            ? `Current Player: ${this.currentPlayer}`
            : this.gameStatus;
    }

    checkWin(): boolean {
        const winningCombos = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return this.board[a[0]][a[1]] &&
                   this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
                   this.board[a[0]][a[1]] === this.board[c[0]][c[1]];
        });
    }

    isBoardFull(): boolean {
        return this.board.flat().every(cell => cell !== null);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
