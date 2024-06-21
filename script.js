let arr = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}


let board = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j]
            } else
                arr[i][j].innerText = ''
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function() {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function() {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        board = response.board
        FillBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=hard')
        //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

SolvePuzzle.onclick = () => {
    solveSudoku(board);
};

function isSafe(row, col, board, val) {
    for (let i = 0; i < board.length; i++) {
        //row check
        if (board[row][i] == val) {
            return false;
        }
        //col check
        if (board[i][col] == val) {
            return false;
        }
        //3*3 matrix
        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == val) {
            return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    let n = board.length;

    for (let row = 0; row <= n; row++) {
        if (row == n) {
            FillBoard(board);
        }
        for (let col = 0; col < n; col++) {
            //cell empty
            if (board[row][col] == 0) {
                for (let val = 1; val <= 9; val++) {
                    if (isSafe(row, col, board, val)) {
                        board[row][col] = val;
                        //recursive call
                        if (solveSudoku(board)) return true;
                        else {
                            //backtrack
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}