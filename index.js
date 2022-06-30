/**
 * B-I-N-G-O
 *
 * A Bingo card contain 25 squares arranged in a 5x5 grid (five columns
 * and five rows). Each space in the grid contains a number between 1
 * and 75. The center space is marked "FREE" and is automatically filled.
 *
 * As the game is played, numbers are drawn. If the player's card has
 * that number, that space on the grid is filled.
 *
 * A player wins BINGO by completing a row, column, or diagonal of filled
 * spaces.
 *
 * Your job is to complete the function that takes a bingo card and array
 * of drawn numbers and return 'true' if that card has achieved a win.
 *
 * A bingo card will be 25 element array. With the string 'FREE' as the
 * center element (index 12). Although developers are unscrupulous, they
 * will pass valid data to your function.
 */

// Currently, the board can be any size
// You need to update the width*height, center and targetCount to extend the board
const boardwidth = 5;
const boardHeight = 5;
const center = [2, 2];
const targetCount = 5;

function getKey([row, col]) {
  return `${row}:${col}`;
}

function isValidPoint(row, col) {
  return row >= 0 && row < boardHeight && col >= 0 && col < boardwidth;
}

// Check the board bidirectionally
function checkBoard (board, startPoint, visited, offset) {
  let count = 0;
  visited[getKey(startPoint)] = true;

  for (let [row, col] = startPoint; isValidPoint(row, col); row += offset[0], col += offset[1]) {
    // Update the cell as a visited cell
    visited[getKey([row, col])] = true;
    if (board[getKey([row, col])]) count ++;
    else break;

    // return true if the count reached to the target
    if (count >= targetCount) return true;
  }

  count --;
  
  for (let [row, col] = startPoint; isValidPoint(row, col); row -= offset[0], col -= offset[1]) {
    // Update the cell as a visited cell
    visited[getKey([row, col])] = true;
    if (board[getKey([row, col])]) count ++;
    else break;

    // return true if the count reached to the target
    if (count >= targetCount) return true;
  }

  return false;
}

function checkForBingo (bingoCard, drawnNumbers) {
  const board = {};

  // Memorize the row and column index of each number in the board
  for (let i = 0, len = bingoCard.length; i < len; i ++) {
    let row = Math.floor(i / boardwidth);
    let col = i % boardwidth;

    board[bingoCard[i]] = [row, col];
  }

  // Flag board center
  const drawnBoard = { [getKey(center)]: true };
  const visited = { [getKey(center)]: true };

  // Flag board cells with drawnNumbers
  for (const number of drawnNumbers){
    // Ignore numbers that are not in board
    if (!board[number]) continue;
    drawnBoard[getKey(board[number])] = true;
  }

  for (const number of drawnNumbers) {
    // Ignore numbers that are not in board
    if (!board[number]) continue;
    // Not visit cells that were visited before
    if (visited[getKey(board[number])]) continue;

    // Check row
    if (checkBoard(drawnBoard, board[number], visited, [0, 1])) return true;
    // Check column
    if (checkBoard(drawnBoard, board[number], visited, [1, 0])) return true;
    // Check diagonally
    if (checkBoard(drawnBoard, board[number], visited, [1, 1])) return true;
    // Check anti-diagonally
    if (checkBoard(drawnBoard, board[number], visited, [1, -1])) return true;
  }

  return false;
}

module.exports = checkForBingo;

// here are some samples

// this should return true with diagonal + free
console.log(checkForBingo(
  [
    8, 29, 35, 54, 65,
    13, 24, 44, 48, 67,
    9, 21, 'FREE', 59, 63,
    7, 19, 34, 53, 61,
    1, 20, 33, 46, 72
  ],
  [
    8, 24, 53, 72
  ]
));

// this should return false
console.log(checkForBingo(
  [
   8, 29, 35, 54, 65,
   13, 24, 44, 48, 67,
   9, 21, 'FREE', 59, 63,
   7, 19, 34, 53, 61,
   1, 20, 33, 46, 72
  ],
  [
    1, 33, 53, 65, 29, 75
  ]
));

// console.log(checkForBingo(
//   [
//     24, 44, 48,
//     21, 'FREE', 59,
//     19, 34, 53,
//   ],
//   [
//     8, 21, 59, 72
//   ]
// ));