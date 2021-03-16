import { Piece, Pieces } from '../entity/index';
import { isTwoPiecesEqual } from '../service/piece-service';

interface piecePageElement {
    id: number;
    piece: Piece;
}

const initialTime: number = 3;
let numberOfMoves: number = 0;
let timeCount: number = initialTime;
let selectedPieces: piecePageElement[] = [];
let pokemonCardArray: Array<Piece>;
let htmlCardArray: NodeListOf<Element>;
const gameMovesSpan = document.querySelector('.game-moves');
const timerSpan = document.querySelector('.timer');
let goalCounter = 0;
let timerCounter: any;

export function startGame(startingPokemonCardArray: Array<Piece>, startingHtmlCardArray: NodeListOf<Element>) {
    pokemonCardArray = startingPokemonCardArray;
    htmlCardArray = startingHtmlCardArray;

    gameLoop();
}

function calculateAndSetTimeText() {
    let minutes = Math.floor(timeCount/60);
    let seconds = timeCount % 60;
    timerSpan!.innerHTML = `${String(('0' + minutes).slice(-2))} : ${String(('0' + seconds).slice(-2))}`;
}

function gameLoop() {
    timerCounter = setInterval(() => {
        timeCount--;
        calculateAndSetTimeText();
        if(timeCount === 0 || pokemonCardArray.length === goalCounter) finishGame();
    }, 1000);
}

export function resetGame() {
    clearInterval(timerCounter)
    timeCount = initialTime;
    numberOfMoves = 0;
    goalCounter = 0;
    gameMovesSpan!.innerHTML = "00";
    calculateAndSetTimeText();
}

function showModal(hasWon: boolean) {
    const modal = document.querySelector('.modal-fade');
    const h1Modal = document.querySelector('.modal-container>h1');
    const body = document.querySelector('body');

    body!.classList.toggle('modal-is-open');
    modal!.classList.toggle('hidden');

    h1Modal!.innerHTML = hasWon ? `Parabéns, você ganhou o jogo com ${numberOfMoves} jogadas` : `Você perdeu o jogo com ${numberOfMoves} jogadas, mais sorte na próxima!`;

    
}

function finishGame() {
    clearInterval(timerCounter);
    if(pokemonCardArray.length === goalCounter){
        showModal(true);
        console.log("You Win!");
    } else {
        showModal(false);
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

