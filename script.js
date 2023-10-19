'use strict';

const rollButton = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const hold = document.querySelector('.btn--hold');
var player0Score = document.getElementById('score--0');
var currentPlayer0 = document.getElementById('current--0');
var player1Score = document.getElementById('score--1');
var currentPlayer1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const newgame = document.querySelector('.btn--new');
var name0 = document.getElementById('name--0');
var name1 = document.getElementById('name--1');
const roll_audio = document.getElementById('roll-dice')
const hold_audio = document.getElementById('hold-audio')
const winner_audio = document.getElementById('winner-audio');
const new_game_audio = document.getElementById('restart-audio')

var score1 = 0;
var score2 = 0;

function changeCurrent(id, score){
  if (score !== 1){
    let current_score = parseInt(id.textContent) + score;
    id.textContent = current_score;
    if (player0.classList.contains('player--active')){
      score1 = current_score;
    } else {
      score2 = current_score;
    }  
  } else {
    id.textContent = 0;
    if (player0.classList.contains('player--active')){
      score1 = 0;
    } else {
      score2 = 0;
    }
    add_score();
  }
}

function check100() {
  if (player0Score.textContent >= 100 && player1Score.textContent < 100) {
    winner_audio.play();
    name0.textContent = 'Winner 🥳🍾';
  } else if (player1Score.textContent >= 100 && player0Score.textContent < 100) {
    winner_audio.play();
    name1.textContent = 'Winner 🥳🍾';
  }
}

const roll = function () {
    roll_audio.play();
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`;
    if (player0.classList.contains('player--active')){
      changeCurrent(currentPlayer0, randomNumber);  
    } else {
      changeCurrent(currentPlayer1, randomNumber);
    }
  }

const add_score = function () {
  hold_audio.play();
  if (player0.classList.contains('player--active')){
    player0Score.textContent = score1;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  }
  else {
    player1Score.textContent = score2;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
  check100();
}

const new_game = function () {
  new_game_audio.play()
  if (player1.classList.contains('player--active')){
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
  score1 =0;
  score2 =0;
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  currentPlayer0.textContent = 0;
  currentPlayer1.textContent = 0;
}

rollButton.addEventListener('click', roll);
hold.addEventListener('click', add_score);
newgame.addEventListener('click', new_game);