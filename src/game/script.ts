import { Piece, Pieces } from '../entity/index';
import { isTwoPiecesEqual } from '../service/piece-service';
interface piecePageElement {
    id: number;
    piece: Piece;
}

let numberOfMoves: number = 0;
let timeCount: number = 90;
let selectedPieces: piecePageElement[] = [];
let pokemonCardArray: Array<Piece>;
let htmlCardArray: NodeListOf<Element>;
const gameMovesSpan = document.querySelector('.game-moves');
const timerSpan = document.querySelector('.timer');
let goalCounter = 0;

export function startGame(startingPokemonCardArray: Array<Piece>, startingHtmlCardArray: NodeListOf<Element>) {
    pokemonCardArray = startingPokemonCardArray;
    htmlCardArray = startingHtmlCardArray;

    gameLoop();
}

let timerCounter: any;

function gameLoop() {
   timerCounter = setInterval(() => {
        timeCount--;
        if(timeCount === 0 || pokemonCardArray.length === goalCounter) finishGame();
        let minutes = Math.floor(timeCount/60);
        let seconds = timeCount % 60;
        timerSpan!.innerHTML = `${String(('0' + minutes).slice(-2))} : ${String(('0' + seconds).slice(-2))}`;
    }, 1000);
}

function finishGame() {
    clearInterval(timerCounter);
    if(pokemonCardArray.length === goalCounter){
        console.log("You Win!");
    } else {
        console.log("You Lose!");
    }
    
}

export function cardHasBeenClicked(id: number) {
    if(htmlCardArray[id].classList.contains("matched") || htmlCardArray[id].classList.contains("selected") || timeCount === 0){
        return;
    }
    if(selectedPieces.length < 2){
        selectedPieces.push({id: id, piece: pokemonCardArray[id]});
        htmlCardArray[id].classList.toggle("selected");
        htmlCardArray[id].children[1].classList.toggle("selected");
        if(selectedPieces.length === 2){
            numberOfMoves++;
            gameMovesSpan!.innerHTML = String(('0' + numberOfMoves).slice(-2));
            const isEqual = isTwoPiecesEqual(selectedPieces[0].piece, selectedPieces[1].piece);
            selectedPieces.forEach(selectedPiece => {
                if(isEqual){
                    htmlCardArray[selectedPiece.id].classList.toggle("matched");
                    selectedPieces = [];
                    goalCounter++;
                }
                else {
                    htmlCardArray[selectedPiece.id].classList.toggle("missed");
                    setTimeout(() => {
                        htmlCardArray[selectedPiece.id].classList.toggle("selected");
                        htmlCardArray[selectedPiece.id].classList.toggle("missed");
                        selectedPieces = [];
                    }, 2000);
                }
            });
        }
    }
}

