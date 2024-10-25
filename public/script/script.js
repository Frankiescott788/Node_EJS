// Get elements from the HTML
const cardGrid = document.getElementById("card-grid");
const resetButton = document.getElementById("reset-btn");
const winPopup = document.getElementById("win-popup");
const restartButton = document.getElementById("restart-btn");


let hasFlippedCard = false; 
let firstCard, secondCard;  
let lockBoard = false;      
let matchedPairs = 0;       


let cardLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, 18);
let cardValues = [...cardLetters, ...cardLetters]; 


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
}


function createBoard() {
  shuffle(cardValues);      
  cardGrid.innerHTML = '';  
  matchedPairs = 0;         

  
  cardValues.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;


    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${value}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    cardGrid.appendChild(card); 
  });
}


function flipCard() {
  if (lockBoard) return;  
  if (this === firstCard) return; 

  this.classList.add("flip"); 

  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch(); 
  }
}


function checkForMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();
    matchedPairs++; 
    if (matchedPairs === 18) {
      showWinPopup(); 
    }
  } else {
    unflipCards(); 
  }
}


function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetFlipState();
}


function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetFlipState();
  }, 1000); 
}


function resetFlipState() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showWinPopup() {
  winPopup.style.display = "flex";
}

function resetGame() {
  createBoard();
  winPopup.style.display = "none";
}


resetButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", resetGame);


createBoard();
