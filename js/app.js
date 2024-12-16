// /*-------------------------------- Constants --------------------------------*/
const squares = document.querySelectorAll('.sqr');


const message = document.getElementById('message');

// /*---------------------------- Variables (state) ----------------------------*/
let currentPlayer = 'X';

let boardState = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;

// /*------------------------ Cached Element References ------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
  ];

// /*-------------------------------- Functions --------------------------------*/
function handleMove(event) {
    const square = event.target;
    const index = square.id;
  
    if (boardState[index] !== "" || !gameActive) return;
  
    boardState[index] = currentPlayer;
    square.textContent = currentPlayer;
  
    if (checkWinner()) {
      message.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  
    if (boardState.every(cell => cell !== "")) {
      message.textContent = "It's a draw!";
      gameActive = false;
      return;
    }
  
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
  
  function checkWinner() {
    return winningCombos.some(combo => {
      const [a, b, c] = combo;
      return (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      );
    });
  }

  function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    squares.forEach(square => {
      square.textContent = "";
    });
    currentPlayer = "X";
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
  }


// /*----------------------------- Event Listeners -----------------------------*/
squares.forEach(square => {
    square.addEventListener('click', handleMove);
  });

  restart.addEventListener('click', resetGame);


  message.textContent = `Player ${currentPlayer}'s turn`;