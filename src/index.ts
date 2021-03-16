import './styles/index.scss';
import{ startGame, cardHasBeenClicked, resetGame } from './game/script';

import { Piece, Pieces } from './entity/index';

let pokemonCardArray: Array<Piece> = [];
let tempPokemonCardArray: Array<Piece> = [];
const cardGrid = document.querySelector('.card-grid');
const button = document.querySelector('.play-button');

function onStartButtonClick() {

  if(button!.children[1].classList.contains("hidden")){
    if(button!.classList.contains("first")) {
      button!.classList.toggle("first");
    } else {
      buildUp();
    }
    startGame(pokemonCardArray, document.querySelectorAll('.card'));
  } else {
    resetGame();
    buildUp();
  }
  button!.children[1].classList.toggle("hidden");
  button!.children[0].classList.toggle("hidden");
}

function setStartButtonListener() {
  button!.addEventListener("click",() => {
    onStartButtonClick();
  });
}

function fillPokemonCardArray () {
  tempPokemonCardArray = [];
  Pieces.forEach(pokemon => { 
    for(let i = 0; i < 2; i++) {
      tempPokemonCardArray.push(pokemon);
    }
  });
}

function insertRandomPieces(numberOfCards: number) {
  pokemonCardArray = [];
  for(let countLoop = 0; countLoop < numberOfCards; countLoop++) {
    const randomNumber = Math.floor(Math.random() * (tempPokemonCardArray.length - countLoop));
    const randomPokemonCard = tempPokemonCardArray.splice(randomNumber, 1)[0];
    pokemonCardArray.push(randomPokemonCard);
  }
}

function rotatePokemonCard(element: Element) {
  element.addEventListener("click",() => {
    cardHasBeenClicked(Number(element.id));
  })
}

function createMarkupForPokemonCard(piece:Piece, index:number) {
  const div = document.createElement('div');
  div.className = 'card';
  rotatePokemonCard(div);
  div.id = String(index);

  const backCardContainer = document.createElement('div');
  backCardContainer.classList.add("back-card-container");
  const cardBackImg = document.createElement('img');
  cardBackImg.src = `/assets/images/cardback.png`;
  cardBackImg.alt = `picture of card back`;
  backCardContainer.appendChild(cardBackImg);
  div.appendChild(backCardContainer);

  const frontCardContainer = document.createElement('div');
  const frontCardDiv = document.createElement('div');
  frontCardContainer.classList.add("front-card-container");
  frontCardDiv.classList.add("front-card");
  const img = document.createElement('img');
  img.src = `/assets/images/pokemons/${piece.name}.png`;
  img.alt = `picture of ${piece.name}`;
  frontCardDiv.appendChild(img);
  frontCardContainer.appendChild(frontCardDiv);
  div.appendChild(frontCardContainer);

  cardGrid!.appendChild(div);
}

function createMarkupForPokemonCardGrid() {
  cardGrid!.innerHTML = "";
  pokemonCardArray.forEach((pokemonCard, index) => {
  createMarkupForPokemonCard(pokemonCard, index);
  });
}

export function buildUp() {
  const numberOfCards = Pieces.length * 2;
  fillPokemonCardArray();
  insertRandomPieces(numberOfCards);
  createMarkupForPokemonCardGrid();
}

function startUp() {
  buildUp();
  setStartButtonListener();
}

startUp();