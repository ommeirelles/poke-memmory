import './styles/index.scss';
import{ startGame, cardHasBeenClicked } from './game/script';

import { Piece, Pieces } from './entity/index';

const pokemonCardArray: Array<Piece> = [];
const tempPokemonCardArray: Array<Piece> = [];
const cardGrid = document.querySelector('.card-grid');

function fillPokemonCardArray () {
  Pieces.forEach(pokemon => {
    for(let i = 0; i < 2; i++) {
      tempPokemonCardArray.push(pokemon);
    }
  });
}

function insertRandomPieces(numberOfCards: number) {
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
  pokemonCardArray.forEach((pokemonCard, index) => {
  createMarkupForPokemonCard(pokemonCard, index);
  });
}

function startUp() {
  const numberOfCards = Pieces.length * 2;
  fillPokemonCardArray();
  insertRandomPieces(numberOfCards);
  createMarkupForPokemonCardGrid();
  startGame(pokemonCardArray, document.querySelectorAll('.card'))
}

startUp();