import './styles/index.scss'
import {Piece, Pieces} from './entity/index';

const pokemonCardArray: Array<Piece> = [];
const positionsTaken: Array<number> = [];
const tempPokemonCardArray: Array<Piece> = [];

function fillPositions(numberOfCards: number) {
  for(let i = 0; i < numberOfCards; i++) {
    positionsTaken.push(i);
  }
}

function fillPokemonCardArray () {
  Pieces.forEach(pokemon => {
    for(let i = 0; i < 2; i++) {
      tempPokemonCardArray.push(pokemon);
    }
  });
}

function insertRandomPieces(numberOfCards: number) {
  for(let countLoop = 0; countLoop < numberOfCards; countLoop++) {
    const randomNumber = Math.floor(Math.random() * (numberOfCards - countLoop));
    const position = positionsTaken.splice(randomNumber, 1)[0];
    pokemonCardArray[position] = tempPokemonCardArray.pop() as Piece;
  }
}

function startUp() {
  const numberOfCards = Pieces.length * 2;
  fillPokemonCardArray();
  fillPositions(numberOfCards);
  insertRandomPieces(numberOfCards);
  console.log(pokemonCardArray);
}

startUp();