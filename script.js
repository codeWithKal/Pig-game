"use strict";
const firstPlayerSection = document.querySelector(".first-player");
let fpCurrentScore = document.querySelector(".fp-current-score");
const secondPlayerSection = document.querySelector(".second-player");
let spCurrentScore = document.querySelector(".sp-current-score");
const newGameBtn = document.querySelector(".new-game");
const rollBtn = document.querySelector(".roll");
const holdBtn = document.querySelector(".hold");
let fpScore = document.querySelector(".fp-score");
let spScore = document.querySelector(".sp-score");
const img = document.querySelector("img");
let winnerMessage = document.querySelector(".winner-msg");
const winnerWindow = document.querySelector(".winner-window");
const close = document.querySelector(".close");

let currentPlayer = firstPlayerSection;
let gameActive = true;

function winnerAnnounce() {
  gameActive = false;
  if (currentPlayer === firstPlayerSection) {
    winnerMessage.innerText = "Congratulations Player 1 is a Winner!!";
  } else {
    winnerMessage.innerText = "Congratulations Player 2 is a Winner!!";
  }
  winnerWindow.classList.remove("hidden");
}

function playerSwitch() {
  currentPlayer =
    currentPlayer === firstPlayerSection
      ? secondPlayerSection
      : firstPlayerSection;
  pageSelector(currentPlayer);
}

function pageSelector(player) {
  if (player === firstPlayerSection) {
    secondPlayerSection.style.opacity = "0.3";
    firstPlayerSection.style.opacity = "1";
  } else {
    firstPlayerSection.style.opacity = "0.3";
    secondPlayerSection.style.opacity = "1";
  }
}

function roller() {
  if (!gameActive) return;

  const random = Math.trunc(Math.random() * 6 + 1);
  img.src = `dice-${random}.png`;
  img.classList.remove("hidden");

  if (random !== 1) {
    if (currentPlayer === firstPlayerSection) {
      fpScore.innerText = Number(fpScore.innerText) + random;
      if (Number(fpScore.innerText) + Number(fpCurrentScore.innerText) >= 100) {
        winnerAnnounce();
      }
    } else {
      spScore.innerText = Number(spScore.innerText) + random;
      if (Number(spScore.innerText) + Number(spCurrentScore.innerText) >= 100) {
        winnerAnnounce();
      }
    }
  } else {
    if (currentPlayer === firstPlayerSection) {
      fpScore.innerText = "0";
    } else {
      spScore.innerText = "0";
    }
    playerSwitch();
  }
}

function holder() {
  if (!gameActive) return;

  if (currentPlayer === firstPlayerSection) {
    fpCurrentScore.innerText =
      Number(fpCurrentScore.innerText) + Number(fpScore.innerText);
    fpScore.innerText = "0";
  } else {
    spCurrentScore.innerText =
      Number(spCurrentScore.innerText) + Number(spScore.innerText);
    spScore.innerText = "0";
  }

  playerSwitch();
}

function restarter() {
  fpCurrentScore.innerText = "0";
  fpScore.innerText = "0";
  spCurrentScore.innerText = "0";
  spScore.innerText = "0";
  currentPlayer = firstPlayerSection;
  pageSelector(currentPlayer);
  gameActive = true;
  winnerWindow.classList.add("hidden");
  img.classList.add("hidden");
}
function closer() {
  winnerWindow.classList.add("hidden");
  restarter();
}
pageSelector(firstPlayerSection);

rollBtn.addEventListener("click", roller);
holdBtn.addEventListener("click", holder);
newGameBtn.addEventListener("click", restarter);
close.addEventListener("click", closer);
