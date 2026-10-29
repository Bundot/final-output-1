const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const scoreTieEl = document.getElementById("scoreTie");
const resetRoundBtn = document.getElementById("resetRoundBtn");
const resetGameBtn = document.getElementById("resetGameBtn");

const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // 3 Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // 3 Columns
  [0, 4, 8], [2, 4, 6]           // 2 Diagonals
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let scoreX = 0, scoreO = 0, scoreTies = 0;

cells.forEach(cell => cell.addEventListener("click", onCellClick));
resetRoundBtn.addEventListener("click", resetRound);
resetGameBtn.addEventListener("click", resetGame);

function onCellClick(e) {
  const idx = parseInt(e.target.dataset.index);

  // Guard: Reject move if space is taken or game is over
  if (board[idx] !== "" || !isGameActive) {
    return;
  }

  // Update State array and UI element
  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken", currentPlayer.toLowerCase());

  evaluateBoard();
}

function evaluateBoard() {
  let won = false;
  let line = [];

  for (const [a, b, c] of WIN_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      won = true;
      line = [a, b, c];
      break;
    }
  }

  if (won) {
    isGameActive = false;
    line.forEach(i => cells[i].classList.add("win-cell"));
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    currentPlayer === "X" ? scoreXEl.textContent = ++scoreX : scoreOEl.textContent = ++scoreO;
    return;
  }

  if (!board.includes("")) {
    isGameActive = false;
    statusText.textContent = "Round ended in a Draw!";
    scoreTieEl.textContent = ++scoreTies;
    return;
  }

  // Toggle Turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}


function resetRound() {
  board.fill("");
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

function resetGame() {
  resetRound();
  scoreX = 0; scoreO = 0; scoreTies = 0;
  scoreXEl.textContent = "0";
  scoreOEl.textContent = "0";
  scoreTieEl.textContent = "0";
}
