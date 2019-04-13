let scores, roundScore, activePlayer, gamePlaying;
let lastDice;
init();

// Selector
let btnRoll = document.querySelector(".btn-roll");
let btnHold = document.querySelector(".btn-hold");
let btnNew = document.querySelector(".btn-new");
// Click Event
btnRoll.addEventListener("click", clickBtnRoll);
btnHold.addEventListener("click", clickBtnHold);
btnNew.addEventListener("click", init);

function clickBtnRoll() {
  if (gamePlaying) {
    // random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // Display the result
    // let diceDom = document.querySelector(".dice");
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    // diceDom.style.display = "block";
    document.getElementById("dice-1").src = "./img/dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "./img/dice-" + dice2 + ".png";

    // Update the round if the rolled number was not 1
    /*
    if (dice === 6 && lastDice === 6) {
      // Player lost score
      // Next player
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }

	lastDice = dice;
	*/
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }  
  }
}

function clickBtnHold() {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    let inputScore = document.getElementById("input-here").value;
    if (scores[activePlayer] >= inputScore) {
      document.querySelector("#name-" + activePlayer).textContent =
        "Winner!!!!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
}

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Hide dice
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector("#name-0").textContent = "Player 1";

  document.getElementById("score-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
}
