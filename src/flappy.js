"use strict";
const game = document.getElementById("game");
const bird = document.getElementById("bird");
const score = document.getElementById("score");

const gameTop = parseInt(getComputedStyle(game).getPropertyValue("height"));
const gameBottom = game.getBoundingClientRect().bottom - 19;
let isFalling = true;
let height = 0;
let top = 0;
let heightBlcok1 = 0;
let gameScore = 0;

score.innerHTML = gameScore;

const jump = function () {
  isFalling = false;
  let count = 0;
  const jumpping = setInterval(() => {
    const topBird = parseInt(getComputedStyle(bird).getPropertyValue("top"));
    if (topBird > 1) {
      bird.style.top = topBird - 3 + "px";
    }
    count++;
    if (count > 20) {
      isFalling = true;
      clearInterval(jumpping);
    }
  }, 10);
};

setInterval(() => {
  const topBird = parseInt(getComputedStyle(bird).getPropertyValue("top")) + 3;
  if (topBird < gameTop - 20 && isFalling) bird.style.top = topBird + "px";
}, 10);

setInterval(() => {
  const block1 = document.createElement("div");
  block1.classList.add("block1");

  const block2 = document.createElement("div");
  block2.classList.add("block2");

  height = Math.floor(Math.random() * 45) + "%";
  top = 100 - parseInt(height) + "%";
  heightBlcok1 = 80 - parseInt(height) + "%";
  block2.style.height = height;
  block2.style.top = top;
  block1.style.height = heightBlcok1;

  game.appendChild(block1);
  game.appendChild(block2);

  const win = setInterval(() => {
    const left = parseInt(getComputedStyle(block1).getPropertyValue("left"));
    const height1 = block1.getBoundingClientRect().bottom;
    const height2 = block2.getBoundingClientRect().top;
    const topBird = bird.getBoundingClientRect().top;

    if (left < 25 && left > 0 && (topBird > height2 || topBird < height1)) {
      alert("Game over! your score is: " + gameScore);
      location.reload();
    }
  }, 1);

  setTimeout(() => {
    game.removeChild(block1);
    game.removeChild(block2);
    gameScore++;
    score.innerHTML = gameScore;
    clearInterval(win);
  }, 3500);
}, 2000);

window.addEventListener("keydown", (e) => {
  if (e.key) jump();
});

document.addEventListener("click", () => {
  jump();
});
