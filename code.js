const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'cyan']
const board = document.getElementById("board");
const scoreText = document.getElementById("score");
let div;
let size = 15;
if (sessionStorage.getItem("size")) {
  size = parseInt(sessionStorage.getItem("size"));
}
const redBtn = document.getElementById("red");
const yellowBtn = document.getElementById("yellow");
const greenBtn = document.getElementById("green");
const blueBtn = document.getElementById("blue");
const cyanBtn = document.getElementById("cyan");
const purpleBtn = document.getElementById("purple");
let score = Math.round(size * 2.5 - (size * 2.5)/10);
let totalScore = score
let row;
let interval;
let rotation = 0;
let winPhrase = "YOU WON!";

/* Recursively change matching colors in the surrounding squares to a given target
 * @param {Array} cur   Cordinate of the current square
 * @param {String} mark Color of the top left square
 * @param {String} tgt  Color selected by user to change into
*/
function shift(cur, mark, tgt) {
  let [r, c] = cur;
  document.getElementById(`${r} ${c}`).style.backgroundColor = tgt;
  if (c != 0 && document.getElementById(`${r} ${c - 1}`).style.backgroundColor == mark) {
    shift([r, c - 1], mark, tgt); 
  }
  if (c != size - 1 && document.getElementById(`${r} ${c + 1}`).style.backgroundColor == mark) {
    shift([r, c + 1], mark, tgt);
  }
  if (r != 0 && document.getElementById(`${r - 1} ${c}`).style.backgroundColor == mark) {
    shift([r - 1, c], mark, tgt);
  }
  if (r != size - 1 && document.getElementById(`${r + 1} ${c}`).style.backgroundColor == mark) {
    shift([r + 1, c], mark, tgt);
  }
}

// Return true if all squares are the same color, which means the game is won.
function hasWon() {
  let mrk = document.getElementById('0 0').style.backgroundColor;
  for (x of board.children) {
    if (x.style.backgroundColor != mrk) return false
  }
  return true
}

// Call shift method to change all buttons and constantly check the game status.
function callChange(color) {
  let mrk = document.getElementById('0 0').style.backgroundColor;
  if (mrk == color) return
  score--;
  scoreText.innerHTML = `${score} / ${totalScore}`;
  shift([0, 0], mrk, color);
  if (score === -1) {
    winPhrase = "";
    loseScreen();
  }
  if (hasWon()) endGame();
}

disableButtons = function() {
  redBtn.disabled = true; 
  yellowBtn.disabled = true; 
  greenBtn.disabled = true; 
  blueBtn.disabled = true; 
  cyanBtn.disabled = true; 
  purpleBtn.disabled = true;
}

enableButtons = function() {
  redBtn.disabled = false; 
  yellowBtn.disabled = false; 
  greenBtn.disabled = false; 
  blueBtn.disabled = false; 
  cyanBtn.disabled = false; 
  purpleBtn.disabled = false; 
}

// The screen that appears when the user has lost the game.
function loseScreen() {
  disableButtons(); 
  for (x of board.children) {
    x.style.display = "none";
  }
  screen = document.createElement("loseScreen");
  board.appendChild(screen);
  board.style.display = "flex";
  lostText = document.createElement("p");
  lostText.style.fontWeight = "bold";
  lostText.style.fontSize = "4em";
  lostText.style.color = "white";
  lostText.innerHTML = "YOU LOST!";
  noMovesText = document.createElement("p");
  noMovesText.innerHTML = "You ran out of moves";
  noMovesText.style.color = "white";
  noMovesText.style.fontSize = "1.8em"
  noMovesText.style.marginBottom = "1em";
  continueBtn = document.createElement("button");
  continueBtn.innerHTML = "Continue Still 🤩";
  continueBtn.style.border = "3px solid white"
  continueBtn.style.backgroundColor = "transparent";
  continueBtn.style.padding = "5px";
  continueBtn.style.color = "white";
  continueBtn.style.borderRadius = "4px";
  continueBtn.style.marginBottom = "1em";
  continueBtn.style.width = "123px";
  continueBtn.style.cursor = "pointer";
  menuBtn = document.createElement("button");
  menuBtn.innerHTML = "Back To Menu 😔";
  menuBtn.style.border = "3px solid white"
  menuBtn.style.backgroundColor = "transparent";
  menuBtn.style.padding = "5px";
  menuBtn.style.color = "white";
  menuBtn.style.borderRadius = "4px";
  menuBtn.style.width = "123px";
  menuBtn.style.cursor = "pointer";
  screen.appendChild(lostText);
  screen.appendChild(noMovesText);
  screen.appendChild(continueBtn);
  screen.appendChild(menuBtn);
  screen.style.width = "100%";
  screen.style.display = "flex";
  screen.style.flexDirection = "column"
  screen.style.alignItems = "center";
  screen.style.justifyContent = "center";
  screen.style.backgroundColor = "black";
  menuBtn.onclick = () => window.open("menu.html", "_self");
  continueBtn.onclick = () => {
    board.removeChild(screen);
    for (x of board.children) {
      x.style.display = "block";
      enableButtons();
      board.style.display = "grid";
      board.style.gridTemplateColumns = Array(size).fill('auto').join(' ');
    }
  }
}

// Display that the user has won and disable game buttons.
function endGame() {
  disableButtons();  
  screen = document.getElementById('0 0');
  board.replaceChildren(screen);
  board.style.display = "flex";
  p = document.createElement("p");
  p.style.fontWeight = "bold";
  p.style.fontSize = "4em";
  p.style.color = "white";
  p.style.textShadow = "0 0 5px gray";
  p.innerHTML = winPhrase;
  screen.appendChild(p);
  p.style.margin = "auto";
  screen.style.width = "100%";
  screen.style.display = "flex";
  screen.style.alignItems = "center";
  screen.style.justifyItems = "center";
  interval = setInterval(() => colorRotate(screen), 500);
}

function colorRotate(elem) {
  elem.style.transitionDuration = "0.5s";
  elem.style.backgroundColor = colors[rotation % colors.length];
  rotation++;
}

// Create Board
function createBoard() {
  row = -1;
  for (let i = 0; i < size ** 2; i++) {
    div = document.createElement("div");
    div.className = "cell";
    if (i % size === 0){
      row++;
    }
    div.id = `${row} ${i % size}`;
    div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    board.appendChild(div);
  }
  board.style.display = "grid";
  board.style.gridTemplateColumns = Array(size).fill('auto').join(' ');
}
createBoard();


redBtn.onclick = () => callChange('red');
yellowBtn.onclick = () => callChange('yellow');
greenBtn.onclick = () => callChange('green');
blueBtn.onclick = () => callChange('blue');
cyanBtn.onclick = () => callChange('cyan');
purpleBtn.onclick = () => callChange('purple');
const resetBtn = document.getElementById("reset");
resetBtn.onclick = () => resetBoard();
scoreText.innerHTML = `${score} / ${score}`;

function resetBoard() {
  enableButtons();
  score = totalScore;
  scoreText.innerHTML = `${score} / ${totalScore}`;
  board.replaceChildren();
  createBoard();
  winPhrase = "YOU WON!";
  clearInterval(interval);
}